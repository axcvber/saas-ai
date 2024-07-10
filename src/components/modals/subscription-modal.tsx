import React from 'react'
import { Modal } from '../ui/modal'
import useModalStore from '@/store/use-modal-store'
import { Card } from '../ui/card'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import { tools } from '@/constants'
import { SubscriptionButton } from '../subscription-button'

const SubscriptionModal = () => {
  const isOpen = useModalStore((s) => s.isOpen)
  const hideModal = useModalStore((s) => s.hideModal)

  return (
    <Modal
      title={'Upgrade to Premium'}
      desc='Upgrade to premium and use unlimited generations for all chats.'
      isOpen={isOpen}
      onClose={hideModal}
    >
      <div className='space-y-2'>
        {tools.map((tool) => (
          <Card key={tool.href} className='p-3 border-black/5 flex items-center justify-between'>
            <div className='flex items-center gap-x-4'>
              <div className={cn('p-2 w-fit rounded-md', tool.bgColor)}>
                <tool.icon className={cn('w-6 h-6', tool.color)} />
              </div>
              <div className='font-semibold text-sm'>{tool.label}</div>
            </div>
            <div className='flex items-center gap-1'>
              <span className='text-xs text-neutral-400'>Unlimited</span>
              <Check className='text-primary w-4 h-4' />
            </div>
          </Card>
        ))}
      </div>

      <SubscriptionButton isPro={false} />
    </Modal>
  )
}

export default SubscriptionModal
