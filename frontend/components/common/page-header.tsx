// Page Header Component
'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface PageHeaderProps {
    icon?: ReactNode
    title: string
    description?: string
    badge?: {
        label: string
        variant?: 'default' | 'secondary' | 'destructive' | 'outline'
    }
    actions?: ReactNode
    className?: string
}

export function PageHeader({
    icon,
    title,
    description,
    badge,
    actions,
    className,
}: PageHeaderProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                'flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between',
                className
            )}
        >
            <div className="flex items-center gap-4">
                {icon && (
                    <div className="rounded-xl bg-primary/10 p-3 text-primary shrink-0">
                        {icon}
                    </div>
                )}
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            {title}
                        </h1>
                        {badge && (
                            <Badge variant={badge.variant || 'default'} className="text-xs">
                                {badge.label}
                            </Badge>
                        )}
                    </div>
                    {description && (
                        <p className="mt-1 text-muted-foreground max-w-2xl">
                            {description}
                        </p>
                    )}
                </div>
            </div>
            {actions && (
                <div className="flex items-center gap-2 shrink-0">{actions}</div>
            )}
        </motion.div>
    )
}
