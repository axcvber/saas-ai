'use server'

import { NewPassSchema, NewPassSchemaType } from '@/schemas'
import { getErrorMessage } from '@/lib/utils'
import { getUserByEmail } from '@/lib/user'
import { compare, hash } from 'bcryptjs'
import { getPasswordResetTokenByToken } from '@/lib/tokens'
import prisma from '@/lib/db'

export const newPassword = async (values: NewPassSchemaType, token?: string | null) => {
  try {
    if (!token) {
      throw new Error('Missing token!')
    }

    const validatedFields = NewPassSchema.safeParse(values)

    if (!validatedFields.success) {
      const { errors } = validatedFields.error
      throw new Error(errors[0].message)
    }

    const { password } = validatedFields.data

    const existingToken = await getPasswordResetTokenByToken(token)

    if (!existingToken) {
      return { error: 'Invalid token!' }
    }

    const hasExpired = new Date(existingToken.expires) < new Date()

    if (hasExpired) {
      return { error: 'Token has expired!' }
    }

    const existingUser = await getUserByEmail(existingToken.email)

    if (!existingUser) {
      return { error: 'Email does not exist!' }
    }

    const passwordsMatch = await compare(password, existingUser.password)

    if (passwordsMatch) {
      throw new Error('Choose another password')
    }

    const hashedPassword = await hash(password, 10)

    await prisma.user.update({
      where: { id: existingUser.id },
      data: { password: hashedPassword },
    })

    await prisma.passwordResetToken.delete({
      where: { id: existingToken.id },
    })
  } catch (error) {
    console.error('[NEW_PASS_ERROR]', error)
    return { error: getErrorMessage(error) }
  }
}
