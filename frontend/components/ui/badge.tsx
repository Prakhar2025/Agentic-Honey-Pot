'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const badgeVariants = cva(
    'inline-flex items-center rounded-full border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    {
        variants: {
            variant: {
                default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
                secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
                destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
                outline: 'text-foreground',
                success: 'border-transparent bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
                warning: 'border-transparent bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
                info: 'border-transparent bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
                // Scam type specific badges
                kyc_fraud: 'border-transparent bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
                lottery_scam: 'border-transparent bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100',
                tech_support: 'border-transparent bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
                investment_fraud: 'border-transparent bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100',
                job_scam: 'border-transparent bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
                loan_scam: 'border-transparent bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
                otp_fraud: 'border-transparent bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-100',
                // Status badges
                active: 'border-transparent bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
                completed: 'border-transparent bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100',
                failed: 'border-transparent bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
                pending: 'border-transparent bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
                processing: 'border-transparent bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
            },
            size: {
                sm: 'px-2 py-0.5 text-xs',
                default: 'px-2.5 py-0.5 text-xs',
                lg: 'px-3 py-1 text-sm',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
)

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
    dot?: boolean
    pulse?: boolean
    removable?: boolean
    onRemove?: () => void
    icon?: React.ReactNode
}

function Badge({
    className,
    variant,
    size,
    dot,
    pulse,
    removable,
    onRemove,
    icon,
    children,
    ...props
}: BadgeProps) {
    return (
        <div
            className={cn(
                badgeVariants({ variant, size }),
                pulse && 'animate-pulse',
                className
            )}
            {...props}
        >
            {dot && (
                <span
                    className={cn(
                        'mr-1.5 h-1.5 w-1.5 rounded-full',
                        variant === 'active' && 'bg-green-500 animate-pulse',
                        variant === 'processing' && 'bg-blue-500 animate-pulse',
                        variant === 'pending' && 'bg-yellow-500',
                        variant === 'failed' && 'bg-red-500',
                        variant === 'completed' && 'bg-gray-500',
                        !['active', 'processing', 'pending', 'failed', 'completed'].includes(variant || '') && 'bg-current'
                    )}
                />
            )}
            {icon && <span className="mr-1">{icon}</span>}
            {children}
            {removable && (
                <button
                    type="button"
                    className="ml-1 -mr-0.5 h-3.5 w-3.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 inline-flex items-center justify-center"
                    onClick={(e) => {
                        e.stopPropagation()
                        onRemove?.()
                    }}
                    aria-label="Remove badge"
                >
                    <X className="h-2.5 w-2.5" />
                </button>
            )}
        </div>
    )
}

export { Badge, badgeVariants }
