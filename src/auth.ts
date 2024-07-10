import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import Credentials from 'next-auth/providers/credentials'
import { AppRoutes } from '@/routes'
import { LoginSchema } from './schemas'
import { getUserByEmail } from '@/lib/user'
import { compare } from 'bcryptjs'
import prisma from './lib/db'
import type { Adapter } from 'next-auth/adapters'

export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  session: { strategy: 'jwt' },
  pages: {
    signIn: AppRoutes.LOGIN,
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const validatedFields = LoginSchema.safeParse(credentials)

        if (!validatedFields.success) {
          const { errors } = validatedFields.error
          throw new Error(errors[0].message)
        }

        const { email, password } = validatedFields.data

        const existingUser = await getUserByEmail(email)

        if (!existingUser) {
          throw new Error('Invalid credentials')
        }

        const passwordsMatch = await compare(password, existingUser.password)

        if (!passwordsMatch) {
          throw new Error('Invalid credentials')
        }

        return {
          id: existingUser.id,
          email: existingUser.email,
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // console.log('JWT Callback', { token, user })

      if (trigger === 'update') {
        return {
          ...token,
          user: {
            ...session.user,
          },
        }
      }

      if (user) {
        return {
          ...token,
          user: user,
        }
      }

      return token
    },
    async session({ session, token }) {
      // console.log('Session Callback', { session, token })

      return {
        ...session,
        user: token.user,
      }
    },
  },
})
