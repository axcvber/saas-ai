import { AppRoutes } from '@/routes'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const domain = process.env.NEXT_PUBLIC_APP_URL

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}${AppRoutes.NEW_PASSWORD}?token=${token}`

  const { error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
  })

  if (error) {
    console.error(error)
    throw new Error(error.message)
  }
}
