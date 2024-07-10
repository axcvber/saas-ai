import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AppRoutes } from '@/routes'
import Logo from '@/components/logo'

export const LandingNavbar: React.FC<{ isSignedIn: boolean }> = ({ isSignedIn }) => {
  return (
    <nav className='p-4 bg-transparent flex items-center justify-between'>
      <Logo />
      <div className='flex items-center gap-x-2'>
        <Link href={isSignedIn ? AppRoutes.DASHBOARD : AppRoutes.LOGIN}>
          <Button variant='outline' className='rounded-full'>
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  )
}
