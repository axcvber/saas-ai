import { ChatType } from '@prisma/client'
import { z } from 'zod'

export type LoginSchemaType = z.infer<typeof LoginSchema>

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Please enter an email address' })
    .max(30, { message: 'Please enter a valid email address' })
    .email({ message: 'Please enter a valid email address' }),
  password: z
    .string({ required_error: 'Password is required' })
    .min(1, 'Password is required')
    .max(32, 'Password must be less than 32 characters'),
})

export type RegisterSchemaType = z.infer<typeof RegisterSchema>

export const RegisterSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(3, { message: 'First Name is required' })
    .max(30, { message: 'Please enter a valid First Name' }),
  lastName: z
    .string()
    .trim()
    .min(3, { message: 'Last Name is required' })
    .max(30, { message: 'Please enter a valid Last Name' }),
  email: z
    .string()
    .min(1, { message: 'Please enter an email address' })
    .max(30, { message: 'Please enter a valid email address' })
    .email({ message: 'Please enter a valid email address' }),
  password: z
    .string({ required_error: 'Password is required' })
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  acceptsTerms: z.boolean().refine((value) => value === true, {
    message: 'You must accept the terms and conditions',
  }),
})

export type UserInfoSchemaType = z.infer<typeof UserInfoSchema>

export const UserInfoSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(3, { message: 'First Name is required' })
    .max(30, { message: 'Please enter a valid First Name' }),
  lastName: z
    .string()
    .trim()
    .min(3, { message: 'Last Name is required' })
    .max(30, { message: 'Please enter a valid Last Name' }),
  email: z
    .string()
    .min(1, { message: 'Please enter an email address' })
    .max(30, { message: 'Please enter a valid email address' })
    .email({ message: 'Please enter a valid email address' }),
})

export type NewPassSchemaType = z.infer<typeof NewPassSchema>

export const NewPassSchema = z
  .object({
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Please provide matching passwords',
    path: ['confirmPassword'],
  })

export type ResetPassSchemaType = z.infer<typeof ResetPassSchema>

export const ResetPassSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Please enter an email address' })
    .max(30, { message: 'Please enter a valid email address' })
    .email({ message: 'Please enter a valid email address' }),
})

export type ChatSchemaType = z.infer<typeof ChatSchema>

export const ChatSchema = z.object({
  prompt: z.string().min(1, {
    message: 'Prompt is required.',
  }),
})

export type CreateChatSchemaType = z.infer<typeof CreateChatSchema>

export const CreateChatSchema = z.object({
  type: z.nativeEnum(ChatType),
  name: z.string().min(1, {
    message: 'Chat name is required.',
  }),
})
