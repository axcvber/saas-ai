'use client'

import React from 'react'
import useModalStore from '@/store/use-modal-store'
import CreateChatModal from '@/components/modals/create-chat-modal'
import ConfirmationModal, { ConfirmModalProps } from '@/components/modals/confirmation-modal'
import EditChatModal, { EditChatModalProps } from '@/components/modals/edit-chat-modal'
import SubscriptionModal from '@/components/modals/subscription-modal'

export enum ModalTypeEnum {
  CREATE_CHAT = 'CREATE_CHAT',
  EDIT_CHAT = 'EDIT_CHAT',
  CONFIRMATION = 'CONFIRMATION',
  SUBSCRIPTION = 'SUBSCRIPTION',
}

export type ModalData = {
  [ModalTypeEnum.EDIT_CHAT]: EditChatModalProps
  [ModalTypeEnum.CONFIRMATION]: ConfirmModalProps
}

const MODAL_COMPONENTS = {
  [ModalTypeEnum.CREATE_CHAT]: CreateChatModal,
  [ModalTypeEnum.EDIT_CHAT]: EditChatModal,
  [ModalTypeEnum.CONFIRMATION]: ConfirmationModal,
  [ModalTypeEnum.SUBSCRIPTION]: SubscriptionModal,
}

const renderComponent = (type: ModalTypeEnum | null, data: any) => {
  const ModalComponent = type ? MODAL_COMPONENTS[type] : null
  return ModalComponent ? <ModalComponent {...data} /> : null
}

const ModalProvider = () => {
  const type = useModalStore((state) => state.type)
  const data = useModalStore((state) => state.data)

  return <>{renderComponent(type, data)}</>
}

export default ModalProvider
