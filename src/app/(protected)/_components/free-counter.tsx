import { Zap } from 'lucide-react'
import { MAX_FREE_COUNTS } from '@/constants'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import useModalStore from '@/store/use-modal-store'
import { ModalTypeEnum } from '@/providers/modal-provider'

interface FreeCounterProps {
  isPro: boolean
  apiLimitCount: number
}

const FreeCounter = ({ isPro = false, apiLimitCount = 0 }: FreeCounterProps) => {
  const showModal = useModalStore((state) => state.showModal)

  const handleBtnClick = () => {
    showModal(ModalTypeEnum.SUBSCRIPTION)
  }

  if (isPro) {
    return null
  }

  return (
    <div className='px-3'>
      <Card className='bg-white/10 border-0'>
        <CardContent className='py-6'>
          <div className='text-center text-sm text-white mb-4 space-y-2'>
            <p>
              {apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
            </p>
            <Progress className='h-3' value={(apiLimitCount / MAX_FREE_COUNTS) * 100} />
          </div>
          <Button variant='premium' className='w-full' onClick={handleBtnClick}>
            Upgrade
            <Zap className='fill-white' />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default FreeCounter
