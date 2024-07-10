'use server'

import prisma from '@/lib/db'
import { currentUser } from '@/lib/auth'
import { UnauthorizedError } from '@/lib/exceptions'
import { getErrorMessage } from '@/lib/utils'
import { deleteAllChatFiles } from '@/lib/upload'
import { revalidatePath } from 'next/cache'

export const deleteChat = async (chatId: string) => {
  try {
    if (!chatId) {
      throw new Error('Chat ID is missing')
    }

    const { user } = await currentUser()

    if (!user?.id) {
      throw new UnauthorizedError()
    }

    await deleteAllChatFiles(user.id, chatId)

    await prisma.chat.delete({
      where: {
        id: chatId,
        userId: user.id,
      },
    })

    revalidatePath(`/chat/${chatId}`)
  } catch (error) {
    console.error('[DELETE_CHAT_ERROR]', error)
    return { error: getErrorMessage(error) }
  }
}
