import React from 'react'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { FormInputProps } from './form-input'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

interface IFormCheckbox extends FormInputProps {
  checkboxClassName?: string
  labelClassName?: string
}

const FormCheckbox: React.FC<IFormCheckbox> = ({
  control,
  name,
  label,
  disabled,
  labelClassName,
  checkboxClassName,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem className={'flex gap-x-1.5 space-y-0'}>
          <FormControl>
            <Checkbox
              error={!!error}
              className={checkboxClassName}
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
            />
          </FormControl>
          {label && (
            <FormLabel className={cn('text-xs text-muted-foreground font-normal', labelClassName)}>{label}</FormLabel>
          )}
        </FormItem>
      )}
    />
  )
}

export default FormCheckbox
