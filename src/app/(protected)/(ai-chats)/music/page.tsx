import ChatList from '../_components/chat-list'
import ChatsHeading from '../_components/chats-heading'
import { getAllChats } from '@/actions/chat/get-all-chats'
import { getHeadingValues } from '@/lib/utils'

const MusicPage = async () => {
  const data = await getAllChats('MUSIC')
  const { icon: Icon, iconColor, bgColor } = getHeadingValues('MUSIC')

  return (
    <>
      <ChatsHeading
        title='Music Generation'
        description='Turn your prompt into music.'
        icon={<Icon />}
        iconColor={iconColor}
        bgColor={bgColor}
      />
      <ChatList data={data} />
    </>
  )
}

export default MusicPage
