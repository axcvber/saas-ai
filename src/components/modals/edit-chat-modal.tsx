import React from 'react'
import { Modal } from '../ui/modal'
import { useRouter } from 'next/navigation'
import { useToast } from '../ui/use-toast'
import { ChatType } from '@prisma/client'
import useModalStore from '@/store/use-modal-store'
import { CreateChatSchema, CreateChatSchemaType } from '@/schemas'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '../ui/form'
import FormInput from '../form/form-input'
import { Button } from '../ui/button'
import { editChat } from '@/actions/chat/edit-chat'

export interface EditChatModalProps {
  chatId: string
  name: string
  type: ChatType
}

const EditChatModal = () => {
  const isOpen = useModalStore((s) => s.isOpen)
  const hideModal = useModalStore((s) => s.hideModal)
  const { chatId, name, type } = useModalStore((s) => s.data) as EditChatModalProps
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<CreateChatSchemaType>({
    resolver: zodResolver(CreateChatSchema),
    defaultValues: {
      type,
      name,
    },
  })

  const isSubmitting = form.formState.isSubmitting

  const onSubmit = async (values: CreateChatSchemaType) => {
    const result = await editChat(chatId, values)
    if (result.error) {
      toast({
        title: result.error,
        variant: 'destructive',
      })
      return
    }
    if (result.data) {
      router.refresh()
      hideModal()
      toast({
        title: "You've successfully edited a chat",
        variant: 'success',
      })
    }
  }

  return (
    <Modal title={'Edit Chat'} isOpen={isOpen} onClose={hideModal}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormInput
              control={form.control}
              name='name'
              label='Name'
              placeholder='Chat Name'
              disabled={isSubmitting}
            />
          </div>

          <Button className='w-full' type='submit' disabled={isSubmitting}>
            Continue
          </Button>
        </form>
      </Form>
    </Modal>
  )
}

export default EditChatModal
