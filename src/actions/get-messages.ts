'use server'

import { UnauthorizedError } from '@/lib/exceptions'
import { currentUser } from '@/lib/auth'
import prisma from '@/lib/db'

export async function getMessages(chatId: string, cursor?: string | null) {
  const { user } = await currentUser()

  if (!user?.id) {
    throw new UnauthorizedError()
  }

  const limit = 20

  const messages = await prisma.message.findMany({
    where: {
      userId: user.id,
      chatId: chatId,
    },
    take: -(limit + 1),
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
  })

  const hasMore = messages.length > limit
  const nextCursor = hasMore ? messages[0].id : null

  return {
    messages: messages.reverse(),
    nextCursor,
  }
}
