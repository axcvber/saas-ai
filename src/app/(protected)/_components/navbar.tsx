import MobileSidebar from './mobile-sidebar'
import UserButton from './user-button'
import BackButton from '@/components/back-button'

interface NavbarProps {
  apiLimitCount: number
  isPro: boolean
}

const Navbar = ({ apiLimitCount, isPro }: NavbarProps) => {
  return (
    <header className='flex items-center gap-3 py-4 sticky top-0 bg-white z-50 container max-w-full border-b'>
      <MobileSidebar isPro={isPro} apiLimitCount={apiLimitCount} />
      <BackButton />

      <div className='flex w-full justify-end'>
        <UserButton />
      </div>
    </header>
  )
}

export default Navbar
