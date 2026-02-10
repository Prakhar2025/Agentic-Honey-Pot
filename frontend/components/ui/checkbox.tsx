'use client'

import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check, Minus } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface CheckboxProps
    extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
    indeterminate?: boolean
    label?: string
}

const Checkbox = React.forwardRef<
    React.ElementRef<typeof CheckboxPrimitive.Root>,
    CheckboxProps
>(({ className, indeterminate, label, ...props }, ref) => {
    const checkboxElement = (
        <CheckboxPrimitive.Root
            ref={ref}
            className={cn(
                'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground',
                className
            )}
            checked={indeterminate ? 'indeterminate' : props.checked}
            {...props}
        >
            <CheckboxPrimitive.Indicator
                className={cn('flex items-center justify-center text-current')}
            >
                {indeterminate ? (
                    <Minus className="h-3 w-3" />
                ) : (
                    <Check className="h-3 w-3" />
                )}
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
    )

    if (!label) return checkboxElement

    return (
        <label className="flex items-center gap-2 cursor-pointer">
            {checkboxElement}
            <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {label}
            </span>
        </label>
    )
})
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
