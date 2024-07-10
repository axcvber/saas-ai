import { ChatCompletionMessageParam } from 'openai/resources/index.mjs'
import { openai } from './ai'
import prisma from './db'

export async function getContextForChat(chatId: string) {
  const chat = await prisma.chat.findUnique({
    where: { id: chatId },
    include: {
      messages: {
        orderBy: { createdAt: 'desc' },
        take: 20,
      },
      summaries: {
        orderBy: { createdAt: 'desc' },
        take: 1,
      },
    },
  })

  if (!chat) {
    throw new Error('Chat not found')
  }

  const openAIContext: ChatCompletionMessageParam[] = []
  const replicateContext: string[] = []

  if (chat.summaries.length > 0) {
    const summaryContent = `Previous conversation summary: ${chat.summaries[0].content}`
    openAIContext.push({ role: 'system', content: summaryContent })
    replicateContext.push(summaryContent)
  }

  chat.messages.reverse().forEach((m) => {
    openAIContext.push({ role: m.role as any, content: m.content || '' })
    replicateContext.push(`${m.role}: ${m.content || ''}`)
  })

  return { openAIContext, replicateContext: replicateContext.join('\n') }
}

export async function summarizeConversation(chatId: string) {
  const messages = await prisma.message.findMany({
    where: { chatId },
    take: 50,
  })

  const conversationText = messages.map((m) => `${m.role}: ${m.content}`).join('\n')

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'Summarize the following conversation concisely:' },
      { role: 'user', content: conversationText },
    ],
    max_tokens: 150,
  })

  const summaryContent = response.choices[0].message.content?.trim()

  if (summaryContent) {
    await prisma.summary.create({
      data: {
        content: summaryContent,
        chatId: chatId,
      },
    })
  }

  return summaryContent
}

export async function shouldUpdateSummary(chatId: string) {
  const messageCount = await prisma.message.count({
    where: { chatId },
  })

  return messageCount % 20 === 0
}
