'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { AppRoutes } from '@/routes'
import { useRouter } from 'next/navigation'
import FormInput from '@/components/form/form-input'
import { ResetPassSchema, ResetPassSchemaType } from '@/schemas'
import { useToast } from '@/components/ui/use-toast'
import AuthCard from '../auth-card'
import { recoverUser } from '@/actions/auth/recover'

interface IResetPasswordForm {
  signInCallback?: () => void
}

const ResetPasswordForm: React.FC<IResetPasswordForm> = ({ signInCallback }) => {
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<ResetPassSchemaType>({
    resolver: zodResolver(ResetPassSchema),
    defaultValues: {
      email: '',
    },
  })

  const isSubmitting = form.formState.isSubmitting

  const handleSignInClick = () => {
    if (signInCallback) {
      signInCallback()
      return
    }
    router.push(AppRoutes.LOGIN)
  }

  const onSubmit = async (values: ResetPassSchemaType) => {
    const result = await recoverUser(values)

    if (result?.error) {
      toast({
        title: result.error,
        variant: 'destructive',
      })
      return
    }

    form.reset()
    toast({
      title: 'Reset email sent!',
      description: 'Check your email for a confirmation link.',
      variant: 'success',
    })
  }

  return (
    <AuthCard title={'Reset Password'} desc={'Enter the registered E-mail'}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <FormInput
            control={form.control}
            name='email'
            type='email'
            label='Email'
            placeholder='john.doe@example.com'
            disabled={isSubmitting}
          />

          <Button className='w-full' type='submit' disabled={isSubmitting}>
            Submit
          </Button>

          <div className='flex items-center justify-center gap-1 w-full'>
            <span className='text-sm font-medium text-neutral-500'>{`Remember the password?`}</span>
            <Button variant={'link'} className='underline' onClick={handleSignInClick}>
              Back to Login
            </Button>
          </div>
        </form>
      </Form>
    </AuthCard>
  )
}

export default ResetPasswordForm
