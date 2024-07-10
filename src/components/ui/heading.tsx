import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface HeadingProps {
  title: string
  description?: string
  icon?: ReactNode
  iconColor?: string
  bgColor?: string
  children?: ReactNode
}

export const Heading = ({ title, description, icon, iconColor, bgColor, children }: HeadingProps) => {
  return (
    <div className={'flex items-center flex-wrap justify-between gap-3 mb-6'}>
      <div className='flex items-center gap-x-3'>
        <div className={cn('p-2 w-fit rounded-md [&_svg]:w-8 [&_svg]:h-8', bgColor, iconColor)}>{icon}</div>
        <div>
          <h1 className='h3'>{title}</h1>
          {description && <p className='text-sm text-muted-foreground'>{description}</p>}
        </div>
      </div>
      {children && children}
    </div>
  )
}
