'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface ModalProps {
  title?: string
  desc?: string
  isOpen: boolean
  onClose: () => void
  children?: React.ReactNode
  className?: string
  openAutoFocus?: boolean
}

export const Modal: React.FC<ModalProps> = ({
  title,
  desc,
  isOpen,
  onClose,
  children,
  openAutoFocus = false,
  className,
}) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent className={className} onOpenAutoFocus={(e) => (!openAutoFocus ? e.preventDefault() : {})}>
        {title && (
          <DialogHeader className='text-center'>
            <DialogTitle className='text-2xl'>{title}</DialogTitle>
            {desc && <DialogDescription>{desc}</DialogDescription>}
          </DialogHeader>
        )}
        {children}
      </DialogContent>
    </Dialog>
  )
}
