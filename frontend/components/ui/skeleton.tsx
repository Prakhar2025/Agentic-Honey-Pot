import { cn } from '@/lib/utils/cn'

function Skeleton({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                'animate-pulse rounded-md bg-muted relative overflow-hidden',
                "after:absolute after:inset-0 after:-translate-x-full after:animate-[shimmer_2s_infinite] after:bg-gradient-to-r after:from-transparent after:via-white/10 after:to-transparent",
                className
            )}
            {...props}
        />
    )
}

function SkeletonText({
    lines = 3,
    className,
}: {
    lines?: number
    className?: string
}) {
    return (
        <div className={cn('space-y-2', className)}>
            {Array.from({ length: lines }).map((_, i) => (
                <Skeleton
                    key={i}
                    className="h-4"
                    style={{ width: i === lines - 1 ? '60%' : '100%' }}
                />
            ))}
        </div>
    )
}

function SkeletonAvatar({
    size = 'default',
    className,
}: {
    size?: 'xs' | 'sm' | 'default' | 'lg' | 'xl'
    className?: string
}) {
    const sizeClasses = {
        xs: 'h-6 w-6',
        sm: 'h-8 w-8',
        default: 'h-10 w-10',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16',
    }

    return (
        <Skeleton className={cn('rounded-full', sizeClasses[size], className)} />
    )
}

function SkeletonCard({ className }: { className?: string }) {
    return (
        <div className={cn('rounded-lg border p-4 space-y-4', className)}>
            <div className="flex items-center gap-4">
                <SkeletonAvatar />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-3 w-1/3" />
                </div>
            </div>
            <SkeletonText lines={3} />
        </div>
    )
}

function SkeletonTable({
    rows = 5,
    columns = 4,
    className,
}: {
    rows?: number
    columns?: number
    className?: string
}) {
    return (
        <div className={cn('w-full', className)}>
            {/* Header */}
            <div className="flex gap-4 border-b pb-3 mb-3">
                {Array.from({ length: columns }).map((_, i) => (
                    <Skeleton key={i} className="h-4 flex-1" />
                ))}
            </div>
            {/* Rows */}
            <div className="space-y-3">
                {Array.from({ length: rows }).map((_, rowIndex) => (
                    <div key={rowIndex} className="flex gap-4">
                        {Array.from({ length: columns }).map((_, colIndex) => (
                            <Skeleton key={colIndex} className="h-4 flex-1" />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

function SkeletonChart({ className }: { className?: string }) {
    return (
        <div className={cn('space-y-4', className)}>
            <Skeleton className="h-6 w-1/3" />
            <div className="flex items-end gap-2 h-48">
                {Array.from({ length: 7 }).map((_, i) => (
                    <Skeleton
                        key={i}
                        className="flex-1 rounded-t"
                        style={{ height: `${Math.random() * 60 + 40}%` }}
                    />
                ))}
            </div>
        </div>
    )
}

function SkeletonList({
    items = 5,
    className,
}: {
    items?: number
    className?: string
}) {
    return (
        <div className={cn('space-y-3', className)}>
            {Array.from({ length: items }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                    <SkeletonAvatar size="sm" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                    </div>
                </div>
            ))}
        </div>
    )
}

export {
    Skeleton,
    SkeletonText,
    SkeletonAvatar,
    SkeletonCard,
    SkeletonTable,
    SkeletonChart,
    SkeletonList
}
