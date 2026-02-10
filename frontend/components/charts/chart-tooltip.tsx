'use client'

import * as React from 'react'
import { cn } from '@/lib/utils/cn'

interface ChartTooltipProps {
    active?: boolean
    payload?: Array<{
        name: string
        value: number
        color: string
        dataKey: string
    }>
    label?: string
    formatter?: (value: number, name: string) => string
}

export function ChartTooltip({
    active,
    payload,
    label,
    formatter,
}: ChartTooltipProps) {
    if (!active || !payload || payload.length === 0) {
        return null
    }

    return (
        <div className="rounded-lg border bg-background p-3 shadow-lg">
            {label && (
                <p className="mb-2 text-sm font-medium text-foreground">{label}</p>
            )}
            <div className="space-y-1">
                {payload.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                        <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: item.color }}
                        />
                        <span className="text-muted-foreground">{item.name}:</span>
                        <span className="font-medium">
                            {formatter ? formatter(item.value, item.name) : item.value.toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

// Minimal tooltip variant
export function MinimalTooltip({
    active,
    payload,
    label,
}: ChartTooltipProps) {
    if (!active || !payload || payload.length === 0) {
        return null
    }

    return (
        <div className="rounded-md bg-foreground px-2 py-1 text-xs text-background">
            <span className="font-medium">{payload[0]?.value?.toLocaleString()}</span>
            {label && <span className="ml-1 opacity-70">({label})</span>}
        </div>
    )
}
