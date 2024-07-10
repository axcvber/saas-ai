import NextAuth from 'next-auth'
import { type JWT } from 'next-auth/jwt'

export interface ExtendedUser {
  id?: string | undefined
  email?: string | null
  firstName: string
  lastName: string
}

declare module 'next-auth' {
  interface User extends ExtendedUser {}

  interface Session extends Omit<Session, 'user'> {
    user: ExtendedUser
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: ExtendedUser
  }
}
