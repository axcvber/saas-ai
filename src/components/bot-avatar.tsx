import { Avatar, AvatarImage } from '@/components/ui/avatar'

export const BotAvatar = () => {
  return (
    <Avatar className='h-9 w-9'>
      <AvatarImage src='/bot-avatar.png' />
    </Avatar>
  )
}
