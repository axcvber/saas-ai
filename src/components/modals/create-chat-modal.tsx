import React from 'react'
import { Modal } from '../ui/modal'
import { usePathname, useRouter } from 'next/navigation'
import { useToast } from '../ui/use-toast'
import { ChatType } from '@prisma/client'
import useModalStore from '@/store/use-modal-store'
import { createChat } from '@/actions/chat/create-chat'
import { CreateChatSchema, CreateChatSchemaType } from '@/schemas'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '../ui/form'
import FormInput from '../form/form-input'
import { Button } from '../ui/button'
import { AppRoutes } from '@/routes'

const CreateChatModal = () => {
  const isOpen = useModalStore((s) => s.isOpen)
  const hideModal = useModalStore((s) => s.hideModal)
  const pathname = usePathname()
  const { toast } = useToast()
  const router = useRouter()

  const URLChatType = pathname.split('/').pop() || ''

  const form = useForm<CreateChatSchemaType>({
    resolver: zodResolver(CreateChatSchema),
    defaultValues: {
      type: URLChatType.toUpperCase() as ChatType,
      name: '',
    },
  })

  const isSubmitting = form.formState.isSubmitting

  const onSubmit = async (values: CreateChatSchemaType) => {
    const result = await createChat(values)
    if (result.error) {
      toast({
        title: result.error,
        variant: 'destructive',
      })
      return
    }
    if (result.data) {
      router.push(`${AppRoutes.CHAT}/${result.data.id}`)
      hideModal()
      toast({
        title: "You've successfully created a chat",
        variant: 'success',
      })
    }
  }

  return (
    <Modal title={'Create chat'} isOpen={isOpen} onClose={hideModal} openAutoFocus>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormInput
              control={form.control}
              name='name'
              label='Chat name'
              placeholder='Name'
              disabled={isSubmitting}
            />
          </div>

          <Button className='w-full' type='submit' disabled={isSubmitting}>
            Create
          </Button>
        </form>
      </Form>
    </Modal>
  )
}

export default CreateChatModal
