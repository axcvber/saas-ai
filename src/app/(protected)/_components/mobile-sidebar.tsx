'use client'

import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import Sidebar from './sidebar'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

interface MobileSidebarProps {
  apiLimitCount: number
  isPro: boolean
}

const MobileSidebar = ({ apiLimitCount = 0, isPro = false }: MobileSidebarProps) => {
  const [isOpen, setOpen] = useState(false)
  const pathname = usePathname()

  const toggleOpen = () => setOpen(!isOpen)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    handleClose()
  }, [pathname])

  return (
    <Sheet open={isOpen} onOpenChange={toggleOpen}>
      <SheetTrigger asChild>
        <Button variant='outline' size={'icon'} className='lg:hidden h-9 w-9 shrink-0'>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='p-0'>
        <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} />
      </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar
