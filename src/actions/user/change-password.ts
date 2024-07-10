'use server'

import prisma from '@/lib/db'
import { currentUser } from '@/lib/auth'
import { getUserById } from '@/lib/user'
import { getErrorMessage } from '@/lib/utils'
import { UnauthorizedError } from '@/lib/exceptions'
import { NewPassSchema, NewPassSchemaType } from '@/schemas'
import { compare, hash } from 'bcryptjs'

export const changePassword = async (values: NewPassSchemaType) => {
  try {
    const { user } = await currentUser()

    if (!user?.id) {
      throw new UnauthorizedError()
    }

    const existingUser = await getUserById(user.id)

    if (!existingUser) {
      throw new Error('User not found')
    }

    const validatedFields = NewPassSchema.safeParse(values)

    if (!validatedFields.success) {
      const { errors } = validatedFields.error
      throw new Error(errors[0].message)
    }

    const { password } = validatedFields.data

    const passwordsMatch = await compare(password, existingUser.password)

    if (passwordsMatch) {
      throw new Error('Choose another password')
    }

    const hashedPassword = await hash(password, 10)

    await prisma.user.update({
      where: { id: existingUser.id },
      data: { password: hashedPassword },
    })
  } catch (error) {
    console.error('[CHANGE_PASSWORD_ERROR]', error)
    return { error: getErrorMessage(error) }
  }
}
