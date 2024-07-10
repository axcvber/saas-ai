import { currentUser } from './auth'
import prisma from './db'

const DAY_IN_MS = 86_400_000

export const checkSubscription = async () => {
  const { user } = await currentUser()

  if (!user?.id) {
    return false
  }

  const userSubscription = await prisma.userSubscription.findUnique({
    where: {
      userId: user.id,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  })

  if (!userSubscription) {
    return false
  }

  const isValid =
    userSubscription.stripePriceId && userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now()

  return !!isValid
}
