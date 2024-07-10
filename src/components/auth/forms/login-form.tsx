'use client'

import { useForm } from 'react-hook-form'
import { useRouter, useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema, LoginSchemaType } from '@/schemas'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import FormInput from '@/components/form/form-input'
import { login } from '@/actions/auth/login'
import { useToast } from '@/components/ui/use-toast'
import { AppRoutes } from '@/routes'
import AuthCard from '../auth-card'
import { useSession } from 'next-auth/react'

interface LoginFormProps {
  resetPassCallback?: () => void
  signUpCallback?: () => void
}

export const LoginForm: React.FC<LoginFormProps> = ({ resetPassCallback, signUpCallback }) => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')
  const { toast } = useToast()
  const router = useRouter()
  const { update } = useSession()

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const isSubmitting = form.formState.isSubmitting

  const handleSignUpClick = () => {
    if (signUpCallback) {
      signUpCallback()
      return
    }
    router.push(AppRoutes.REGISTER)
  }

  const handleForgotPassClick = () => {
    if (resetPassCallback) {
      resetPassCallback()
      return
    }
    router.push(AppRoutes.RESET_PASSWORD)
  }

  const onSubmit = async (values: LoginSchemaType) => {
    const result = await login(values, callbackUrl)

    if (result?.error) {
      toast({
        title: result.error,
        variant: 'destructive',
      })
      return
    }
    //to avoid a bug with undefined client session after login
    window.location.href = callbackUrl || window.location.href
    toast({
      title: "You've successfully logged in",
      variant: 'success',
    })
  }

  return (
    <AuthCard title={'Log In'} desc={'Please enter your e-mail and password'}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormInput
              control={form.control}
              name='email'
              type='email'
              label='Email'
              placeholder='john.doe@example.com'
              disabled={isSubmitting}
            />

            <FormInput
              control={form.control}
              name='password'
              type='password'
              label='Password'
              placeholder='*******'
              disabled={isSubmitting}
              inputClassName='pr-32'
              rightNode={
                <Button
                  variant='link'
                  className='text-xs absolute top-1/2 right-3 -translate-y-1/2 text-neutral-400'
                  onClick={handleForgotPassClick}
                >
                  Forgot password?
                </Button>
              }
            />
          </div>

          <Button className='w-full' type='submit' disabled={isSubmitting}>
            Sign In
          </Button>
          <div className='flex items-center justify-center gap-1'>
            <span className='text-sm font-medium text-neutral-500'>Don't have an account?</span>
            <Button variant={'link'} className='underline' onClick={handleSignUpClick}>
              Join Us
            </Button>
          </div>
        </form>
      </Form>
    </AuthCard>
  )
}
