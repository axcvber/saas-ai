'use server'

import { signIn } from '@/auth'
import { AuthError } from 'next-auth'
import { LoginSchema, LoginSchemaType } from '@/schemas'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { getErrorMessage } from '@/lib/utils'
import { isRedirectError } from 'next/dist/client/components/redirect'

export const login = async (values: LoginSchemaType, callbackUrl?: string | null) => {
  try {
    const validatedFields = LoginSchema.safeParse(values)

    if (!validatedFields.success) {
      const { errors } = validatedFields.error
      throw new Error(errors[0].message)
    }

    const { email, password } = validatedFields.data

    await signIn('credentials', {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    console.error('[LOGIN_ERROR]', error)

    if (error instanceof AuthError) {
      return { error: getErrorMessage(error.cause?.err?.message || 'Something went wrong') }
    }

    if (isRedirectError(error)) {
      throw error
    }

    return { error: getErrorMessage(error) }
  }
}
