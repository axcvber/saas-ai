'use client'

import React, { useState } from 'react'
import FormInput, { FormInputProps } from './form-input'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff } from 'lucide-react'

const FormInputPass: React.FC<FormInputProps> = ({ control, name, label, placeholder, disabled }) => {
  const [show, setShow] = useState(false)

  const handleShowPass = () => setShow(!show)

  return (
    <FormInput
      control={control}
      name={name}
      label={label}
      placeholder={placeholder}
      disabled={disabled}
      type={show ? 'text' : 'password'}
      inputClassName='pr-10'
      rightNode={
        <Button
          variant={'ghost'}
          size={'icon'}
          className='absolute top-1/2 right-1 -translate-y-1/2 p-2 w-8 h-8'
          onClick={handleShowPass}
        >
          {show ? <Eye /> : <EyeOff />}
        </Button>
      }
    />
  )
}

export default FormInputPass
