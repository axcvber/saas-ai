import { auth } from '@/auth'

export const currentUser = async () => {
  const session = await auth()

  return {
    isSignedIn: !!session?.user,
    user: session?.user,
  }
}
