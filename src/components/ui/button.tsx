import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center select-none gap-2 justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-0 focus-visible:border-ring disabled:pointer-events-none disabled:opacity-50 disabled:select-none',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        'outline-destructive': 'border border-destructive/40 bg-background hover:bg-destructive/10 text-destructive',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary hover:text-primary/80 underline-offset-4 hover:underline !p-0 !h-auto',
        premium: 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-0',
      },
      size: {
        default: 'h-10 px-4 py-2 [&_svg]:w-4 [&_svg]:h-4',
        sm: 'h-9 rounded-md px-3 [&_svg]:w-4 [&_svg]:h-4',
        lg: 'h-11 text-base rounded-md px-6 [&_svg]:w-5 [&_svg]:h-5',
        icon: 'h-8 w-8 [&_svg]:w-4 [&_svg]:h-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp className={cn(buttonVariants({ variant, size, className }))} type='button' ref={ref} {...props} />
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
