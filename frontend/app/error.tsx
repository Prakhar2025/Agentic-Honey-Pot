'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="mx-auto max-w-md text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                    <AlertTriangle className="h-8 w-8 text-destructive" />
                </div>
                <h2 className="mb-2 text-2xl font-bold">Something went wrong!</h2>
                <p className="mb-6 text-muted-foreground">
                    {error.message || 'An unexpected error occurred. Please try again.'}
                </p>
                <button
                    onClick={reset}
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Try Again
                </button>
            </div>
        </div>
    )
}
