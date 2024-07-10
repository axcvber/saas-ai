import { MAX_FREE_COUNTS } from '@/constants'
import { currentUser } from './auth'
import prisma from './db'

export const incrementApiLimit = async () => {
  const { user } = await currentUser()

  if (!user?.id) {
    return
  }

  const userApiLimit = await prisma.userApiLimit.findUnique({
    where: { userId: user.id },
  })

  if (userApiLimit) {
    await prisma.userApiLimit.update({
      where: { userId: user.id },
      data: { count: userApiLimit.count + 1 },
    })
  } else {
    await prisma.userApiLimit.create({
      data: { userId: user.id, count: 1 },
    })
  }
}

export const checkApiLimit = async () => {
  const { user } = await currentUser()

  if (!user?.id) {
    return false
  }

  const userApiLimit = await prisma.userApiLimit.findUnique({
    where: { userId: user.id },
  })

  if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
    return true
  } else {
    return false
  }
}

export const getApiLimitCount = async () => {
  const { user } = await currentUser()

  if (!user?.id) {
    return 0
  }

  const userApiLimit = await prisma.userApiLimit.findUnique({
    where: {
      userId: user.id,
    },
  })

  if (!userApiLimit) {
    return 0
  }

  return userApiLimit.count
}
