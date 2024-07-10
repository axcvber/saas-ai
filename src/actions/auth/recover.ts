'use server'

import { sendPasswordResetEmail } from '@/lib/mail'
import { generatePasswordResetToken } from '@/lib/tokens'
import { getUserByEmail } from '@/lib/user'
import { getErrorMessage } from '@/lib/utils'
import { ResetPassSchema, ResetPassSchemaType } from '@/schemas'

export const recoverUser = async (values: ResetPassSchemaType) => {
  try {
    const validatedFields = ResetPassSchema.safeParse(values)

    if (!validatedFields.success) {
      const { errors } = validatedFields.error
      throw new Error(errors[0].message)
    }

    const { email } = validatedFields.data

    const existingUser = await getUserByEmail(email)

    if (!existingUser) {
      throw new Error('Email not found!')
    }

    const passwordResetToken = await generatePasswordResetToken(email)
    await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token)
  } catch (error) {
    console.error('[RECOVER_ERROR]', error)
    return { error: getErrorMessage(error) }
  }
}
