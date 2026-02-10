'use client'

import { memo } from 'react'
import { cn } from '@/lib/utils/cn'

interface EntityHighlightProps {
    type: string
    value: string
    children?: React.ReactNode
}

const TYPE_STYLES: Record<string, string> = {
    PHONE_NUMBER: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
    UPI_ID: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    BANK_ACCOUNT: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
    URL: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
    EMAIL: 'bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-300',
    IFSC_CODE: 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300',
    CRYPTO_WALLET: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
}

export const EntityHighlight = memo(function EntityHighlight({ type, value, children }: EntityHighlightProps) {
    return (
        <span
            className={cn(
                'px-1 py-0.5 rounded cursor-help font-medium text-xs',
                TYPE_STYLES[type] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
            )}
            title={`${type.replace(/_/g, ' ')}: ${value}`}
        >
            {children || value}
        </span>
    )
})
