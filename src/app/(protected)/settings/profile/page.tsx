import React from 'react'
import { Heading } from '@/components/ui/heading'
import { SquareUser } from 'lucide-react'
import UserInfoForm from './_components/user-info-form'
import ChangePasswordForm from './_components/change-password-form'
import { Separator } from '@/components/ui/separator'
import AccountDeletion from './_components/account-deletion'

const ProfilePage = async () => {
  return (
    <>
      <Heading
        title='Profile'
        description='Manage your profile data.'
        icon={<SquareUser />}
        iconColor='text-gray-700'
        bgColor='bg-gray-700/10'
      />

      <div className='space-y-10'>
        <UserInfoForm />

        <Separator />

        <div className='grid lg:grid-cols-2 gap-5'>
          <div>
            <h6>Change Password</h6>
            <p className='mt-1 text-sm text-neutral-400'>Choose a password that will be hard for others to guess.</p>
          </div>
          <ChangePasswordForm />
        </div>

        <Separator />

        <AccountDeletion />
      </div>
    </>
  )
}

export default ProfilePage
