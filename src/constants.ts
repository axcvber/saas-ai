import { Code, ImageIcon, MessageSquare, Music, VideoIcon } from 'lucide-react'
import { AppRoutes } from './routes'

export const MAX_FREE_COUNTS = 20

export const tools = [
  {
    label: 'Conversation',
    icon: MessageSquare,
    href: AppRoutes.CONVERSATION,
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
  },
  {
    label: 'Music Generation',
    icon: Music,
    href: AppRoutes.MUSIC,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    label: 'Image Generation',
    icon: ImageIcon,
    color: 'text-pink-700',
    bgColor: 'bg-pink-700/10',
    href: AppRoutes.IMAGE,
  },
  {
    label: 'Video Generation',
    icon: VideoIcon,
    color: 'text-orange-700',
    bgColor: 'bg-orange-700/10',
    href: AppRoutes.VIDEO,
  },
  {
    label: 'Code Generation',
    icon: Code,
    color: 'text-green-700',
    bgColor: 'bg-green-700/10',
    href: AppRoutes.CODE,
  },
]
