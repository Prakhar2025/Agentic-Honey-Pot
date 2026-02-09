'use client'

import * as React from 'react'
import { Eye, EyeOff, X } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean
    success?: boolean
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
    leftAddon?: React.ReactNode
    rightAddon?: React.ReactNode
    clearable?: boolean
    onClear?: () => void
    showPasswordToggle?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({
        className,
        type,
        error,
        success,
        leftIcon,
        rightIcon,
        leftAddon,
        rightAddon,
        clearable,
        onClear,
        showPasswordToggle,
        value,
        ...props
    }, ref) => {
        const [showPassword, setShowPassword] = React.useState(false)
        const inputType = showPasswordToggle && type === 'password'
            ? (showPassword ? 'text' : 'password')
            : type

        const hasLeftContent = leftIcon || leftAddon
        const hasRightContent = rightIcon || rightAddon || clearable || (showPasswordToggle && type === 'password')
        const showClearButton = clearable && value && String(value).length > 0

        return (
            <div className="relative flex items-center">
                {leftAddon && (
                    <div className="flex items-center rounded-l-md border border-r-0 border-input bg-muted px-3 py-2 text-sm text-muted-foreground">
                        {leftAddon}
                    </div>
                )}
                {leftIcon && (
                    <div className="pointer-events-none absolute left-3 flex items-center text-muted-foreground">
                        {leftIcon}
                    </div>
                )}
                <input
                    type={inputType}
                    className={cn(
                        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
                        hasLeftContent && 'pl-10',
                        hasRightContent && 'pr-10',
                        leftAddon && 'rounded-l-none',
                        rightAddon && 'rounded-r-none',
                        error && 'border-destructive focus-visible:ring-destructive',
                        success && 'border-green-500 focus-visible:ring-green-500',
                        className
                    )}
                    ref={ref}
                    value={value}
                    {...props}
                />
                <div className="absolute right-3 flex items-center gap-1">
                    {showClearButton && (
                        <button
                            type="button"
                            onClick={onClear}
                            className="flex h-5 w-5 items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                            aria-label="Clear input"
                        >
                            <X className="h-3.5 w-3.5" />
                        </button>
                    )}
                    {showPasswordToggle && type === 'password' && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="flex h-5 w-5 items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}
                        </button>
                    )}
                    {rightIcon && !showClearButton && !(showPasswordToggle && type === 'password') && (
                        <div className="pointer-events-none text-muted-foreground">
                            {rightIcon}
                        </div>
                    )}
                </div>
                {rightAddon && (
                    <div className="flex items-center rounded-r-md border border-l-0 border-input bg-muted px-3 py-2 text-sm text-muted-foreground">
                        {rightAddon}
                    </div>
                )}
            </div>
        )
    }
)
Input.displayName = 'Input'

export { Input }
