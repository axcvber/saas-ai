import Image from 'next/image'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-screen w-full'>
      <div className='relative hidden w-1/2 lg:flex border-r bg-muted'>
        <Image priority fill sizes='50vw' quality={100} className='object-cover object-top' src='/auth.jpg' alt='AI' />
      </div>
      <div className='container flex items-center justify-center w-full lg:w-1/2 py-12'>{children}</div>
    </div>
  )
}
