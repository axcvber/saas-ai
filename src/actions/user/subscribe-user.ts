'use server'

import { absoluteUrl, getErrorMessage } from '@/lib/utils'
import { UnauthorizedError } from '@/lib/exceptions'
import { currentUser } from '@/lib/auth'
import prisma from '@/lib/db'
import { stripe } from '@/lib/stripe'
import { AppRoutes } from '@/routes'

const cancelUrl = absoluteUrl(AppRoutes.DASHBOARD)

export const subscribeUser = async () => {
  try {
    const { user } = await currentUser()

    if (!user?.id) {
      throw new UnauthorizedError()
    }

    const userSubscription = await prisma.userSubscription.findUnique({
      where: {
        userId: user.id,
      },
    })

    if (userSubscription && userSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: cancelUrl,
      })

      return {
        data: stripeSession.url,
      }
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: cancelUrl,
      cancel_url: cancelUrl,
      payment_method_types: ['card'],
      mode: 'subscription',
      billing_address_collection: 'auto',
      customer_email: user.email || '',
      line_items: [
        {
          price_data: {
            currency: 'USD',
            product_data: {
              name: 'Genius Pro',
              description: 'Unlimited AI Generations',
            },
            unit_amount: 2000,
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: user.id,
      },
    })

    return {
      data: stripeSession.url,
    }
  } catch (error) {
    console.error('[SUBSCRIPTION_ERROR]', error)
    return { error: getErrorMessage(error) }
  }
}
