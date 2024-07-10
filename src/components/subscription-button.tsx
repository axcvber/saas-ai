'use client'

import { useTransition } from 'react'
import { Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { subscribeUser } from '@/actions/user/subscribe-user'

export const SubscriptionButton = ({ isPro }: { isPro: boolean }) => {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const onClick = () => {
    startTransition(async () => {
      const result = await subscribeUser()
      if (result.error) {
        toast({
          title: result.error,
          variant: 'destructive',
        })
        return
      }
      if (result.data) {
        window.location.href = result.data
      }
    })
  }

  return (
    <Button variant={isPro ? 'default' : 'premium'} disabled={isPending} onClick={onClick}>
      {isPro ? 'Manage Subscription' : 'Upgrade'}
      {!isPro && <Zap className='fill-white' />}
    </Button>
  )
}
