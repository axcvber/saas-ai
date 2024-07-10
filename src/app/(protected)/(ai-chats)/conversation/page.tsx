import { getAllChats } from '@/actions/chat/get-all-chats'
import ChatList from '../_components/chat-list'
import ChatsHeading from '../_components/chats-heading'
import { getHeadingValues } from '@/lib/utils'

const ConversationPage = async () => {
  const data = await getAllChats('CONVERSATION')
  const { icon: Icon, iconColor, bgColor } = getHeadingValues('CONVERSATION')

  return (
    <>
      <ChatsHeading
        title='Conversation'
        description='Our most advanced conversation model.'
        icon={<Icon />}
        iconColor={iconColor}
        bgColor={bgColor}
      />
      <ChatList data={data} />
    </>
  )
}

export default ConversationPage
