'use client'

import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { logout } from '@/actions/auth/logout'
import { UserAvatar } from '@/components/user-avatar'
import { CreditCard, LogOut, Settings, User } from 'lucide-react'
import { AppRoutes } from '@/routes'
import { useRouter } from 'next/navigation'
import { useCurrentUser } from '@/hooks/use-current-user'
import useModalStore from '@/store/use-modal-store'
import { ModalTypeEnum } from '@/providers/modal-provider'

const menuData = [
  {
    label: 'Profile',
    icon: User,
    link: AppRoutes.PROFILE,
  },
  {
    label: 'Billing',
    icon: CreditCard,
    link: AppRoutes.BILLING,
  },
  {
    label: 'Settings',
    icon: Settings,
    link: AppRoutes.SETTINGS,
  },
]

const UserButton = () => {
  const showModal = useModalStore((state) => state.showModal)
  const hideModal = useModalStore((state) => state.hideModal)

  const { user } = useCurrentUser()
  const router = useRouter()

  const handleClick = (link: string) => {
    router.push(link)
  }

  const handleLogout = async () => {
    await logout()
    hideModal()
  }

  const showConfirmModal = () => {
    showModal(ModalTypeEnum.CONFIRMATION, {
      title: 'Are you sure?',
      description: '',
      onConfirm: handleLogout,
    })
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <UserAvatar />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' sideOffset={10}>
        <DropdownMenuLabel>
          {user?.firstName} {user?.lastName}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {menuData.map((item) => (
          <DropdownMenuItem key={item.link} onClick={() => handleClick(item.link)}>
            <item.icon className='mr-2 h-4 w-4' />
            <span>{item.label}</span>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={showConfirmModal}>
          <LogOut className='mr-2 h-4 w-4' />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton
