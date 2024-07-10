import { Spinner } from './ui/spinner'

export const Loader = () => {
  return (
    <div className='absolute top-0 left-0 w-full h-full backdrop-blur-[3px] z-50 bg-muted/10 flex flex-col gap-y-4 items-center justify-center p-8'>
      <Spinner size={'sm'} />
    </div>
  )
}
