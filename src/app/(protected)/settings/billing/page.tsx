import React from 'react'
import { SubscriptionButton } from '@/components/subscription-button'
import { Heading } from '@/components/ui/heading'
import { ReceiptText } from 'lucide-react'
import { checkSubscription } from '@/lib/subscription'

const BillingPage = async () => {
  const isPro = await checkSubscription()

  return (
    <>
      <Heading
        title='Billing'
        description='Manage your invoices.'
        icon={<ReceiptText />}
        iconColor='text-gray-700'
        bgColor='bg-gray-700/10'
      />
      <div className='space-y-4'>
        <div className='text-muted-foreground text-sm'>
          {isPro ? 'You are currently on a Pro plan.' : 'You are currently on a free plan.'}
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
    </>
  )
}

export default BillingPage
