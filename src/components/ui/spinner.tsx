import React, { SVGAttributes } from 'react'
import { Loader2 } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const spinnerVariants = cva('animate-spin', {
  variants: {
    variant: {
      primary: 'text-primary',
      default: 'text-zinc-500',
    },
    size: {
      default: 'w-10 h-10',
      xs: 'w-6 h-6',
      sm: 'w-8 h-8',
      lg: 'w-12 h-12',
    },
  },
  defaultVariants: {
    size: 'default',
    variant: 'primary',
  },
})

export interface SpinnerProps extends SVGAttributes<SVGSVGElement>, VariantProps<typeof spinnerVariants> {}

const Spinner: React.FC<SpinnerProps> = ({ className, variant, size, ...props }) => {
  return <Loader2 className={cn(spinnerVariants({ size, variant, className }))} {...props} />
}

export { Spinner }
