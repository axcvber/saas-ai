'use server'

import prisma from '@/lib/db'
import { unstable_update } from '@/auth'
import { currentUser } from '@/lib/auth'
import { UnauthorizedError } from '@/lib/exceptions'
import { getUserById } from '@/lib/user'
import { getErrorMessage } from '@/lib/utils'
import { UserInfoSchema, UserInfoSchemaType } from '@/schemas'

export const updateUserInfo = async (values: UserInfoSchemaType) => {
  try {
    const { user } = await currentUser()

    if (!user?.id) {
      throw new UnauthorizedError()
    }

    const dbUser = await getUserById(user.id)

    if (!dbUser) {
      throw new Error('User not found')
    }

    const validatedFields = UserInfoSchema.safeParse(values)

    if (!validatedFields.success) {
      const { errors } = validatedFields.error
      throw new Error(errors[0].message)
    }

    const { email, firstName, lastName } = validatedFields.data

    const updatedUser = await prisma.user.update({
      where: { id: dbUser.id },
      data: {
        email,
        firstName,
        lastName,
      },
    })

    if (!updatedUser) {
      throw new Error('Failed to update the info')
    }

    await unstable_update({
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
      },
    })
  } catch (error) {
    console.error('[UPDATE_USER_INFO_ERROR]', error)
    return { error: getErrorMessage(error) }
  }
}
