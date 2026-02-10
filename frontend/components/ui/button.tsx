'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const buttonVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
    {
        variants: {
            variant: {
                default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm',
                destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm',
                outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
                secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link: 'text-primary underline-offset-4 hover:underline',
                success: 'bg-green-600 text-white hover:bg-green-700 shadow-sm',
                warning: 'bg-yellow-500 text-white hover:bg-yellow-600 shadow-sm',
            },
            size: {
                xs: 'h-7 px-2 text-xs rounded',
                sm: 'h-8 px-3 text-xs rounded-md',
                default: 'h-10 px-4 py-2',
                lg: 'h-11 px-6 text-base rounded-lg',
                xl: 'h-12 px-8 text-lg rounded-lg',
                icon: 'h-10 w-10',
                'icon-sm': 'h-8 w-8',
                'icon-lg': 'h-12 w-12',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
    loading?: boolean
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
    fullWidth?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, loading, leftIcon, rightIcon, fullWidth, children, disabled, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button'

        // NUCLEAR FIX: Auto-wrap multiple children to prevent React.Children.only errors
        let processedChildren = (
            <>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
                {children}
                {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
            </>
        )

        // If asChild and we have multiple React children, wrap in a single span
        if (asChild && (loading || leftIcon || rightIcon || React.Children.count(children) > 1)) {
            processedChildren = <span className="contents">{processedChildren}</span>
        }

        return (
            <Comp
                className={cn(
                    buttonVariants({ variant, size, className }),
                    fullWidth && 'w-full',
                    loading && 'cursor-wait'
                )}
                ref={ref}
                disabled={disabled || loading}
                {...props}
            >
                {processedChildren}
            </Comp>
        )
    }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
