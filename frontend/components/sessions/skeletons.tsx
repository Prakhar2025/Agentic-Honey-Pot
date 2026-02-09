'use client'

import * as React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

// Sessions List Skeleton
export function SessionsListSkeleton() {
    return (
        <div className="space-y-4">
            {/* Table skeleton */}
            <div className="rounded-lg border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12"><Skeleton className="h-4 w-4" /></TableHead>
                            <TableHead className="w-24"><Skeleton className="h-4 w-16" /></TableHead>
                            <TableHead className="w-48"><Skeleton className="h-4 w-24" /></TableHead>
                            <TableHead className="w-32"><Skeleton className="h-4 w-20" /></TableHead>
                            <TableHead className="w-24"><Skeleton className="h-4 w-16" /></TableHead>
                            <TableHead className="w-24"><Skeleton className="h-4 w-16" /></TableHead>
                            <TableHead className="w-32"><Skeleton className="h-4 w-20" /></TableHead>
                            <TableHead className="w-20"><Skeleton className="h-4 w-12" /></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.from({ length: 8 }).map((_, i) => (
                            <TableRow key={i}>
                                <TableCell><Skeleton className="h-4 w-4" /></TableCell>
                                <TableCell><Skeleton className="h-6 w-16 rounded-full" /></TableCell>
                                <TableCell>
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-32" />
                                        <Skeleton className="h-3 w-48" />
                                    </div>
                                </TableCell>
                                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                                <TableCell><Skeleton className="h-6 w-8 rounded-full" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                                <TableCell><Skeleton className="h-8 w-16" /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination skeleton */}
            <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-40" />
                <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-32" />
                    <Skeleton className="h-8 w-20" />
                </div>
            </div>
        </div>
    )
}

// Session Detail Skeleton
export function SessionDetailSkeleton() {
    return (
        <div className="flex flex-col h-full">
            {/* Header skeleton */}
            <div className="border-b p-4 space-y-4">
                <div className="flex items-center gap-4">
                    <Skeleton className="h-8 w-32" />
                    <Skeleton className="h-6 w-24 rounded-full" />
                </div>
                <div className="flex items-center gap-4">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-4 w-32" />
                </div>
            </div>

            {/* Content skeleton */}
            <div className="flex flex-1">
                {/* Conversation area */}
                <div className="flex-1 p-4 space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                            <div className={`max-w-[70%] space-y-2 ${i % 2 === 0 ? 'mr-auto' : 'ml-auto'}`}>
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-20 w-64 rounded-lg" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sidebar skeleton */}
                <div className="w-80 border-l p-4 space-y-4">
                    <Skeleton className="h-8 w-full" />
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-5 w-32" />
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-4 w-12" />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-5 w-40" />
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <Skeleton key={i} className="h-12 w-full rounded-lg" />
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

// Conversation Skeleton
export function ConversationSkeleton() {
    return (
        <div className="space-y-4 p-4">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                    <div className={`space-y-2 ${i % 2 === 0 ? 'mr-auto' : 'ml-auto'}`}>
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className={`h-16 ${i % 2 === 0 ? 'w-72' : 'w-64'} rounded-lg`} />
                    </div>
                </div>
            ))}
        </div>
    )
}

// Intelligence Panel Skeleton
export function IntelligenceSkeleton() {
    return (
        <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i}>
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-8 w-8 rounded-lg" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                            <Skeleton className="h-5 w-6 rounded-full" />
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {Array.from({ length: 2 }).map((_, j) => (
                            <Skeleton key={j} className="h-10 w-full rounded" />
                        ))}
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
