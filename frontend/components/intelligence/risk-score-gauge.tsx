// Risk Score Gauge Component
'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface RiskScoreGaugeProps {
    score: number
    size?: 'sm' | 'md' | 'lg'
    showLabel?: boolean
}

export function RiskScoreGauge({ score, size = 'md', showLabel = false }: RiskScoreGaugeProps) {
    const sizeConfig = {
        sm: { width: 60, stroke: 6, fontSize: 'text-lg' },
        md: { width: 80, stroke: 8, fontSize: 'text-2xl' },
        lg: { width: 120, stroke: 10, fontSize: 'text-4xl' },
    }

    const config = sizeConfig[size]
    const radius = (config.width - config.stroke) / 2
    const circumference = radius * 2 * Math.PI
    const progress = (score / 10) * circumference

    const getColor = (score: number) => {
        if (score >= 9) return '#dc2626' // red-600
        if (score >= 7) return '#ef4444' // red-500
        if (score >= 5) return '#f97316' // orange-500
        if (score >= 3) return '#eab308' // yellow-500
        return '#22c55e' // green-500
    }

    const getLabel = (score: number) => {
        if (score >= 9) return 'Critical'
        if (score >= 7) return 'High'
        if (score >= 5) return 'Medium'
        if (score >= 3) return 'Low'
        return 'Minimal'
    }

    const color = getColor(score)

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
                    {score.toFixed(1)}
                </span>
            </div>
            {showLabel && (
                <span className="mt-1 text-xs font-medium text-muted-foreground">
                    {getLabel(score)}
                </span>
            )}
        </div>
    )
}
