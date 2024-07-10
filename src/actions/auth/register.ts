'use server'

import { RegisterSchema, RegisterSchemaType } from '@/schemas'
import { getUserByEmail } from '@/lib/user'
import { hash } from 'bcryptjs'
import { getErrorMessage } from '@/lib/utils'
import prisma from '@/lib/db'

export const register = async (values: RegisterSchemaType) => {
  try {
    const validatedFields = RegisterSchema.safeParse(values)

    if (!validatedFields.success) {
      const { errors } = validatedFields.error
      throw new Error(errors[0].message)
    }

    const { email, password, firstName, lastName } = validatedFields.data

    const existingUser = await getUserByEmail(email)

    if (existingUser) {
      throw new Error('User with this email already exists')
    }

    const hashedPassword = await hash(password, 10)

    await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    })
  } catch (error) {
    console.error('[REGISTRATION_ERROR]', error)

    return { error: getErrorMessage(error) }
  }
}
