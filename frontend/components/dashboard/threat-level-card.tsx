'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Shield, TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useThreatLevel } from '@/lib/hooks/use-dashboard-data'
import { cn } from '@/lib/utils/cn'

const threatColors = [
    'from-green-500 to-green-600',
    'from-green-500 to-green-600',
    'from-green-500 to-lime-500',
    'from-lime-500 to-yellow-500',
    'from-yellow-500 to-amber-500',
    'from-amber-500 to-orange-500',
    'from-orange-500 to-orange-600',
    'from-orange-600 to-red-500',
    'from-red-500 to-red-600',
    'from-red-600 to-red-700',
]

const threatLabels = [
    'Minimal',
    'Minimal',
    'Low',
    'Low',
    'Moderate',
    'Moderate',
    'Elevated',
    'High',
    'Very High',
    'Critical',
]

export function ThreatLevelCard() {
    const { data, isLoading } = useThreatLevel()

    if (isLoading) return <ThreatSkeleton />

    const level = data?.level || 1
    const colorClass = threatColors[Math.min(level - 1, 9)]
    const label = threatLabels[Math.min(level - 1, 9)]
    const percentage = (level / 10) * 100

    return (
        <Card className="relative overflow-hidden">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg font-semibold">Threat Level</CardTitle>
                    </div>
                    <Badge
                        variant={level <= 3 ? 'secondary' : level <= 6 ? 'warning' : 'destructive'}
                        className="text-xs"
                    >
                        {label}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                {/* Circular gauge */}
                <div className="flex flex-col items-center py-4">
                    <div className="relative h-32 w-32">
                        {/* Background circle */}
                        <svg className="h-32 w-32 -rotate-90 transform" viewBox="0 0 100 100">
                            <circle
                                cx="50"
                                cy="50"
                                r="40"
                                fill="none"
                                strokeWidth="12"
                                className="stroke-muted"
                            />
                            <motion.circle
                                cx="50"
                                cy="50"
                                r="40"
                                fill="none"
                                strokeWidth="12"
                                strokeLinecap="round"
                                className={cn('stroke-current', level <= 3 ? 'text-green-500' : level <= 6 ? 'text-yellow-500' : 'text-red-500')}
                                initial={{ strokeDasharray: '0 251' }}
                                animate={{ strokeDasharray: `${(percentage / 100) * 251} 251` }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                            />
                        </svg>

                        {/* Center content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <motion.span
                                className="text-3xl font-bold"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 100, delay: 0.3 }}
                            >
                                {level}
                            </motion.span>
                            <span className="text-xs text-muted-foreground">/ 10</span>
                        </div>
                    </div>
                </div>

                {/* Stats below */}
                <div className="grid grid-cols-2 gap-4 border-t pt-4">
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-1">
                            <AlertTriangle className="h-4 w-4 text-orange-500" />
                            <span className="text-lg font-bold">{data?.activeThreats || 0}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Active Threats</p>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-1">
                            {(data?.change24h || 0) >= 0 ? (
                                <TrendingUp className="h-4 w-4 text-red-500" />
                            ) : (
                                <TrendingDown className="h-4 w-4 text-green-500" />
                            )}
                            <span className="text-lg font-bold">
                                {(data?.change24h || 0) >= 0 ? '+' : ''}{data?.change24h || 0}
                            </span>
                        </div>
                        <p className="text-xs text-muted-foreground">24h Change</p>
                    </div>
                </div>
            </CardContent>

            {/* Background gradient effect */}
            <div
                className={cn(
                    'pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br opacity-10',
                    colorClass
                )}
            />
        </Card>
    )
}

function ThreatSkeleton() {
    return (
        <Card>
            <CardHeader className="pb-2">
                <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
                <div className="flex justify-center py-4">
                    <Skeleton className="h-32 w-32 rounded-full" />
                </div>
                <div className="grid grid-cols-2 gap-4 border-t pt-4">
                    <div className="text-center">
                        <Skeleton className="mx-auto h-6 w-12" />
                        <Skeleton className="mx-auto mt-1 h-3 w-20" />
                    </div>
                    <div className="text-center">
                        <Skeleton className="mx-auto h-6 w-12" />
                        <Skeleton className="mx-auto mt-1 h-3 w-20" />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
