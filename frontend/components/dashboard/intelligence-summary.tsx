'use client'

import * as React from 'react'
import {
    Phone,
    CreditCard,
    Building,
    Hash,
    Mail,
    Link as LinkIcon,
    Coins,
    Brain,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { useIntelligenceSummary } from '@/lib/hooks'
import { cn } from '@/lib/utils/cn'

const entityIcons: Record<string, React.ElementType> = {
    PHONE_NUMBER: Phone,
    UPI_ID: CreditCard,
    BANK_ACCOUNT: Building,
    IFSC_CODE: Hash,
    EMAIL: Mail,
    URL: LinkIcon,
    CRYPTO_WALLET: Coins,
}

const entityColors: Record<string, { text: string; bg: string }> = {
    PHONE_NUMBER: { text: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    UPI_ID: { text: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/30' },
    BANK_ACCOUNT: { text: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900/30' },
    IFSC_CODE: { text: 'text-orange-600', bg: 'bg-orange-100 dark:bg-orange-900/30' },
    EMAIL: { text: 'text-pink-600', bg: 'bg-pink-100 dark:bg-pink-900/30' },
    URL: { text: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900/30' },
    CRYPTO_WALLET: { text: 'text-yellow-600', bg: 'bg-yellow-100 dark:bg-yellow-900/30' },
}

function formatEntityType(type: string): string {
    return type
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
}

export function IntelligenceSummary() {
    const { data, isLoading } = useIntelligenceSummary()

    if (isLoading) return <IntelligenceSkeleton />

    const total = data?.total || 0
    const maxCount = Math.max(...(data?.by_type.map((e) => e.count) || [1]))

    return (
        <Card>
            <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg font-semibold">Intelligence</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Total count highlight */}
                <div className="rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 p-4">
                    <div className="text-center">
                        <span className="text-3xl font-bold">{total.toLocaleString()}</span>
                        <p className="text-sm text-muted-foreground">Entities Extracted</p>
                    </div>
                </div>

                {/* Entity breakdown */}
                <div className="space-y-3">
                    {data?.by_type.slice(0, 5).map((entity) => {
                        const Icon = entityIcons[entity.type] || Brain
                        const colors = entityColors[entity.type] || {
                            text: 'text-gray-600',
                            bg: 'bg-gray-100 dark:bg-gray-800',
                        }
                        const percentage = (entity.count / maxCount) * 100

                        return (
                            <div key={entity.type} className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className={cn('rounded-md p-1.5', colors.bg)}>
                                            <Icon className={cn('h-3.5 w-3.5', colors.text)} />
                                        </div>
                                        <span className="text-sm font-medium">
                                            {formatEntityType(entity.type)}
                                        </span>
                                    </div>
                                    <span className="text-sm font-bold">{entity.count}</span>
                                </div>
                                <Progress value={percentage} className="h-1.5" />
                            </div>
                        )
                    })}
                </div>

                {/* View all link */}
                {data && data.by_type.length > 5 && (
                    <p className="text-center text-xs text-muted-foreground">
                        +{data.by_type.length - 5} more types
                    </p>
                )}
            </CardContent>
        </Card>
    )
}

function IntelligenceSkeleton() {
    return (
        <Card>
            <CardHeader className="pb-2">
                <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-4">
                <Skeleton className="h-20 w-full rounded-lg" />
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="space-y-1.5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-7 w-7 rounded-md" />
                                <Skeleton className="h-4 w-20" />
                            </div>
                            <Skeleton className="h-4 w-8" />
                        </div>
                        <Skeleton className="h-1.5 w-full" />
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
