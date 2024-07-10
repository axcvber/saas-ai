'use client'

import { Button } from '@/components/ui/button'
import { Heading, HeadingProps } from '@/components/ui/heading'
import { ModalTypeEnum } from '@/providers/modal-provider'
import useModalStore from '@/store/use-modal-store'
import { Plus } from 'lucide-react'
import React from 'react'

interface ChatsHeadingProps extends HeadingProps {}

const ChatsHeading: React.FC<ChatsHeadingProps> = (props) => {
  const showModal = useModalStore((s) => s.showModal)

  const handleCreateChat = () => {
    showModal(ModalTypeEnum.CREATE_CHAT)
  }

  return (
    <Heading {...props}>
      <Button onClick={handleCreateChat}>
        <Plus />
        Create Chat
      </Button>
    </Heading>
  )
}

export default ChatsHeading
