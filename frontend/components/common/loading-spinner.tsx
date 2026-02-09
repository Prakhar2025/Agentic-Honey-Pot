'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const spinnerVariants = cva(
    'animate-spin',
    {
        variants: {
            size: {
                xs: 'h-3 w-3',
                sm: 'h-4 w-4',
                default: 'h-6 w-6',
                lg: 'h-8 w-8',
                xl: 'h-12 w-12',
            },
            color: {
                primary: 'text-primary',
                secondary: 'text-secondary',
                muted: 'text-muted-foreground',
                white: 'text-white',
                current: 'text-current',
            },
        },
        defaultVariants: {
            size: 'default',
            color: 'primary',
        },
    }
)

interface LoadingSpinnerProps extends VariantProps<typeof spinnerVariants> {
    className?: string
    label?: string
}

function LoadingSpinner({ size, color, className, label }: LoadingSpinnerProps) {
    return (
        <div className={cn('flex items-center gap-2', className)}>
            <Loader2 className={cn(spinnerVariants({ size, color }))} />
            {label && (
                <span className="text-sm text-muted-foreground">{label}</span>
            )}
        </div>
    )
}

interface FullScreenLoaderProps extends LoadingSpinnerProps {
    overlay?: boolean
    blur?: boolean
}

function FullScreenLoader({
    size = 'lg',
    color = 'primary',
    label = 'Loading...',
    overlay = true,
    blur = true,
    className,
}: FullScreenLoaderProps) {
    return (
        <div
            className={cn(
                'fixed inset-0 z-50 flex items-center justify-center',
                overlay && 'bg-background/80',
                blur && 'backdrop-blur-sm',
                className
            )}
        >
            <div className="flex flex-col items-center gap-4">
                <LoadingSpinner size={size} color={color} />
                {label && (
                    <span className="text-sm font-medium text-muted-foreground animate-pulse">
                        {label}
                    </span>
                )}
            </div>
        </div>
    )
}

export { LoadingSpinner, FullScreenLoader }
