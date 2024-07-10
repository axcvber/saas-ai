import { useSession } from 'next-auth/react'

export const useCurrentUser = () => {
  const session = useSession()

  return {
    isSignedIn: !!session.data?.user,
    user: session.data?.user,
  }
}
