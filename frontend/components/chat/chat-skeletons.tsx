'use client'

import { Skeleton } from '@/components/ui/skeleton'

export function ChatMessageSkeleton() {
    return (
        <div className="flex gap-3 py-2 px-4">
            <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
            <div className="space-y-2 flex-1">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-16 w-[70%] rounded-2xl" />
                <Skeleton className="h-2 w-12" />
            </div>
        </div>
    )
}

export function ChatHeaderSkeleton() {
    return (
        <div className="flex items-center justify-between border-b px-4 py-3">
            <div className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="space-y-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-48" />
                </div>
            </div>
        </div>
    )
}

export function ChatInputSkeleton() {
    return (
        <div className="border-t p-4">
            <div className="flex gap-2">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-11 flex-1 rounded-2xl" />
                <Skeleton className="h-10 w-10 rounded-full" />
            </div>
        </div>
    )
}

export function IntelligenceSkeleton() {
    return (
        <div className="p-4 space-y-3">
            <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded" />
                <Skeleton className="h-4 w-32" />
            </div>
            {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-2">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-10 w-full rounded-lg" />
                    <Skeleton className="h-10 w-full rounded-lg" />
                </div>
            ))}
        </div>
    )
}

export function SessionPanelSkeleton() {
    return (
        <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-2">
                <Skeleton className="h-20 rounded-lg" />
                <Skeleton className="h-20 rounded-lg" />
            </div>
            <Skeleton className="h-12 w-full rounded-lg" />
            <Skeleton className="h-12 w-full rounded-lg" />
            {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-full" />
            ))}
        </div>
    )
}

export function SidebarSkeleton() {
    return (
        <div className="p-3 space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full rounded-lg" />
            ))}
        </div>
    )
}
