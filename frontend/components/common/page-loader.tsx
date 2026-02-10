'use client'

import * as React from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface PageLoaderProps {
    message?: string
    showProgress?: boolean
    progress?: number
    className?: string
}

function PageLoader({
    message = 'Loading...',
    showProgress = false,
    progress = 0,
    className,
}: PageLoaderProps) {
    return (
        <div
            className={cn(
                'fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm',
                className
            )}
        >
            {/* Logo/Brand Animation */}
            <div className="relative mb-8">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <div className="h-10 w-10 rounded-xl bg-primary animate-pulse" />
                </div>
                <div className="absolute -inset-2 rounded-2xl bg-primary/20 animate-ping" style={{ animationDuration: '2s' }} />
            </div>

            {/* Spinner */}
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />

            {/* Message */}
            <p className="text-sm font-medium text-muted-foreground animate-pulse">
                {message}
            </p>

            {/* Progress Bar */}
            {showProgress && (
                <div className="mt-6 w-64">
                    <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary transition-all duration-300 ease-out"
                            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                        />
                    </div>
                    <p className="mt-2 text-xs text-center text-muted-foreground">
                        {Math.round(progress)}%
                    </p>
                </div>
            )}
        </div>
    )
}

export { PageLoader }
