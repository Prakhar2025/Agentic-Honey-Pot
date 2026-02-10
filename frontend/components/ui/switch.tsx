'use client'

import * as React from 'react'
import * as SwitchPrimitives from '@radix-ui/react-switch'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils/cn'

const switchVariants = cva(
    'peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
    {
        variants: {
            size: {
                sm: 'h-4 w-7',
                default: 'h-6 w-11',
                lg: 'h-8 w-14',
            },
        },
        defaultVariants: {
            size: 'default',
        },
    }
)

const thumbVariants = cva(
    'pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform',
    {
        variants: {
            size: {
                sm: 'h-3 w-3 data-[state=checked]:translate-x-3 data-[state=unchecked]:translate-x-0',
                default: 'h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0',
                lg: 'h-7 w-7 data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0',
            },
        },
        defaultVariants: {
            size: 'default',
        },
    }
)

interface SwitchProps
    extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
    VariantProps<typeof switchVariants> {
    label?: string
    labelPosition?: 'left' | 'right'
}

const Switch = React.forwardRef<
    React.ElementRef<typeof SwitchPrimitives.Root>,
    SwitchProps
>(({ className, size, label, labelPosition = 'right', ...props }, ref) => {
    const switchElement = (
        <SwitchPrimitives.Root
            className={cn(switchVariants({ size }), className)}
            {...props}
            ref={ref}
        >
            <SwitchPrimitives.Thumb className={cn(thumbVariants({ size }))} />
        </SwitchPrimitives.Root>
    )

    if (!label) return switchElement

    return (
        <label className="inline-flex items-center gap-2 cursor-pointer">
            {labelPosition === 'left' && (
                <span className="text-sm font-medium">{label}</span>
            )}
            {switchElement}
            {labelPosition === 'right' && (
                <span className="text-sm font-medium">{label}</span>
            )}
        </label>
    )
})
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
