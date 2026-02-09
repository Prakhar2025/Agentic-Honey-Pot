// Entity Risk Badge Component
'use client'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface EntityRiskBadgeProps {
    score: number
    showLabel?: boolean
}

export function EntityRiskBadge({ score, showLabel = false }: EntityRiskBadgeProps) {
    const getRiskLevel = (score: number) => {
        if (score >= 9) return { label: 'Critical', color: 'bg-red-600 text-white hover:bg-red-700' }
        if (score >= 7) return { label: 'High', color: 'bg-red-500 text-white hover:bg-red-600' }
        if (score >= 5) return { label: 'Medium', color: 'bg-orange-500 text-white hover:bg-orange-600' }
        if (score >= 3) return { label: 'Low', color: 'bg-yellow-500 text-black hover:bg-yellow-600' }
        return { label: 'Minimal', color: 'bg-green-500 text-white hover:bg-green-600' }
    }

    const { label, color } = getRiskLevel(score)

    return (
        <Badge className={cn('tabular-nums gap-1.5 font-semibold', color)}>
            <span>{score.toFixed(1)}</span>
            {showLabel && <span className="text-xs font-normal opacity-90">({label})</span>}
        </Badge>
    )
}
