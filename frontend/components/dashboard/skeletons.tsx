'use client'

import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

// Stats cards skeleton
export function StatsCardsSkeleton() {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i}>
                    <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-8 w-20" />
                            </div>
                            <Skeleton className="h-10 w-10 rounded-lg" />
                        </div>
                        <Skeleton className="mt-4 h-10 w-full" />
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

// Chart skeleton
export function ChartSkeleton({ className }: { className?: string }) {
    return (
        <Card className={className}>
            <CardHeader>
                <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-[300px] w-full" />
            </CardContent>
        </Card>
    )
}

// Sessions list skeleton
export function SessionsListSkeleton() {
    return (
        <Card className="lg:col-span-2">
            <CardHeader>
                <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 rounded-lg border p-3">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-3 w-32" />
                        </div>
                        <Skeleton className="h-6 w-20" />
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

// System health skeleton
export function SystemHealthSkeleton() {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-4">
                <Skeleton className="h-10 w-full rounded-lg" />
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between py-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-16" />
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

// Quick actions skeleton
export function QuickActionsSkeleton() {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-2">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                ))}
            </CardContent>
        </Card>
    )
}

// Intelligence summary skeleton
export function IntelligenceSummarySkeleton() {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-4">
                <Skeleton className="h-14 w-full rounded-lg" />
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <Skeleton className="h-8 w-8 rounded-lg" />
                        <div className="flex-1 space-y-1">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-2 w-full" />
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

// Activity feed skeleton
export function ActivityFeedSkeleton() {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-start gap-3 border-b py-3 last:border-0">
                        <Skeleton className="h-6 w-6 rounded-full" />
                        <div className="flex-1 space-y-1">
                            <Skeleton className="h-4 w-48" />
                            <Skeleton className="h-3 w-24" />
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

// Full dashboard skeleton
export function DashboardSkeleton() {
    return (
        <div className="flex flex-col gap-6 p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-40" />
                    <Skeleton className="h-4 w-64" />
                </div>
                <div className="flex items-center gap-2">
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-10" />
                </div>
            </div>

            {/* Stats */}
            <StatsCardsSkeleton />

            {/* Charts */}
            <div className="grid gap-6 lg:grid-cols-3">
                <ChartSkeleton className="lg:col-span-2" />
                <ChartSkeleton />
            </div>

            {/* Sessions and Threat */}
            <div className="grid gap-6 lg:grid-cols-3">
                <SessionsListSkeleton />
                <Skeleton className="h-[400px]" />
            </div>

            {/* Bottom row */}
            <div className="grid gap-6 md:grid-cols-3">
                <SystemHealthSkeleton />
                <QuickActionsSkeleton />
                <IntelligenceSummarySkeleton />
            </div>

            {/* Activity feed */}
            <ActivityFeedSkeleton />
        </div>
    )
}
