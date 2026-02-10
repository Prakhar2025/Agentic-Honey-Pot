'use client'

import * as React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Loader2 } from 'lucide-react'

interface ConfirmDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    title: string
    description?: string
    confirmLabel?: string
    cancelLabel?: string
    variant?: 'default' | 'destructive'
    onConfirm: () => void | Promise<void>
    onCancel?: () => void
}

function ConfirmDialog({
    open,
    onOpenChange,
    title,
    description,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    variant = 'default',
    onConfirm,
    onCancel,
}: ConfirmDialogProps) {
    const [loading, setLoading] = React.useState(false)

    const handleConfirm = async () => {
        try {
            setLoading(true)
            await onConfirm()
            onOpenChange(false)
        } finally {
            setLoading(false)
        }
    }

    const handleCancel = () => {
        onCancel?.()
        onOpenChange(false)
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    {description && (
                        <AlertDialogDescription>{description}</AlertDialogDescription>
                    )}
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleCancel} disabled={loading}>
                        {cancelLabel}
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleConfirm}
                        variant={variant}
                        disabled={loading}
                    >
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {confirmLabel}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

// Promise-based confirmation hook
interface ConfirmOptions {
    title: string
    description?: string
    confirmLabel?: string
    cancelLabel?: string
    variant?: 'default' | 'destructive'
}

function useConfirmDialog() {
    const [state, setState] = React.useState<{
        open: boolean
        options: ConfirmOptions | null
        resolve: ((value: boolean) => void) | null
    }>({
        open: false,
        options: null,
        resolve: null,
    })

    const confirm = React.useCallback((options: ConfirmOptions): Promise<boolean> => {
        return new Promise((resolve) => {
            setState({
                open: true,
                options,
                resolve,
            })
        })
    }, [])

    const handleOpenChange = (open: boolean) => {
        if (!open && state.resolve) {
            state.resolve(false)
        }
        setState((prev) => ({ ...prev, open }))
    }

    const handleConfirm = () => {
        state.resolve?.(true)
        setState({ open: false, options: null, resolve: null })
    }

    const handleCancel = () => {
        state.resolve?.(false)
        setState({ open: false, options: null, resolve: null })
    }

    const ConfirmDialogComponent = state.options ? (
        <ConfirmDialog
            open={state.open}
            onOpenChange={handleOpenChange}
            title={state.options.title}
            description={state.options.description}
            confirmLabel={state.options.confirmLabel}
            cancelLabel={state.options.cancelLabel}
            variant={state.options.variant}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
        />
    ) : null

    return { confirm, ConfirmDialogComponent }
}

export { ConfirmDialog, useConfirmDialog }
