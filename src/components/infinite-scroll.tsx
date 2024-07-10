'use client'

import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { Spinner } from './ui/spinner'

interface InfiniteScrollProps {
  isFetchingNextPage: boolean
  fetchNextPage: () => void
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({ isFetchingNextPage, fetchNextPage }) => {
  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView])

  return (
    <div ref={ref} className='flex justify-center w-full py-4'>
      <Spinner size={'xs'} variant={'default'} />
    </div>
  )
}

export default InfiniteScroll
