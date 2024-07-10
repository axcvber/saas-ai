import React from 'react'
import { formatDate } from '@/lib/utils'
import { AppRoutes } from '@/routes'
import { Chat } from '@prisma/client'
import { MessageCircle } from 'lucide-react'
import Link from 'next/link'
import ChatActions from '@/components/chat-actions'

const ChatItem: React.FC<Chat> = ({ id, name, type, updatedAt }) => {
  return (
    <Link
      href={`${AppRoutes.CHAT}/${id}`}
      className='flex items-center flex-wrap gap-3 justify-between border p-4 bg-muted/70 hover:bg-muted hover:text-muted-foreground transition-colors rounded-lg'
    >
      <div className='space-y-2'>
        <p className='text-xs text-muted-foreground'>{formatDate(updatedAt)}</p>
        <div className='flex items-center gap-2'>
          <MessageCircle className='w-5 h-5' />
          {name}
        </div>
      </div>
      <ChatActions id={id} name={name} type={type} />
    </Link>
  )
}

export default ChatItem
