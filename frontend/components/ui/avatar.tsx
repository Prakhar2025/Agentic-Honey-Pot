'use client'

import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils/cn'

const avatarVariants = cva(
    'relative flex shrink-0 overflow-hidden rounded-full',
    {
        variants: {
            size: {
                xs: 'h-6 w-6 text-[10px]',
                sm: 'h-8 w-8 text-xs',
                default: 'h-10 w-10 text-sm',
                lg: 'h-12 w-12 text-base',
                xl: 'h-16 w-16 text-lg',
                '2xl': 'h-20 w-20 text-xl',
            },
        },
        defaultVariants: {
            size: 'default',
        },
    }
)

interface AvatarProps
    extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
    status?: 'online' | 'offline' | 'busy' | 'away'
    bordered?: boolean
}

const Avatar = React.forwardRef<
    React.ElementRef<typeof AvatarPrimitive.Root>,
    AvatarProps
>(({ className, size, status, bordered, ...props }, ref) => (
    <div className="relative inline-block">
        <AvatarPrimitive.Root
            ref={ref}
            className={cn(
                avatarVariants({ size }),
                bordered && 'ring-2 ring-background',
                className
            )}
            {...props}
        />
        {status && (
            <span
                className={cn(
                    'absolute bottom-0 right-0 block rounded-full ring-2 ring-background',
                    size === 'xs' && 'h-1.5 w-1.5',
                    size === 'sm' && 'h-2 w-2',
                    (size === 'default' || !size) && 'h-2.5 w-2.5',
                    size === 'lg' && 'h-3 w-3',
                    size === 'xl' && 'h-3.5 w-3.5',
                    size === '2xl' && 'h-4 w-4',
                    status === 'online' && 'bg-green-500',
                    status === 'offline' && 'bg-gray-400',
                    status === 'busy' && 'bg-red-500',
                    status === 'away' && 'bg-yellow-500'
                )}
            />
        )}
    </div>
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
    React.ElementRef<typeof AvatarPrimitive.Image>,
    React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
    <AvatarPrimitive.Image
        ref={ref}
        className={cn('aspect-square h-full w-full object-cover', className)}
        {...props}
    />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

interface AvatarFallbackProps
    extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> {
    name?: string
}

const AvatarFallback = React.forwardRef<
    React.ElementRef<typeof AvatarPrimitive.Fallback>,
    AvatarFallbackProps
>(({ className, children, name, ...props }, ref) => {
    const getInitials = (name: string) => {
        const parts = name.split(' ').filter(Boolean)
        if (parts.length === 0) return '?'
        if (parts.length === 1) return parts[0][0].toUpperCase()
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }

    return (
        <AvatarPrimitive.Fallback
            ref={ref}
            className={cn(
                'flex h-full w-full items-center justify-center rounded-full bg-muted font-medium',
                className
            )}
            {...props}
        >
            {children || (name ? getInitials(name) : '?')}
        </AvatarPrimitive.Fallback>
    )
})
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

// Avatar Group component
interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    max?: number
    size?: 'xs' | 'sm' | 'default' | 'lg' | 'xl'
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
    ({ className, max, size = 'default', children, ...props }, ref) => {
        const childArray = React.Children.toArray(children)
        const displayCount = max ? Math.min(childArray.length, max) : childArray.length
        const extraCount = max ? childArray.length - max : 0

        const spacing = {
            xs: '-space-x-2',
            sm: '-space-x-2.5',
            default: '-space-x-3',
            lg: '-space-x-4',
            xl: '-space-x-5',
        }

        return (
            <div
                ref={ref}
                className={cn('flex items-center', spacing[size], className)}
                {...props}
            >
                {childArray.slice(0, displayCount).map((child, i) => (
                    <div key={i} className="relative ring-2 ring-background rounded-full">
                        {child}
                    </div>
                ))}
                {extraCount > 0 && (
                    <div
                        className={cn(
                            avatarVariants({ size }),
                            'flex items-center justify-center bg-muted font-medium ring-2 ring-background'
                        )}
                    >
                        +{extraCount}
                    </div>
                )}
            </div>
        )
    }
)
AvatarGroup.displayName = 'AvatarGroup'

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup }
