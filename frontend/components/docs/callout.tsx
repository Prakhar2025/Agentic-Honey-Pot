'use client'

import { AlertCircle, Info, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

type CalloutType = 'info' | 'warning' | 'error' | 'success'

interface CalloutProps {
    type?: CalloutType
    title?: string
    children: React.ReactNode
    className?: string
}

const config: Record<CalloutType, { icon: React.ElementType; colors: string }> = {
    info: { icon: Info, colors: 'border-blue-500/30 bg-blue-500/5 text-blue-700 dark:text-blue-400' },
    warning: { icon: AlertTriangle, colors: 'border-yellow-500/30 bg-yellow-500/5 text-yellow-700 dark:text-yellow-400' },
    error: { icon: AlertCircle, colors: 'border-red-500/30 bg-red-500/5 text-red-700 dark:text-red-400' },
    success: { icon: CheckCircle2, colors: 'border-green-500/30 bg-green-500/5 text-green-700 dark:text-green-400' },
}

export function Callout({ type = 'info', title, children, className }: CalloutProps) {
    const { icon: Icon, colors } = config[type]

    return (
        <div className={cn('flex gap-3 rounded-lg border p-4', colors, className)}>
            <Icon className="h-5 w-5 shrink-0 mt-0.5" />
            <div className="space-y-1">
                {title && <p className="font-semibold text-sm">{title}</p>}
                <div className="text-sm opacity-90">{children}</div>
            </div>
        </div>
    )
}
