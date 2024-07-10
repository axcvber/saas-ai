import React from 'react'
import { Chat } from '@prisma/client'
import ChatItem from './chat-item'
import { Empty } from '@/components/empty'

interface ChatListProps {
  data: Chat[]
}

const ChatList: React.FC<ChatListProps> = ({ data }) => {
  if (data.length === 0) {
    return <Empty label='No chats have been created.' />
  }

  return (
    <div className='space-y-4'>
      {data.map((item) => (
        <ChatItem key={item.id} {...item} />
      ))}
    </div>
  )
}

export default ChatList
