'use server'

import { currentUser } from '@/lib/auth'
import prisma from '@/lib/db'
import { UnauthorizedError } from '@/lib/exceptions'
import { getErrorMessage } from '@/lib/utils'
import { CreateChatSchema, CreateChatSchemaType } from '@/schemas'
import { revalidatePath } from 'next/cache'

export const createChat = async (values: CreateChatSchemaType) => {
  try {
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

    const newChat = await prisma.chat.create({
      data: {
        userId: user.id,
        type,
        name,
      },
    })
    revalidatePath(`/${type.toLowerCase()}`)
    return { data: newChat }
  } catch (error) {
    console.error('[CREATE_CHAT_ERROR]', error)
    return { error: getErrorMessage(error) }
  }
}
