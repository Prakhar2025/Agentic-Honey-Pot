'use client'

import * as React from 'react'
import { FileQuestion, Inbox, Search, FolderOpen } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/button'

type EmptyStatePreset = 'default' | 'search' | 'folder' | 'inbox'

const presetIcons: Record<EmptyStatePreset, React.ReactNode> = {
    default: <FileQuestion className="h-12 w-12 text-muted-foreground/50" />,
    search: <Search className="h-12 w-12 text-muted-foreground/50" />,
    folder: <FolderOpen className="h-12 w-12 text-muted-foreground/50" />,
    inbox: <Inbox className="h-12 w-12 text-muted-foreground/50" />,
}

interface EmptyStateProps {
    icon?: React.ReactNode
    preset?: EmptyStatePreset
    title: string
    description?: string
    action?: {
        label: string
        onClick: () => void
        variant?: 'default' | 'outline' | 'secondary'
    }
    secondaryAction?: {
        label: string
        onClick: () => void
    }
    className?: string
    compact?: boolean
}

function EmptyState({
    icon,
    preset = 'default',
    title,
    description,
    action,
    secondaryAction,
    className,
    compact = false,
}: EmptyStateProps) {
    const displayIcon = icon || presetIcons[preset]

    return (
        <div
            className={cn(
                'flex flex-col items-center justify-center text-center',
                compact ? 'py-8 px-4' : 'py-16 px-8',
                className
            )}
        >
            <div className={cn('rounded-full bg-muted p-4', compact && 'p-3')}>
                {displayIcon}
            </div>
            <h3 className={cn('mt-4 font-semibold', compact ? 'text-base' : 'text-lg')}>
                {title}
            </h3>
            {description && (
                <p className={cn(
                    'mt-2 text-muted-foreground max-w-sm',
                    compact ? 'text-sm' : 'text-base'
                )}>
                    {description}
                </p>
            )}
            {(action || secondaryAction) && (
                <div className={cn('flex items-center gap-3', compact ? 'mt-4' : 'mt-6')}>
                    {action && (
                        <Button
                            variant={action.variant || 'default'}
                            size={compact ? 'sm' : 'default'}
                            onClick={action.onClick}
                        >
                            {action.label}
                        </Button>
                    )}
                    {secondaryAction && (
                        <Button
                            variant="ghost"
                            size={compact ? 'sm' : 'default'}
                            onClick={secondaryAction.onClick}
                        >
                            {secondaryAction.label}
                        </Button>
                    )}
                </div>
            )}
        </div>
    )
}

export { EmptyState }
