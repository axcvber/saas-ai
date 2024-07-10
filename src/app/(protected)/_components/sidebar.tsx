'use client'

import Link from 'next/link'
import { LayoutDashboard, LucideIcon, Settings } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { AppRoutes } from '@/routes'
import { tools } from '@/constants'
import FreeCounter from './free-counter'
import Logo from '@/components/logo'

interface SidebarProps {
  apiLimitCount: number
  isPro: boolean
}

const Sidebar = ({ apiLimitCount = 0, isPro = false }: SidebarProps) => {
  const pathname = usePathname()

  return (
    <div className='space-y-4 w-full py-4 flex flex-col h-full bg-[#111827] text-white'>
      <div className='px-3 py-2 flex-1 space-y-8'>
        <Logo />
        <div className='space-y-2'>
          <SidebarLink
            link={AppRoutes.DASHBOARD}
            color={'text-sky-500'}
            icon={LayoutDashboard}
            label={'Dashboard'}
            isActive={pathname === AppRoutes.DASHBOARD}
          />
          {tools.map((route) => (
            <SidebarLink
              key={route.href}
              link={route.href}
              color={route.color}
              icon={route.icon}
              label={route.label}
              isActive={pathname === route.href}
            />
          ))}
          <SidebarLink
            link={AppRoutes.SETTINGS}
            icon={Settings}
            label={'Settings'}
            isActive={pathname === AppRoutes.SETTINGS}
          />
        </div>
      </div>
      <FreeCounter apiLimitCount={apiLimitCount} isPro={isPro} />
    </div>
  )
}

interface SidebarLinkProps {
  link: string
  isActive: boolean
  icon: LucideIcon
  color?: string
  label: string
}

const SidebarLink = ({ link, isActive, icon: Icon, color, label }: SidebarLinkProps) => {
  return (
    <Link
      href={link}
      className={cn(
        'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition',
        isActive ? 'text-white bg-white/10' : 'text-zinc-400'
      )}
    >
      <div className='flex items-center flex-1'>
        <Icon className={cn('h-5 w-5 mr-3', color)} />
        {label}
      </div>
    </Link>
  )
}

export default Sidebar
