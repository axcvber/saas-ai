import { currentUser } from '@/lib/auth'
import { LandingNavbar } from './_components/landing-navbar'
import { LandingHero } from './_components/landing-hero'
import { LandingContent } from './_components/landing-content'

const LandingPage = async () => {
  const { isSignedIn } = await currentUser()

  return (
    <div className='h-full '>
      <LandingNavbar isSignedIn={isSignedIn} />
      <LandingHero isSignedIn={isSignedIn} />
      <LandingContent />
    </div>
  )
}

export default LandingPage
