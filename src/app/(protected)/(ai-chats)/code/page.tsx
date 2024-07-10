import { getAllChats } from '@/actions/chat/get-all-chats'
import ChatsHeading from '../_components/chats-heading'
import ChatList from '../_components/chat-list'
import { getHeadingValues } from '@/lib/utils'

const CodePage = async () => {
  const data = await getAllChats('CODE')
  const { icon: Icon, iconColor, bgColor } = getHeadingValues('CODE')

  return (
    <>
      <ChatsHeading
        title='Code Generation'
        description='Generate code using descriptive text.'
        icon={<Icon />}
        iconColor={iconColor}
        bgColor={bgColor}
      />
      <ChatList data={data} />
    </>
  )
}

export default CodePage
