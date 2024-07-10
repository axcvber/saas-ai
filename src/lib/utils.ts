import { ChatType } from '@prisma/client'
import { type ClassValue, clsx } from 'clsx'
import { Code, FileAudio, ImageIcon, MessageSquare, Music } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getErrorMessage = (error: unknown): string => {
  let message: string
  if (error instanceof Error) {
    message = error.message
  } else if (error && typeof error === 'object' && 'message' in error) {
    message = String(error.message)
  } else if (typeof error === 'string') {
    message = error
  } else {
    message = 'Something went wrong'
  }
  return message
}

export function formatDate(dateString: Date) {
  const date = new Date(dateString)
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function getKeyFromUrl(url: string): string {
  const parsedUrl = new URL(url)
  return parsedUrl.pathname.slice(1)
}

export function enumToCapitalCase(enumValue: string) {
  const words = enumValue.split('_')

  const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())

  return capitalizedWords.join(' ')
}

export const getHeadingValues = (type: ChatType) => {
  switch (type) {
    case 'CODE':
      return {
        icon: Code,
        iconColor: 'text-green-700',
        bgColor: 'bg-green-700/10',
      }
    case 'IMAGE':
      return {
        icon: ImageIcon,
        iconColor: 'text-pink-700',
        bgColor: 'bg-pink-700/10',
      }
    case 'MUSIC':
      return {
        icon: Music,
        iconColor: 'text-emerald-500',
        bgColor: 'bg-emerald-500/10',
      }
    case 'VIDEO':
      return {
        icon: FileAudio,
        iconColor: 'text-orange-700',
        bgColor: 'bg-orange-700/10',
      }
    default:
      return {
        icon: MessageSquare,
        iconColor: 'text-violet-500',
        bgColor: 'bg-violet-500/10',
      }
  }
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

export function generatePrivateRoutesRegex(routes: string[]) {
  const patterns = routes.map((route) => {
    if (route.endsWith('/(.*)')) {
      return route.replace('/(.*)', '(/.*)?')
    }
    return `^${route}$`
  })
  return new RegExp(patterns.join('|'), 'i')
}
