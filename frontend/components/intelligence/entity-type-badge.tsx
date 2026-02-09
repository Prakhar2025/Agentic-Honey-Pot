// Entity Type Badge Component
'use client'

import {
    Phone,
    CreditCard,
    Building2,
    Link as LinkIcon,
    Mail,
    Hash,
    Wallet,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const typeConfig: Record<string, {
    icon: React.ComponentType<{ className?: string }>
    label: string
    color: string
}> = {
    PHONE_NUMBER: {
        icon: Phone,
        label: 'Phone',
        color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    },
    UPI_ID: {
        icon: CreditCard,
        label: 'UPI',
        color: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300 border-green-200 dark:border-green-800',
    },
    BANK_ACCOUNT: {
        icon: Building2,
        label: 'Bank',
        color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 border-purple-200 dark:border-purple-800',
    },
    URL: {
        icon: LinkIcon,
        label: 'Link',
        color: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300 border-red-200 dark:border-red-800',
    },
    EMAIL: {
        icon: Mail,
        label: 'Email',
        color: 'bg-pink-100 text-pink-700 dark:bg-pink-900/50 dark:text-pink-300 border-pink-200 dark:border-pink-800',
    },
    IFSC_CODE: {
        icon: Hash,
        label: 'IFSC',
        color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300 border-orange-200 dark:border-orange-800',
    },
    CRYPTO_WALLET: {
        icon: Wallet,
        label: 'Crypto',
        color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800',
    },
}

interface EntityTypeBadgeProps {
    type: string
    showLabel?: boolean
    size?: 'sm' | 'md'
}

export function EntityTypeBadge({ type, showLabel = true, size = 'md' }: EntityTypeBadgeProps) {
    const config = typeConfig[type]

    if (!config) {
        return (
            <Badge variant="secondary" className={size === 'sm' ? 'text-xs py-0' : ''}>
                {type}
            </Badge>
        )
    }

    const Icon = config.icon

    return (
        <Badge
            variant="outline"
            className={cn(
                'gap-1 font-medium',
                config.color,
                size === 'sm' && 'text-xs py-0 px-1.5'
            )}
        >
            <Icon className={cn('shrink-0', size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5')} />
            {showLabel && <span>{config.label}</span>}
        </Badge>
    )
}
