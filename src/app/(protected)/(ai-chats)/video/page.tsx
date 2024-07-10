import { getAllChats } from '@/actions/chat/get-all-chats'
import ChatList from '../_components/chat-list'
import ChatsHeading from '../_components/chats-heading'
import { getHeadingValues } from '@/lib/utils'

const VideoPage = async () => {
  const data = await getAllChats('VIDEO')
  const { icon: Icon, iconColor, bgColor } = getHeadingValues('VIDEO')

  return (
    <>
      <ChatsHeading
        title='Video Generation'
        description='Turn your prompt into video.'
        icon={<Icon />}
        iconColor={iconColor}
        bgColor={bgColor}
      />
      <ChatList data={data} />
    </>
  )
}

export default VideoPage
