'use client'

import { deleteChat } from '@/actions/chat/delete-chat'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { ModalTypeEnum } from '@/providers/modal-provider'
import useModalStore from '@/store/use-modal-store'
import { ChatType } from '@prisma/client'
import { Pencil, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { MouseEvent } from 'react'

interface ChatActionsProps {
  id: string
  name: string
  type: ChatType
}

const ChatActions: React.FC<ChatActionsProps> = ({ id, name, type }) => {
  const showModal = useModalStore((state) => state.showModal)
  const hideModal = useModalStore((s) => s.hideModal)
  const { toast } = useToast()
  const router = useRouter()

  const showConfirmModal = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    showModal(ModalTypeEnum.CONFIRMATION, {
      title: 'Are you absolutely sure?',
      description:
        'This action cannot be undone. This will permanently delete your account and remove your data from our servers.',
      onConfirm: handleDeleteChat,
    })
  }

  const handleEdit = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    showModal(ModalTypeEnum.EDIT_CHAT, {
      chatId: id,
      name,
      type,
    })
  }

  const handleDeleteChat = async () => {
    const result = await deleteChat(id)
    if (result?.error) {
      toast({
        title: result.error,
        variant: 'destructive',
      })
      return
    }
    router.push(`/${type.toLowerCase()}`)
    router.refresh()
    hideModal()
    toast({
      title: "You've successfully deleted a chat",
      variant: 'success',
    })
  }

  return (
    <div className='flex items-center gap-2 z-10'>
      <Button size={'icon'} variant={'outline'} onClick={handleEdit}>
        <Pencil />
      </Button>
      <Button size={'icon'} variant={'outline-destructive'} onClick={showConfirmModal}>
        <Trash2 />
      </Button>
    </div>
  )
}

export default ChatActions
