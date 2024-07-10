import { ReceiptText, Settings, SquareUser } from 'lucide-react'
import { Heading } from '@/components/ui/heading'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AppRoutes } from '@/routes'
import Link from 'next/link'

const testimonials = [
  {
    title: 'Profile',
    description: 'Manage your profile data.',
    icon: SquareUser,
    link: AppRoutes.PROFILE,
  },
  {
    title: 'Billing',
    description: 'Manage your invoices.',
    icon: ReceiptText,
    link: AppRoutes.BILLING,
  },
]

const SettingsPage = async () => {
  return (
    <>
      <Heading
        title='Settings'
        description='Manage account settings.'
        icon={<Settings />}
        iconColor='text-gray-700'
        bgColor='bg-gray-700/10'
      />
      <div className='space-y-4'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {testimonials.map((item) => (
            <Link key={item.link} href={item.link} className='block'>
              <Card className='bg-muted hover:bg-muted/70 transition-colors'>
                <CardHeader>
                  <CardTitle className='flex items-center gap-x-2'>
                    <item.icon />
                    <p className='text-lg'>{item.title}</p>
                  </CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default SettingsPage
