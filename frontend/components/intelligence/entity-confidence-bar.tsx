// Entity Confidence Bar Component
'use client'

import { cn } from '@/lib/utils'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip'

interface EntityConfidenceBarProps {
    confidence: number
    showPercentage?: boolean
    size?: 'sm' | 'md' | 'lg'
}

export function EntityConfidenceBar({
    confidence,
    showPercentage = true,
    size = 'md',
}: EntityConfidenceBarProps) {
    const percentage = Math.round(confidence * 100)

    const getColor = (value: number) => {
        if (value >= 90) return 'bg-green-500'
        if (value >= 70) return 'bg-blue-500'
        if (value >= 50) return 'bg-yellow-500'
        return 'bg-red-500'
    }

    const sizeConfig = {
        sm: { height: 'h-1.5', width: 'w-12' },
        md: { height: 'h-2', width: 'w-16' },
        lg: { height: 'h-2.5', width: 'w-24' },
    }

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <div className="flex items-center gap-2">
                    <div
                        className={cn(
                            'rounded-full bg-muted overflow-hidden',
                            sizeConfig[size].height,
                            sizeConfig[size].width
                        )}
                    >
                        <div
                            className={cn(
                                'h-full rounded-full transition-all duration-300',
                                getColor(percentage)
                            )}
                            style={{ width: `${percentage}%` }}
                        />
                    </div>
                    {showPercentage && (
                        <span className="text-xs font-medium text-muted-foreground tabular-nums">
                            {percentage}%
                        </span>
                    )}
                </div>
            </TooltipTrigger>
            <TooltipContent>
                <p>Confidence: {percentage}%</p>
            </TooltipContent>
        </Tooltip>
    )
}
