'use client'

import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import FormInputPass from '@/components/form/form-input-pass'
import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { NewPassSchema, NewPassSchemaType } from '@/schemas'
import { changePassword } from '@/actions/user/change-password'

const ChangePasswordForm = () => {
  const form = useForm<NewPassSchemaType>({
    resolver: zodResolver(NewPassSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const { toast } = useToast()
  const isDirty = form.formState.isDirty
  const isSubmitting = form.formState.isSubmitting

  const onSubmit = async (data: NewPassSchemaType) => {
    const result = await changePassword(data)
    form.reset()
    if (result?.error) {
      toast({
        title: result.error,
        variant: 'destructive',
      })
      return
    }
    toast({
      title: 'Your password was successfully changed',
      variant: 'success',
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-5'>
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

        <div className='flex flex-col gap-6'>
          <Button type='submit' disabled={!isDirty || isSubmitting}>
            Change Password
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ChangePasswordForm
