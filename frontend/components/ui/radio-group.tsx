'use client'

import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { Circle } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const RadioGroup = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
    return (
        <RadioGroupPrimitive.Root
            className={cn('grid gap-2', className)}
            {...props}
            ref={ref}
        />
    )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
    return (
        <RadioGroupPrimitive.Item
            ref={ref}
            className={cn(
                'aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                className
            )}
            {...props}
        >
            <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
                <Circle className="h-2.5 w-2.5 fill-current text-current" />
            </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
    )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

// Card-style radio option
interface RadioCardProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
    title: string
    description?: string
    icon?: React.ReactNode
}

const RadioCard = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Item>,
    RadioCardProps
>(({ className, title, description, icon, ...props }, ref) => {
    return (
        <RadioGroupPrimitive.Item
            ref={ref}
            className={cn(
                'relative flex cursor-pointer items-start gap-4 rounded-lg border border-input bg-background p-4 ring-offset-background transition-colors hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary data-[state=checked]:bg-primary/5',
                className
            )}
            {...props}
        >
            {icon && (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                    {icon}
                </div>
            )}
            <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{title}</p>
                {description && (
                    <p className="text-sm text-muted-foreground">{description}</p>
                )}
            </div>
            <div className="flex h-5 items-center">
                <div className="aspect-square h-4 w-4 rounded-full border border-primary">
                    <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
                        <Circle className="h-2.5 w-2.5 fill-primary text-primary" />
                    </RadioGroupPrimitive.Indicator>
                </div>
            </div>
        </RadioGroupPrimitive.Item>
    )
})
RadioCard.displayName = 'RadioCard'

export { RadioGroup, RadioGroupItem, RadioCard }
