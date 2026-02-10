// Hourly Activity Heatmap - Day/Hour Grid
'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Info } from 'lucide-react'

import { ChartContainer } from '@/components/charts/chart-container'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Badge } from '@/components/ui/badge'
import { useHourlyActivity } from '@/lib/hooks'
import { formatNumber, formatDuration } from '@/lib/utils/format'
import { getIntensityColor } from '@/lib/constants/chart-colors'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const HOURS = Array.from({ length: 24 }, (_, i) => i)

interface CellData {
    day: number
    hour: number
    count: number
    avg_duration: number
}

interface HeatmapCellProps {
    data: CellData
    maxCount: number
    isHighlighted: boolean
    onHover: () => void
    onLeave: () => void
}

function HeatmapCell({ data, maxCount, isHighlighted, onHover, onLeave }: HeatmapCellProps) {
    const color = getIntensityColor(data.count, maxCount)

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <motion.div
                    className="aspect-square cursor-pointer rounded-sm transition-all"
                    style={{
                        backgroundColor: color,
                        opacity: isHighlighted ? 1 : 0.9,
                    }}
                    whileHover={{ scale: 1.1 }}
                    onMouseEnter={onHover}
                    onMouseLeave={onLeave}
                />
            </TooltipTrigger>
            <TooltipContent>
                <div className="space-y-1">
                    <p className="font-medium">
                        {DAYS[data.day]}, {data.hour.toString().padStart(2, '0')}:00
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">Sessions:</span>
                        <span className="font-medium">{formatNumber(data.count)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">Avg Duration:</span>
                        <span className="font-medium">{formatDuration(data.avg_duration)}</span>
                    </div>
                </div>
            </TooltipContent>
        </Tooltip>
    )
}

export function HourlyActivityHeatmap() {
    const [hoveredCell, setHoveredCell] = useState<{ day: number; hour: number } | null>(null)
    const { data, isLoading, error } = useHourlyActivity()

    const { gridData, maxCount, peakHours, stats } = useMemo(() => {
        if (!data?.data) return { gridData: [], maxCount: 0, peakHours: [], stats: null }

        // Create a 7x24 grid
        const grid: CellData[][] = Array.from({ length: 7 }, (_, day) =>
            Array.from({ length: 24 }, (_, hour) => ({
                day,
                hour,
                count: 0,
                avg_duration: 0,
            }))
        )

        // Fill in the data
        data.data.forEach((item) => {
            if (grid[item.day] && grid[item.day][item.hour]) {
                grid[item.day][item.hour] = item
            }
        })

        const allCounts = data.data.map(d => d.count)
        const max = Math.max(...allCounts, 1)

        // Find peak hours
        const sortedByCount = [...data.data].sort((a, b) => b.count - a.count)
        const peaks = sortedByCount.slice(0, 3)

        // Calculate stats
        const totalSessions = allCounts.reduce((a, b) => a + b, 0)
        const avgSessionsPerSlot = totalSessions / (7 * 24)

        return {
            gridData: grid,
            maxCount: max,
            peakHours: peaks,
            stats: {
                total: totalSessions,
                avg: avgSessionsPerSlot,
            },
        }
    }, [data])

    // Find cells in same row/column as hovered
    const isHighlighted = (day: number, hour: number) => {
        if (!hoveredCell) return false
        return hoveredCell.day === day || hoveredCell.hour === hour
    }

    return (
        <ChartContainer
            title="Hourly Activity"
            description="Session activity patterns by day and hour"
            icon={<Clock className="h-4 w-4" />}
            isEmpty={!gridData.length}
            isLoading={isLoading}
            error={error?.message}
        >
            <div className="space-y-4">
                {/* Heatmap Grid */}
                <div className="overflow-x-auto">
                    <div className="min-w-[600px]">
                        {/* Hour Labels */}
                        <div className="mb-1 flex gap-[2px] pl-12">
                            {HOURS.map((hour) => (
                                <div
                                    key={hour}
                                    className="flex-1 text-center text-[10px] text-muted-foreground"
                                >
                                    {hour % 3 === 0 ? `${hour}` : ''}
                                </div>
                            ))}
                        </div>

                        {/* Grid Rows */}
                        <div className="space-y-[2px]">
                            {gridData.map((row, dayIndex) => (
                                <div key={dayIndex} className="flex gap-[2px]">
                                    {/* Day Label */}
                                    <div className="w-10 flex-shrink-0 text-right text-xs text-muted-foreground pr-2 flex items-center justify-end">
                                        {DAYS[dayIndex]}
                                    </div>

                                    {/* Hour Cells */}
                                    {row.map((cell, hourIndex) => (
                                        <div key={`${dayIndex}-${hourIndex}`} className="flex-1">
                                            <HeatmapCell
                                                data={cell}
                                                maxCount={maxCount}
                                                isHighlighted={isHighlighted(dayIndex, hourIndex)}
                                                onHover={() => setHoveredCell({ day: dayIndex, hour: hourIndex })}
                                                onLeave={() => setHoveredCell(null)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Legend */}
                <div className="flex items-center justify-between border-t pt-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>Less</span>
                        <div className="flex gap-0.5">
                            {[0, 0.2, 0.4, 0.6, 0.8, 1].map((ratio, i) => (
                                <div
                                    key={i}
                                    className="h-3 w-3 rounded-sm"
                                    style={{ backgroundColor: getIntensityColor(ratio * maxCount, maxCount) }}
                                />
                            ))}
                        </div>
                        <span>More</span>
                    </div>

                    {/* Peak Hours */}
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Peak:</span>
                        {peakHours.slice(0, 2).map((peak, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                                {DAYS[peak.day]} {peak.hour}:00
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* Stats */}
                {stats && (
                    <div className="grid grid-cols-2 gap-4 rounded-lg bg-muted/30 p-3">
                        <div className="text-center">
                            <p className="text-lg font-bold">{formatNumber(stats.total)}</p>
                            <p className="text-xs text-muted-foreground">Total Sessions</p>
                        </div>
                        <div className="text-center">
                            <p className="text-lg font-bold">{stats.avg.toFixed(1)}</p>
                            <p className="text-xs text-muted-foreground">Avg per Hour/Day</p>
                        </div>
                    </div>
                )}
            </div>
        </ChartContainer>
    )
}
