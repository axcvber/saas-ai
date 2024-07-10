import React from 'react'
import { Button } from '../ui/button'

interface ErrorSectionProps {
  errorMessage: string
  resetCallback: () => void
}

const ErrorSection: React.FC<ErrorSectionProps> = ({ errorMessage, resetCallback }) => {
  return (
    <div className='flex justify-center items-center h-full container'>
      <div className='flex flex-col gap-3 items-center text-center max-w-96'>
        <h4>Something went wrong!</h4>
        <p className='text-muted-foreground text-sm'>{errorMessage}</p>
        <Button size={'sm'} onClick={resetCallback}>
          Try again
        </Button>
      </div>
    </div>
  )
}

export default ErrorSection
