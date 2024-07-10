'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useCurrentUser } from '@/hooks/use-current-user'
import { useSession } from 'next-auth/react'
import { UserInfoSchema, UserInfoSchemaType } from '@/schemas'
import { updateUserInfo } from '@/actions/user/update-user-info'
import FormInput from '@/components/form/form-input'
import { useToast } from '@/components/ui/use-toast'

const UserInfoForm = () => {
  const { user } = useCurrentUser()
  const { toast } = useToast()
  const { update } = useSession()

  const form = useForm<UserInfoSchemaType>({
    resolver: zodResolver(UserInfoSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
    },
  })

  const isDirty = form.formState.isDirty
  const isSubmitting = form.formState.isSubmitting

  const onSubmit = async (data: UserInfoSchemaType) => {
    const result = await updateUserInfo(data)
    if (result?.error) {
      form.reset()
      toast({
        title: result.error,
        variant: 'destructive',
      })
      return
    }
    await update()
    window.location.reload()
    form.reset(data)
    toast({
      title: 'Your data was successfully updated.',
      variant: 'success',
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
        <div className='grid lg:grid-cols-2 gap-5'>
          <FormInput
            control={form.control}
            name='firstName'
            label='First Name'
            placeholder='Enter First Name'
            disabled={isSubmitting}
          />
          <FormInput
            control={form.control}
            name='lastName'
            label='Last Name'
            placeholder='Enter Last Name'
            disabled={isSubmitting}
          />

          <FormInput
            control={form.control}
            name='email'
            type='email'
            label='Email Address'
            placeholder='Enter email'
            disabled={isSubmitting}
          />

          <div className='flex items-end justify-end gap-3'>
            <Button size={'sm'} variant={'outline'} disabled={!isDirty || isSubmitting} onClick={() => form.reset()}>
              Cancel
            </Button>
            <Button size={'sm'} type='submit' disabled={!isDirty || isSubmitting}>
              Save
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default UserInfoForm
