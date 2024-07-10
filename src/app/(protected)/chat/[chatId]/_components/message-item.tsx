import { BotAvatar } from '@/components/bot-avatar'
import { Button } from '@/components/ui/button'
import { Card, CardFooter } from '@/components/ui/card'
import { UserAvatar } from '@/components/user-avatar'
import { cn, formatDate } from '@/lib/utils'
import { Message } from '@prisma/client'
import { Download } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import CodeSnippet from './code-snippet'

const MessageItem: React.FC<Message> = ({ role, content, imageUrls, createdAt, codeSnippet, musicUrl, videoUrl }) => {
  return (
    <div
      className={cn(
        'p-4 w-full rounded-lg border container max-w-3xl space-y-3',
        role === 'user' ? 'bg-white' : 'bg-input/80'
      )}
    >
      <div className='flex items-start gap-x-4'>
        {role === 'user' ? <UserAvatar /> : <BotAvatar />}
        <p className='text-sm'>{typeof content === 'string' ? content : ''}</p>
      </div>

      {imageUrls && imageUrls.length > 0 && (
        <div className='w-full grid grid-cols-2 sm:grid-cols-3 gap-2'>
          {imageUrls.map((url, index) => (
            <Card key={url} className='rounded-md p-2'>
              <div className='relative aspect-square'>
                <Image fill src={url} alt={`Generated image ${index + 1}`} />
              </div>
              <CardFooter className='pt-2 px-0 pb-0'>
                <Button variant={'outline'} size={'sm'} onClick={() => window.open(url)} className='w-full'>
                  <Download />
                  Download
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {codeSnippet && <CodeSnippet content={codeSnippet} />}

      {musicUrl && (
        <audio controls className='w-full'>
          <source src={musicUrl} />
        </audio>
      )}

      {videoUrl && (
        <video controls className='w-full aspect-video rounded-lg'>
          <source src={videoUrl} />
        </video>
      )}

      <div className='flex justify-end'>
        <p className='text-xs text-muted-foreground shrink-0'>{formatDate(createdAt)}</p>
      </div>
    </div>
  )
}

export default MessageItem
