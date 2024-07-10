'use server'

import { currentUser } from '@/lib/auth'
import { UnauthorizedError } from '@/lib/exceptions'
import prisma from '@/lib/db'

export async function getChat(chatId: string) {
  const { user } = await currentUser()

  if (!user?.id) {
    throw new UnauthorizedError()
  }

  const data = await prisma.chat.findUnique({
    where: {
      id: chatId,
      userId: user.id,
    },
  })

  return data
}
