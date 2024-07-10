import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useCurrentUser } from '@/hooks/use-current-user'

export const UserAvatar = () => {
  const { user } = useCurrentUser()

  return (
    <Avatar className='h-9 w-9'>
      <AvatarImage src='/user-avatar.png' />
      <AvatarFallback>
        {user?.firstName.charAt(0)}
        {user?.lastName.charAt(0)}
      </AvatarFallback>
    </Avatar>
  )
}
