'use server'

import { currentUser } from '@/lib/auth'
import prisma from '@/lib/db'
import { UnauthorizedError } from '@/lib/exceptions'
import { getErrorMessage } from '@/lib/utils'
import { CreateChatSchema, CreateChatSchemaType } from '@/schemas'
import { revalidatePath } from 'next/cache'

export const editChat = async (chatId: string, values: CreateChatSchemaType) => {
  try {
    if (!chatId) {
      throw new Error('Chat ID is missing')
    }

    const validatedFields = CreateChatSchema.safeParse(values)

    if (!validatedFields.success) {
      const { errors } = validatedFields.error
      throw new Error(errors[0].message)
    }

    const { user } = await currentUser()

    if (!user?.id) {
      throw new UnauthorizedError()
    }

    const { name, type } = validatedFields.data

    const newChat = await prisma.chat.update({
      where: {
        userId: user.id,
        id: chatId,
        type,
      },
      data: {
        name,
      },
    })
    revalidatePath(`/chat/${chatId}`)
    return { data: newChat }
  } catch (error) {
    console.error('[EDIT_CHAT_ERROR]', error)
    return { error: getErrorMessage(error) }
  }
}
