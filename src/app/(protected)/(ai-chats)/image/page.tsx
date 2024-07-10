import { getAllChats } from '@/actions/chat/get-all-chats'
import ChatsHeading from '../_components/chats-heading'
import ChatList from '../_components/chat-list'
import { getHeadingValues } from '@/lib/utils'

const ImagePage = async () => {
  const data = await getAllChats('IMAGE')
  const { icon: Icon, iconColor, bgColor } = getHeadingValues('IMAGE')

  return (
    <>
      <ChatsHeading
        title='Image Generation'
        description='Turn your prompt into an image.'
        icon={<Icon />}
        iconColor={iconColor}
        bgColor={bgColor}
      />
      <ChatList data={data} />
    </>
  )
}

export default ImagePage
