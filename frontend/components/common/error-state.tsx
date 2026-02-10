'use client'

import * as React from 'react'
import { AlertCircle, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/button'

interface ErrorStateProps {
    title?: string
    message?: string
    error?: Error | string
    onRetry?: () => void
    isLoading?: boolean
    showReportLink?: boolean
    onReport?: () => void
    className?: string
    compact?: boolean
}

function ErrorState({
    title = 'Something went wrong',
    message,
    error,
    onRetry,
    retryLabel = 'Try again',
    isLoading = false,
    showReportLink = false,
    onReport,
    className,
    compact = false,
}: ErrorStateProps & { retryLabel?: string }) {
    const errorMessage = message || (typeof error === 'string' ? error : error?.message)

    return (
        <div
            className={cn(
                'flex flex-col items-center justify-center text-center',
                compact ? 'py-8 px-4' : 'py-16 px-8',
                className
            )}
        >
            <div className={cn(
                'rounded-full bg-destructive/10 text-destructive',
                compact ? 'p-3' : 'p-4'
            )}>
                <AlertCircle className={cn(compact ? 'h-8 w-8' : 'h-12 w-12')} />
            </div>
            <h3 className={cn('mt-4 font-semibold', compact ? 'text-base' : 'text-lg')}>
                {title}
            </h3>
            {errorMessage && (
                <p className={cn(
                    'mt-2 text-muted-foreground max-w-md',
                    compact ? 'text-sm' : 'text-base'
                )}>
                    {errorMessage}
                </p>
            )}
            <div className={cn('flex items-center gap-3', compact ? 'mt-4' : 'mt-6')}>
                {onRetry && (
                    <Button
                        variant="default"
                        size={compact ? 'sm' : 'default'}
                        onClick={onRetry}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <RefreshCw className="mr-2 h-4 w-4" />
                        )}
                        {retryLabel}
                    </Button>
                )}
                {showReportLink && (
                    <Button
                        variant="ghost"
                        size={compact ? 'sm' : 'default'}
                        onClick={onReport}
                    >
                        Report issue
                    </Button>
                )}
            </div>
        </div>
    )
}

export { ErrorState }
