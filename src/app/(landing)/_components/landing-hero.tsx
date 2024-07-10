'use client'

import { ReactTyped } from 'react-typed'
import { Button } from '@/components/ui/button'
import { AppRoutes } from '@/routes'
import Link from 'next/link'

export const LandingHero: React.FC<{ isSignedIn: boolean }> = ({ isSignedIn }) => {
  return (
    <div className='container text-white font-bold py-24 text-center space-y-5'>
      <div className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl  font-extrabold'>
        <h1 className='mb-4'>The Best AI Tool for</h1>
        <ReactTyped
          className='text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500'
          strings={['Chatbot.', 'Photo Generation.', 'Code Writing.', 'Music Generation.', 'Video Generation.']}
          typeSpeed={100}
          backSpeed={50}
          loop
        />
      </div>
      <div className='text-sm md:text-xl font-light text-zinc-400'>Create content using AI 10x faster.</div>
      <div>
        <Button asChild variant='premium' className='md:text-lg p-4 md:p-6 rounded-full font-semibold'>
          <Link href={isSignedIn ? AppRoutes.DASHBOARD : AppRoutes.LOGIN}>Start Generating For Free</Link>
        </Button>
      </div>
      <div className='text-zinc-400 text-xs md:text-sm font-normal'>No credit card required.</div>
    </div>
  )
}
