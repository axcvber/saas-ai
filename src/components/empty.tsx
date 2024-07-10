import Image from 'next/image'

interface EmptyProps {
  label: string
}

export const Empty = ({ label }: EmptyProps) => {
  return (
    <div className='h-full p-20 flex flex-col items-center justify-center'>
      <div className='relative h-40 w-40'>
        <Image src='/empty.png' fill alt='Empty' className='object-contain' />
      </div>
      <p className='text-muted-foreground text-sm text-center mt-2'>{label}</p>
    </div>
  )
}
