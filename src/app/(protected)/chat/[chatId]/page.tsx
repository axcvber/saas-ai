import React from 'react'
import MassageList from './_components/message-list'
import { getMessages } from '@/actions/get-messages'

const ChatIdPage = async ({ params }: { params: { chatId: string } }) => {
  const initialMessages = await getMessages(params.chatId)

  return <MassageList chatId={params.chatId} data={initialMessages.messages} nextCursor={initialMessages.nextCursor} />
}

export default ChatIdPage
