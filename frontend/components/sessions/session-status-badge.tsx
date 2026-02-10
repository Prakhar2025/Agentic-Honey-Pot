'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils/cn'

interface SessionStatusBadgeProps {
    status: string
    className?: string
    showIcon?: boolean
}

const statusConfig: Record<string, { label: string; variant: string; color: string; bgColor: string }> = {
    ONGOING: { label: 'Active', variant: 'success', color: 'text-green-700 dark:text-green-400', bgColor: 'bg-green-100 dark:bg-green-900/30' },
    ACTIVE: { label: 'Active', variant: 'success', color: 'text-green-700 dark:text-green-400', bgColor: 'bg-green-100 dark:bg-green-900/30' },
    active: { label: 'Active', variant: 'success', color: 'text-green-700 dark:text-green-400', bgColor: 'bg-green-100 dark:bg-green-900/30' },
    COMPLETED: { label: 'Completed', variant: 'secondary', color: 'text-blue-700 dark:text-blue-400', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
    completed: { label: 'Completed', variant: 'secondary', color: 'text-blue-700 dark:text-blue-400', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
    TERMINATED: { label: 'Terminated', variant: 'warning', color: 'text-orange-700 dark:text-orange-400', bgColor: 'bg-orange-100 dark:bg-orange-900/30' },
    terminated: { label: 'Terminated', variant: 'warning', color: 'text-orange-700 dark:text-orange-400', bgColor: 'bg-orange-100 dark:bg-orange-900/30' },
    FAILED: { label: 'Failed', variant: 'destructive', color: 'text-red-700 dark:text-red-400', bgColor: 'bg-red-100 dark:bg-red-900/30' },
    failed: { label: 'Failed', variant: 'destructive', color: 'text-red-700 dark:text-red-400', bgColor: 'bg-red-100 dark:bg-red-900/30' },
    MAX_TURNS_REACHED: { label: 'Max Turns', variant: 'secondary', color: 'text-purple-700 dark:text-purple-400', bgColor: 'bg-purple-100 dark:bg-purple-900/30' },
    SAFETY_EXIT: { label: 'Safety Exit', variant: 'warning', color: 'text-yellow-700 dark:text-yellow-400', bgColor: 'bg-yellow-100 dark:bg-yellow-900/30' },
    INITIAL: { label: 'Initial', variant: 'outline', color: 'text-gray-700 dark:text-gray-400', bgColor: 'bg-gray-100 dark:bg-gray-900/30' },
}

export function SessionStatusBadge({ status, className, showIcon = true }: SessionStatusBadgeProps) {
    const config = statusConfig[status] || {
        label: status,
        variant: 'outline',
        color: 'text-gray-700',
        bgColor: 'bg-gray-100'
    }

    const isActive = status === 'ONGOING' || status === 'ACTIVE' || status === 'active'

    return (
        <Badge
            variant="outline"
            className={cn(
                'gap-1.5 font-medium border-0',
                config.color,
                config.bgColor,
                className
            )}
        >
            {showIcon && isActive && (
                <motion.span
                    className="relative flex h-2 w-2"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                >
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </motion.span>
            )}
            {showIcon && !isActive && (
                <span className={cn(
                    'h-2 w-2 rounded-full',
                    status === 'COMPLETED' || status === 'completed' ? 'bg-blue-500' :
                        status === 'TERMINATED' || status === 'terminated' ? 'bg-orange-500' :
                            status === 'FAILED' || status === 'failed' ? 'bg-red-500' :
                                'bg-gray-500'
                )} />
            )}
            {config.label}
        </Badge>
    )
}
