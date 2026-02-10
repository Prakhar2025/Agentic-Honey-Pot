// Geographic Heatmap - India States Activity Map
'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Info } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ChartContainer } from '@/components/charts/chart-container'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useGeographicDistribution } from '@/lib/hooks'
import { formatNumber, formatPercentage } from '@/lib/utils/format'
import { getGeoHeatColor, STATE_NAMES, INDIA_STATES_PATH } from '@/lib/utils/geo-data'
import { SCAM_TYPE_COLORS } from '@/lib/constants/chart-colors'

interface StateData {
    state: string
    state_code: string
    count: number
    percentage: number
    top_scam_types: string[]
}

const SCAM_TYPE_LABELS: Record<string, string> = {
    KYC_FRAUD: 'KYC',
    LOTTERY_SCAM: 'Lottery',
    INVESTMENT_FRAUD: 'Investment',
    TECH_SUPPORT: 'Tech Support',
    JOB_SCAM: 'Job',
    OTHER: 'Other',
}

interface StateTooltipProps {
    data: StateData
}

function StateTooltipContent({ data }: StateTooltipProps) {
    return (
        <div className="min-w-[180px] space-y-2">
            <div className="flex items-center justify-between">
                <span className="font-medium">{STATE_NAMES[data.state_code] || data.state}</span>
                <Badge variant="secondary" className="text-xs">
                    {formatPercentage(data.percentage)}
                </Badge>
            </div>
            <div className="text-sm">
                <span className="text-muted-foreground">Sessions: </span>
                <span className="font-medium">{formatNumber(data.count)}</span>
            </div>
            {data.top_scam_types.length > 0 && (
                <div className="flex flex-wrap gap-1">
                    {data.top_scam_types.map((type) => (
                        <Badge
                            key={type}
                            variant="outline"
                            className="text-[10px]"
                            style={{
                                borderColor: SCAM_TYPE_COLORS[type] || '#888',
                                color: SCAM_TYPE_COLORS[type] || '#888'
                            }}
                        >
                            {SCAM_TYPE_LABELS[type] || type}
                        </Badge>
                    ))}
                </div>
            )}
        </div>
    )
}

export function GeographicHeatmap() {
    const [hoveredState, setHoveredState] = useState<string | null>(null)
    const { data, isLoading, error } = useGeographicDistribution()

    const stateDataMap = useMemo(() => {
        if (!data?.data) return new Map<string, StateData>()
        return new Map(data.data.map(item => [item.state_code, item]))
    }, [data])

    const maxCount = useMemo(() => {
        if (!data?.data) return 0
        return Math.max(...data.data.map(d => d.count))
    }, [data])

    const topStates = useMemo(() => {
        if (!data?.data) return []
        return data.data.slice(0, 5)
    }, [data])

    return (
        <ChartContainer
            title="Geographic Distribution"
            description="Activity heatmap across Indian states"
            icon={<MapPin className="h-4 w-4" />}
            isEmpty={!data?.data?.length}
            isLoading={isLoading}
            error={error?.message}
        >
            <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
                {/* Map Visualization */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-muted/30">
                    <svg
                        viewBox="0 0 600 700"
                        className="h-full w-full"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        {/* Background */}
                        <rect width="600" height="700" fill="transparent" />

                        {/* States */}
                        {Object.entries(INDIA_STATES_PATH).map(([code, { name, path }]) => {
                            const stateData = stateDataMap.get(code)
                            const fillColor = stateData
                                ? getGeoHeatColor(stateData.percentage)
                                : '#e5e7eb'

                            return (
                                <Tooltip key={code}>
                                    <TooltipTrigger asChild>
                                        <motion.path
                                            d={path}
                                            fill={fillColor}
                                            stroke="hsl(var(--background))"
                                            strokeWidth={1}
                                            className="cursor-pointer transition-all"
                                            whileHover={{ scale: 1.02, opacity: 0.9 }}
                                            onMouseEnter={() => setHoveredState(code)}
                                            onMouseLeave={() => setHoveredState(null)}
                                            style={{
                                                filter: hoveredState === code
                                                    ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
                                                    : 'none'
                                            }}
                                        />
                                    </TooltipTrigger>
                                    {stateData && (
                                        <TooltipContent side="top">
                                            <StateTooltipContent data={stateData} />
                                        </TooltipContent>
                                    )}
                                </Tooltip>
                            )
                        })}
                    </svg>

                    {/* Color Legend */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-lg bg-background/80 p-2 text-xs backdrop-blur-sm">
                        <span className="text-muted-foreground">Low</span>
                        <div className="flex h-3">
                            <div className="w-4 bg-gray-200" />
                            <div className="w-4 bg-green-600" />
                            <div className="w-4 bg-lime-600" />
                            <div className="w-4 bg-yellow-600" />
                            <div className="w-4 bg-amber-600" />
                            <div className="w-4 bg-orange-600" />
                            <div className="w-4 bg-red-600" />
                        </div>
                        <span className="text-muted-foreground">High</span>
                    </div>
                </div>

                {/* Top States List */}
                <div className="space-y-3">
                    <h4 className="text-sm font-medium">Top States</h4>
                    <div className="space-y-2">
                        {topStates.map((state, index) => (
                            <motion.div
                                key={state.state_code}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="group flex items-center gap-3 rounded-lg border bg-card p-3 transition-colors hover:bg-accent/50"
                            >
                                <div
                                    className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
                                    style={{ backgroundColor: getGeoHeatColor(state.percentage) }}
                                >
                                    {index + 1}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium truncate">
                                        {STATE_NAMES[state.state_code] || state.state}
                                    </p>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <span>{formatNumber(state.count)} sessions</span>
                                        <span>•</span>
                                        <span>{formatPercentage(state.percentage)}</span>
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    {state.top_scam_types.slice(0, 2).map((type) => (
                                        <div
                                            key={type}
                                            className="h-2 w-2 rounded-full"
                                            style={{ backgroundColor: SCAM_TYPE_COLORS[type] || '#888' }}
                                            title={SCAM_TYPE_LABELS[type] || type}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {data && (
                        <div className="rounded-lg bg-muted/50 p-3 text-center">
                            <p className="text-2xl font-bold">{formatNumber(data.total)}</p>
                            <p className="text-xs text-muted-foreground">Total Sessions</p>
                        </div>
                    )}
                </div>
            </div>
        </ChartContainer>
    )
}
