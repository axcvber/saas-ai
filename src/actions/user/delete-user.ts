'use server'

import { getErrorMessage } from '@/lib/utils'
import { UnauthorizedError } from '@/lib/exceptions'
import { currentUser } from '@/lib/auth'
import prisma from '@/lib/db'
import { deleteUserFiles } from '@/lib/upload'

export const deleteUser = async () => {
  try {
    const { user } = await currentUser()

    if (!user?.id) {
      throw new UnauthorizedError()
    }

    await deleteUserFiles(user.id)

    await prisma.user.delete({
      where: { id: user.id },
    })
  } catch (error) {
    console.error('[DELETE_USER_ERROR]', error)
    return { error: getErrorMessage(error) }
  }
}
