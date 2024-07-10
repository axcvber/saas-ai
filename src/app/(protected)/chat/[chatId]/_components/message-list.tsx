'use client'

import React, { useCallback, useEffect, useRef, useState, useTransition } from 'react'
import { getMessages } from '@/actions/get-messages'
import ChatForm from '@/components/chat-form'
import { Empty } from '@/components/empty'
import InfiniteScroll from '@/components/infinite-scroll'
import { Loader } from '@/components/loader'
import { useToast } from '@/components/ui/use-toast'
import { ChatSchemaType } from '@/schemas'
import { Message } from '@prisma/client'
import MessageItem from './message-item'
import useModalStore from '@/store/use-modal-store'
import { ModalTypeEnum } from '@/providers/modal-provider'
import { sendMessage } from '@/actions/send-message'

interface CreateMessageParams {
  role: string
  content: string | null
  codeSnippet?: string | null
  imageUrls?: string[]
  musicUrl?: string | null
  videoUrl?: string | null
}

const createMessage = ({
  role,
  content,
  codeSnippet,
  imageUrls,
  musicUrl,
  videoUrl,
}: CreateMessageParams): Message => ({
  id: Date.now().toString(),
  role,
  content,
  chatId: '',
  name: null,
  userId: '',
  imageUrls: imageUrls || [],
  codeSnippet: codeSnippet || null,
  musicUrl: musicUrl || null,
  videoUrl: videoUrl || null,
  createdAt: new Date(),
  updatedAt: new Date(),
})

interface MassageListProps {
  data: Message[]
  nextCursor: string | null
  chatId: string
}

const MassageList: React.FC<MassageListProps> = ({ data, chatId, nextCursor }) => {
  const [cursor, setCursor] = useState<string | null>(nextCursor)
  const [isNewMessage, setIsNewMessage] = useState(false)
  const [hasMore, setHasMore] = useState(!!nextCursor)
  const [messages, setMessages] = useState(data)
  const [isPending, startTransition] = useTransition()
  const [isLoading, startLoading] = useTransition()
  const { toast } = useToast()

  const showModal = useModalStore((state) => state.showModal)

  const showSubscriptionModal = () => {
    showModal(ModalTypeEnum.SUBSCRIPTION)
  }

  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const loadMoreMessages = useCallback(() => {
    if (isPending || !hasMore) return

    startTransition(async () => {
      const result = await getMessages(chatId, cursor)

      setMessages((prevMessages) => [...prevMessages, ...result.messages])
      setCursor(result.nextCursor)
      setHasMore(!!result.nextCursor)
    })
  }, [cursor, chatId, isPending, hasMore])

  const scrollToBottom = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0
    }
  }, [])

  useEffect(() => {
    if (isNewMessage) {
      scrollToBottom()
      setIsNewMessage(false)
    }
  }, [messages, isNewMessage, scrollToBottom])

  const onSubmit = ({ prompt }: ChatSchemaType) => {
    setIsNewMessage(true)
    const userMessage = createMessage({
      role: 'user',
      content: prompt,
    })
    setMessages((prevMessages) => [userMessage, ...prevMessages])

    startLoading(async () => {
      const result = await sendMessage(prompt, chatId)

      if (result?.error) {
        if (result.status === 403) showSubscriptionModal()
        toast({
          title: result.error,
          variant: 'destructive',
        })
        return
      }

      if (result.data) {
        const { text, codeSnippet, imageUrls, musicUrl, videoUrl } = result.data

        const aiMessage = createMessage({
          role: 'assistant',
          content: text,
          imageUrls,
          codeSnippet,
          musicUrl,
          videoUrl,
        })

        setMessages((prevMessages) => [aiMessage, ...prevMessages])
      }
    })
  }

  return (
    <>
      <div className='h-full overflow-hidden relative bg-muted rounded-lg border'>
        {messages.length === 0 && !isLoading && <Empty label='No conversation started.' />}
        {isLoading && <Loader />}
        <div ref={scrollContainerRef} className='flex flex-col-reverse overflow-auto h-full gap-y-3 p-4'>
          {messages.map((message, inx) => (
            <MessageItem key={`${message.role}-${inx}`} {...message} />
          ))}
          {hasMore && <InfiniteScroll isFetchingNextPage={isPending} fetchNextPage={loadMoreMessages} />}
        </div>
      </div>
      <ChatForm onSubmit={onSubmit} />
    </>
  )
}

export default MassageList
