import Navbar from './_components/navbar'
import Sidebar from './_components/sidebar'
import { getApiLimitCount } from '@/lib/api-limit'
import { checkSubscription } from '@/lib/subscription'

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const apiLimitCount = await getApiLimitCount()
  const isPro = await checkSubscription()

  return (
    <div className='w-full h-full flex relative '>
      <aside className='hidden h-full lg:block md:w-72 shrink-0 bg-gray-900 overflow-x-hidden'>
        <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} />
      </aside>
      <main className='relative flex-1 max-w-full h-full flex flex-col overflow-auto'>
        <Navbar isPro={isPro} apiLimitCount={apiLimitCount} />
        <div className='flex h-full pt-8 pb-4 flex-col overflow-auto container'>{children}</div>
      </main>
    </div>
  )
}

export default DashboardLayout
