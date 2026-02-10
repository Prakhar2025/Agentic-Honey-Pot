'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { RefreshCw, Calendar, Clock, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useInvalidateDashboard } from '@/lib/hooks'
import { TIME_RANGES } from '@/types/dashboard'

interface DashboardHeaderProps {
    timeRange?: string
    onTimeRangeChange?: (range: string) => void
}

export function DashboardHeader({
    timeRange = '7d',
    onTimeRangeChange,
}: DashboardHeaderProps) {
    const [isRefreshing, setIsRefreshing] = React.useState(false)
    const invalidateDashboard = useInvalidateDashboard()
    const [currentTime, setCurrentTime] = React.useState(new Date())

    React.useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    const handleRefresh = async () => {
        setIsRefreshing(true)
        invalidateDashboard()
        setTimeout(() => setIsRefreshing(false), 1000)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
            <div className="space-y-1">
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        Dashboard
                    </h1>
                    <Badge variant="outline" className="gap-1.5 font-normal">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                        </span>
                        Live
                    </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                    Real-time scam engagement monitoring and intelligence extraction
                </p>
            </div>

            <div className="flex items-center gap-2">
                {/* Current time */}
                <div className="hidden items-center gap-1.5 text-sm text-muted-foreground lg:flex">
                    <Clock className="h-4 w-4" />
                    <span suppressHydrationWarning>
                        {currentTime.toLocaleTimeString()}
                    </span>
                </div>

                {/* Time range selector */}
                <Select value={timeRange} onValueChange={onTimeRangeChange}>
                    <SelectTrigger className="w-[100px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {TIME_RANGES.map((range) => (
                            <SelectItem key={range.value} value={range.value}>
                                {range.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Refresh button */}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                >
                    <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                </Button>
            </div>
        </motion.div>
    )
}
