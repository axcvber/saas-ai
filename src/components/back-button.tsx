'use client'

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { ArrowLeft } from 'lucide-react'
import { AppRoutes } from '@/routes'

const BackButton = () => {
  const pathname = usePathname()
  const router = useRouter()

  if (pathname === AppRoutes.DASHBOARD) {
    return null
  }

  return (
    <Button variant={'outline'} size={'sm'} onClick={() => router.back()}>
      <ArrowLeft />
      Back
    </Button>
  )
}

export default BackButton
