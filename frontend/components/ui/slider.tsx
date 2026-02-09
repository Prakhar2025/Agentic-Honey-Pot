'use client'

import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { cn } from '@/lib/utils/cn'

interface SliderProps
    extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
    showValue?: boolean
    formatValue?: (value: number) => string
    marks?: { value: number; label?: string }[]
}

const Slider = React.forwardRef<
    React.ElementRef<typeof SliderPrimitive.Root>,
    SliderProps
>(({ className, showValue, formatValue, marks, value, defaultValue, ...props }, ref) => {
    const currentValue = value || defaultValue || [0]

    return (
        <div className="relative">
            <SliderPrimitive.Root
                ref={ref}
                className={cn(
                    'relative flex w-full touch-none select-none items-center',
                    marks && 'mb-6',
                    className
                )}
                value={value}
                defaultValue={defaultValue}
                {...props}
            >
                <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
                    <SliderPrimitive.Range className="absolute h-full bg-primary" />
                </SliderPrimitive.Track>
                {Array.isArray(currentValue) && currentValue.map((val, index) => (
                    <SliderPrimitive.Thumb
                        key={index}
                        className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    >
                        {showValue && (
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-primary px-2 py-1 text-xs text-primary-foreground">
                                {formatValue ? formatValue(val) : val}
                            </div>
                        )}
                    </SliderPrimitive.Thumb>
                ))}
            </SliderPrimitive.Root>
            {marks && (
                <div className="relative w-full">
                    {marks.map((mark, index) => {
                        const min = props.min ?? 0
                        const max = props.max ?? 100
                        const percent = ((mark.value - min) / (max - min)) * 100
                        return (
                            <div
                                key={index}
                                className="absolute -translate-x-1/2"
                                style={{ left: `${percent}%` }}
                            >
                                <div className="h-2 w-0.5 bg-muted-foreground/50" />
                                {mark.label && (
                                    <span className="mt-1 block text-xs text-muted-foreground">
                                        {mark.label}
                                    </span>
                                )}
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
