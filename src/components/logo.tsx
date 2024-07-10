import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href={'/'} className='block'>
      <Image width={200} height={50} alt='Logo' src='/logo.png' quality={100} />
    </Link>
  )
}

export default Logo
