'use client'

import { memo } from 'react'
import { cn } from '@/lib/utils/cn'

interface RiskMeterProps {
    score: number // 0.0 to 1.0
    size?: 'sm' | 'md' | 'lg'
}

export const RiskMeter = memo(function RiskMeter({ score, size = 'md' }: RiskMeterProps) {
    const percentage = Math.round(score * 100)

    const getColor = () => {
        if (score >= 0.8) return 'text-red-500'
        if (score >= 0.6) return 'text-orange-500'
        if (score >= 0.4) return 'text-yellow-500'
        return 'text-green-500'
    }

    const getBarColor = () => {
        if (score >= 0.8) return 'bg-red-500'
        if (score >= 0.6) return 'bg-orange-500'
        if (score >= 0.4) return 'bg-yellow-500'
        return 'bg-green-500'
    }

    const sizeClasses = {
        sm: 'h-1.5 w-16',
        md: 'h-2 w-24',
        lg: 'h-3 w-32',
    }

    return (
        <div className="flex items-center gap-2">
            <div className={cn('rounded-full bg-muted overflow-hidden', sizeClasses[size])}>
                <div
                    className={cn('h-full rounded-full transition-all duration-500', getBarColor())}
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <span className={cn('text-xs font-bold tabular-nums', getColor())}>
                {percentage}%
            </span>
        </div>
    )
})
