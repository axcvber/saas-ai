import { ChevronRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { tools } from '@/constants'
import Link from 'next/link'

const DashboardPage = () => {
  return (
    <section>
      <div className='mb-8 space-y-3 text-center'>
        <h2>Explore the power of AI</h2>
        <p className='text-muted-foreground px-6 text-sm lg:text-md'>
          Chat with the smartest AI - Experience the power of AI
        </p>
      </div>
      <div className='space-y-3 container'>
        {tools.map((tool) => (
          <Link key={tool.href} href={tool.href} className='block'>
            <Card className='p-4 flex items-center justify-between hover:bg-muted transition-colors cursor-pointer'>
              <div className='flex items-center gap-x-4'>
                <div className={cn('p-2 w-fit rounded-md', tool.bgColor)}>
                  <tool.icon className={cn('w-6 h-6', tool.color)} />
                </div>
                <p className='font-semibold'>{tool.label}</p>
              </div>
              <ChevronRight className='w-5 h-5' />
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default DashboardPage
