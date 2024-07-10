import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

const NotFoundSection = () => {
  return (
    <div className='w-full h-full flex justify-center items-center container'>
      <div className='flex flex-col gap-3 items-center text-center max-w-96'>
        <h3>Page Not Found</h3>
        <p className='text-muted-foreground text-sm'>Could not find requested resource</p>

        <Button asChild size={'sm'}>
          <Link href='/'>Back Home</Link>
        </Button>
      </div>
    </div>
  )
}

export default NotFoundSection
