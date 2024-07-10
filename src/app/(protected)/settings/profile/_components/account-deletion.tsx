'use client'

import { logout } from '@/actions/auth/logout'
import { deleteUser } from '@/actions/user/delete-user'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { ModalTypeEnum } from '@/providers/modal-provider'
import useModalStore from '@/store/use-modal-store'
import { Trash } from 'lucide-react'

const AccountDeletion = () => {
  const showModal = useModalStore((state) => state.showModal)
  const hideModal = useModalStore((state) => state.hideModal)
  const { toast } = useToast()

  const handleDeleteUser = async () => {
    const data = await deleteUser()
    if (data?.error) {
      toast({
        title: data.error,
        variant: 'destructive',
      })
      return
    }

    await logout()
    hideModal()
    toast({
      title: 'Your account has been successfully deleted',
      variant: 'success',
    })
  }

  const showConfirmModal = () => {
    showModal(ModalTypeEnum.CONFIRMATION, {
      title: 'Are you absolutely sure?',
      description:
        'This action cannot be undone. This will permanently delete your account and remove your data from our servers.',
      onConfirm: handleDeleteUser,
    })
  }

  return (
    <div>
      <h6>Account Deletion</h6>
      <p className='mt-1 text-sm text-neutral-400'>This button will delete your account permanently</p>
      <Button size={'sm'} variant={'destructive'} className='mt-4' onClick={showConfirmModal}>
        <Trash />
        Delete Account
      </Button>
    </div>
  )
}

export default AccountDeletion
