import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Control } from 'react-hook-form'

export interface FormInputProps {
  control: Control<any>
  name: string
  label?: string
  placeholder?: string
  disabled?: boolean
  className?: string
  inputClassName?: string
  rightNode?: React.ReactNode
  type?: React.HTMLInputTypeAttribute
}

const FormInput: React.FC<FormInputProps> = ({
  control,
  name,
  label,
  placeholder,
  disabled,
  className,
  inputClassName,
  rightNode,
  type = 'text',
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className='relative overflow-hidden'>
              <Input
                error={!!error}
                placeholder={placeholder}
                disabled={disabled}
                type={type}
                className={inputClassName}
                {...field}
              />
              {rightNode && rightNode}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormInput
