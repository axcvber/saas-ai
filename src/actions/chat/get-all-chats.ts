'use server'

import { currentUser } from '@/lib/auth'
import { UnauthorizedError } from '@/lib/exceptions'
import { ChatType } from '@prisma/client'
import prisma from '@/lib/db'

export async function getAllChats(type: ChatType) {
  const { user } = await currentUser()

  if (!user?.id) {
    throw new UnauthorizedError()
  }

  const data = await prisma.chat.findMany({
    where: {
      userId: user.id,
      type,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return data
}
