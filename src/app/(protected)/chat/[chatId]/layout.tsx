import { enumToCapitalCase, getHeadingValues } from '@/lib/utils'
import { getChat } from '@/actions/chat/get-chat'
import { Heading } from '@/components/ui/heading'
import { notFound } from 'next/navigation'
import ChatActions from '@/components/chat-actions'

const ChatLayout = async ({ children, params }: { children: React.ReactNode; params: { chatId: string } }) => {
  const chat = await getChat(params.chatId)

  if (!chat) {
    notFound()
  }

  const { id, name, type } = chat
  const { icon: Icon, iconColor, bgColor } = getHeadingValues(type)

  return (
    <>
      <Heading
        title={name}
        description={`${enumToCapitalCase(type)} Chat`}
        icon={<Icon />}
        iconColor={iconColor}
        bgColor={bgColor}
      >
        <ChatActions id={id} name={name} type={type} />
      </Heading>
      {children}
    </>
  )
}

export default ChatLayout
