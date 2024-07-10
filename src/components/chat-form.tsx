'use client'

import React, { ChangeEvent, KeyboardEvent, useEffect } from 'react'
import { Form, FormControl, FormField, FormItem } from './ui/form'
import { useForm } from 'react-hook-form'
import { Button } from './ui/button'
import { Send } from 'lucide-react'
import { Textarea } from './ui/textarea'
import { ScrollArea } from './ui/scroll-area'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChatSchema, ChatSchemaType } from '@/schemas'

interface ChatFormProps {
  onSubmit: (formData: ChatSchemaType) => void
}

const ChatForm: React.FC<ChatFormProps> = ({ onSubmit }) => {
  const form = useForm<ChatSchemaType>({
    resolver: zodResolver(ChatSchema),
    defaultValues: {
      prompt: '',
    },
  })

  const { isDirty, isSubmitting, isSubmitSuccessful } = form.formState

  useEffect(() => {
    if (isSubmitSuccessful) {
      form.reset()
    }
  }, [isSubmitSuccessful, form])

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget
    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      form.handleSubmit(onSubmit)()
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex container max-w-3xl bg-white rounded-[26px] items-end p-1.5 gap-2 shadow-md border mt-4'
      >
        <FormField
          control={form.control}
          name='prompt'
          render={({ field }) => (
            <FormItem className='w-full flex'>
              <FormControl>
                <ScrollArea type='always' className='max-h-[200px] w-full'>
                  <Textarea
                    {...field}
                    rows={1}
                    placeholder={'Type something...'}
                    className='rounded-none overflow-hidden bg-transparent border-none'
                    onChange={(e) => {
                      field.onChange(e)
                      handleChange(e)
                    }}
                    onKeyDown={handleKeyDown}
                    disabled={isSubmitting}
                  />
                </ScrollArea>
              </FormControl>
            </FormItem>
          )}
        />
        <Button type='submit' disabled={!isDirty || isSubmitting} size='icon' className='rounded-full shrink-0 h-9 w-9'>
          <Send className='!w-5 !h-5 mr-0.5' />
        </Button>
      </form>
    </Form>
  )
}

export default ChatForm
