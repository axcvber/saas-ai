'use client'

import FormInput from '@/components/form/form-input'
import React from 'react'
import AuthCard from '../auth-card'
import { RegisterSchema, RegisterSchemaType } from '@/schemas'
import { useRouter } from 'next/navigation'
import { AppRoutes } from '@/routes'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import FormInputPass from '@/components/form/form-input-pass'
import FormCheckbox from '@/components/form/form-checkbox'
import { register } from '@/actions/auth/register'
import { useToast } from '@/components/ui/use-toast'
import { login } from '@/actions/auth/login'

interface RegisterFormProps {
  signInCallback?: () => void
}

const RegisterForm: React.FC<RegisterFormProps> = ({ signInCallback }) => {
  const router = useRouter()
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      acceptsTerms: false,
    },
  })

  const { toast } = useToast()

  const isSubmitting = form.formState.isSubmitting

  const handleSignInClick = () => {
    if (signInCallback) {
      signInCallback()
      return
    }
    router.push(AppRoutes.LOGIN)
  }

  const onSubmit = async (values: RegisterSchemaType) => {
    const result = await register(values)

    if (result?.error) {
      toast({
        title: result.error,
        variant: 'destructive',
      })
      return
    }

    const loginResponse = await login({ email: values.email, password: values.password })

    if (loginResponse?.error) {
      router.push(AppRoutes.LOGIN)
      return
    }

    window.location.reload()

    toast({
      title: "You've successfully registered",
      variant: 'success',
    })
  }

  return (
    <AuthCard
      title={'Registration'}
      desc={'Create your profile and get first access to the very best of Future Tech contents.'}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-5'>
          <div className='space-y-4'>
            <FormInput
              control={form.control}
              name='firstName'
              label='First Name'
              placeholder='John'
              disabled={isSubmitting}
            />
            <FormInput
              control={form.control}
              name='lastName'
              label='Last Name'
              placeholder='Doe'
              disabled={isSubmitting}
            />
            <FormInput
              control={form.control}
              name='email'
              type='email'
              label='Email'
              placeholder='john.doe@example.com'
              disabled={isSubmitting}
            />
            <FormInputPass
              control={form.control}
              name='password'
              label='Password'
              placeholder='*******'
              disabled={isSubmitting}
            />
            <FormCheckbox
              control={form.control}
              name='acceptsTerms'
              label='You agree to our Terms of Service and Privacy Policy.'
              disabled={isSubmitting}
            />
          </div>

          <Button className='w-full' type='submit' disabled={isSubmitting}>
            Sign Up
          </Button>

          <div className='flex items-center justify-center gap-1'>
            <span className='text-sm font-medium text-neutral-500'>{`Already have an account?`}</span>
            <Button variant={'link'} className='underline' onClick={handleSignInClick}>
              {'Log In'}
            </Button>
          </div>
        </form>
      </Form>
    </AuthCard>
  )
}

export default RegisterForm
