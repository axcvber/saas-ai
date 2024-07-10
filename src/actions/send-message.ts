'use server'

import { getErrorMessage } from '@/lib/utils'
import { currentUser } from '@/lib/auth'
import { UnauthorizedError } from '@/lib/exceptions'
import { revalidatePath } from 'next/cache'
import { getChat } from './chat/get-chat'
import { uploadToS3 } from '@/lib/upload'
import { checkApiLimit, incrementApiLimit } from '@/lib/api-limit'
import { checkSubscription } from '@/lib/subscription'
import { getContextForChat, shouldUpdateSummary, summarizeConversation } from '@/lib/chat'
import { openai, replicate } from '@/lib/ai'
import prisma from '@/lib/db'

export const sendMessage = async (prompt: string, chatId: string) => {
  try {
    if (!prompt) {
      throw new Error('Message is required')
    }

    if (!chatId) {
      throw new Error('Chat ID is missing')
    }

    const { user } = await currentUser()

    if (!user?.id) {
      throw new UnauthorizedError()
    }

    const chat = await getChat(chatId)

    if (!chat) {
      throw new Error('Chat not found')
    }

    const freeTrial = await checkApiLimit()
    const isPro = await checkSubscription()

    if (!freeTrial && !isPro) {
      return {
        error: 'Free trial has expired. Please upgrade to pro.',
        status: 403,
      }
    }

    const { openAIContext, replicateContext } = await getContextForChat(chatId)

    let text: string | null = null
    let imageUrls: string[] = []
    let codeSnippet: string | null = null
    let videoUrl: string | null = null
    let musicUrl: string | null = null

    switch (chat.type) {
      case 'CONVERSATION':
        openAIContext.push({ role: 'user', content: prompt })
        const textResponse = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: openAIContext,
          max_tokens: 150,
        })
        text = textResponse.choices[0].message.content
        break

      case 'MUSIC':
        const musicResponse: any = await replicate.run(
          'meta/musicgen:671ac645ce5e552cc63a54a2bbff63fcf798043055d2dac5fc9e36a837eedcfb',
          {
            input: {
              prompt: `${replicateContext}\nUser: ${prompt}`,
              model_version: 'stereo-large',
              output_format: 'mp3',
              normalization_strategy: 'peak',
            },
          }
        )
        musicUrl = await uploadToS3(musicResponse, user.id, chatId, 'music')
        break

      case 'IMAGE':
        const images: any = await replicate.run(
          'bytedance/sdxl-lightning-4step:5f24084160c9089501c1b3545d9be3c27883ae2239b6f412990e82d4a6210f8f',
          {
            input: {
              prompt: `${replicateContext}\nUser: ${prompt}`,
              num_outputs: 3,
            },
          }
        )
        imageUrls = await Promise.all(images.map((url: string) => uploadToS3(url, user.id || '', chatId, 'image')))
        break

      case 'VIDEO':
        const videoResponse: any = await replicate.run(
          'anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351',
          {
            input: {
              width: 1024,
              height: 576,
              prompt: `${replicateContext}\nUser: ${prompt}`,
            },
          }
        )
        videoUrl = await uploadToS3(videoResponse[0], user.id, chatId, 'video')
        break

      case 'CODE':
        openAIContext.push({
          role: 'system',
          content: "You are a code generator. Generate code based on the user's request.",
        })
        openAIContext.push({ role: 'user', content: prompt })
        const code = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: openAIContext,
          max_tokens: 500,
        })
        codeSnippet = code.choices[0].message.content
        break

      default:
        throw new Error('Invalid chat type')
    }

    await prisma.message.createMany({
      data: [
        {
          chatId,
          role: 'user',
          content: prompt,
          userId: user.id,
        },
        {
          chatId,
          role: 'assistant',
          content: text,
          userId: user.id,
          imageUrls: imageUrls.length > 0 ? imageUrls : undefined,
          codeSnippet,
          musicUrl,
          videoUrl,
        },
      ],
    })

    const shouldUpdateChatSummary = await shouldUpdateSummary(chatId)

    if (shouldUpdateChatSummary) {
      await summarizeConversation(chatId)
    }

    if (!isPro) {
      await incrementApiLimit()
    }

    revalidatePath(`/chat/${chatId}`)

    return {
      data: {
        text,
        imageUrls,
        codeSnippet,
        videoUrl,
        musicUrl,
      },
    }
  } catch (error) {
    console.error('[SEND_MESSAGE_ERROR]', error)
    return { error: getErrorMessage(error) }
  }
}
