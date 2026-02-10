// Confidence Meter Component
'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ConfidenceMeterProps {
    confidence: number
    size?: 'sm' | 'md' | 'lg'
    showLabel?: boolean
}

export function ConfidenceMeter({ confidence, size = 'md', showLabel = false }: ConfidenceMeterProps) {
    const percentage = Math.round(confidence * 100)

    const sizeConfig = {
        sm: { width: 60, stroke: 6, fontSize: 'text-lg' },
        md: { width: 80, stroke: 8, fontSize: 'text-2xl' },
        lg: { width: 120, stroke: 10, fontSize: 'text-4xl' },
    }

    const config = sizeConfig[size]
    const radius = (config.width - config.stroke) / 2
    const circumference = radius * 2 * Math.PI
    const progress = (percentage / 100) * circumference

    const getColor = (value: number) => {
        if (value >= 90) return '#22c55e' // green-500
        if (value >= 70) return '#3b82f6' // blue-500
        if (value >= 50) return '#eab308' // yellow-500
        return '#ef4444' // red-500
    }

    const getLabel = (value: number) => {
        if (value >= 90) return 'Excellent'
        if (value >= 70) return 'High'
        if (value >= 50) return 'Moderate'
        return 'Low'
    }

    const color = getColor(percentage)

    return (
        <div className="relative inline-flex flex-col items-center justify-center">
            <svg
                width={config.width}
                height={config.width}
                className="-rotate-90 transform"
            >
                {/* Background circle */}
                <circle
                    cx={config.width / 2}
                    cy={config.width / 2}
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={config.stroke}
                    className="text-muted"
                />
                {/* Progress circle */}
                <motion.circle
                    cx={config.width / 2}
                    cy={config.width / 2}
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth={config.stroke}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: circumference - progress }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className={cn('font-bold tabular-nums', config.fontSize)} style={{ color }}>
                    {percentage}%
                </span>
            </div>
            {showLabel && (
                <span className="mt-1 text-xs font-medium text-muted-foreground">
                    {getLabel(percentage)}
                </span>
            )}
        </div>
    )
}
