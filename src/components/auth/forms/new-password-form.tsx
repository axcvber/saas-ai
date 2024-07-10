'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { AppRoutes } from '@/routes'
import { newPassword } from '@/actions/auth/new-pass'
import { NewPassSchema, NewPassSchemaType } from '@/schemas'
import { useToast } from '@/components/ui/use-toast'
import FormInputPass from '@/components/form/form-input-pass'
import AuthCard from '../auth-card'

const NewPasswordForm = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<NewPassSchemaType>({
    resolver: zodResolver(NewPassSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const isSubmitting = form.formState.isSubmitting

  const onSubmit = async (data: NewPassSchemaType) => {
    const result = await newPassword(data, token)
    if (result?.error) {
      toast({
        title: result.error,
        variant: 'destructive',
      })
      return
    }
    form.reset()
    toast({
      title: 'Your password has been successfully reset',
      description: 'You can now log in with your new password',
      variant: 'success',
    })
    router.push(AppRoutes.LOGIN)
  }

  return (
    <AuthCard title={'New Password'} desc={'Create a new password'}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormInputPass
              control={form.control}
              name='password'
              label='New Password'
              placeholder='******'
              disabled={isSubmitting}
            />
            <FormInputPass
              control={form.control}
              name='confirmPassword'
              label='Confirm Password'
              placeholder={'******'}
              disabled={isSubmitting}
            />
          </div>

          <Button className='w-full' type='submit' disabled={isSubmitting}>
            Reset Password
          </Button>
        </form>
      </Form>
    </AuthCard>
  )
}

export default NewPasswordForm
