// Entity Verification Badge Component
'use client'

import { CheckCircle2, Clock, AlertCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

interface EntityVerificationBadgeProps {
    verified: boolean
    verificationSource?: string
    size?: 'sm' | 'md'
}

export function EntityVerificationBadge({
    verified,
    verificationSource,
    size = 'md',
}: EntityVerificationBadgeProps) {
    const config = verified
        ? {
            icon: CheckCircle2,
            label: 'Verified',
            color: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400 border-green-200 dark:border-green-800',
        }
        : {
            icon: Clock,
            label: 'Pending',
            color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
        }

    const Icon = config.icon

    const badge = (
        <Badge
            variant="outline"
            className={cn(
                'gap-1 font-medium',
                config.color,
                size === 'sm' && 'text-xs py-0 px-1.5'
            )}
        >
            <Icon className={cn('shrink-0', size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5')} />
            <span>{config.label}</span>
        </Badge>
    )

    if (verificationSource) {
        return (
            <Tooltip>
                <TooltipTrigger asChild>{badge}</TooltipTrigger>
                <TooltipContent>
                    <p>Source: {verificationSource}</p>
                </TooltipContent>
            </Tooltip>
        )
    }

    return badge
}
