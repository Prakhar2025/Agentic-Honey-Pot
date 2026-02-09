// Analytics Header Component - Time Range, Compare, Refresh, Export
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { Calendar, ChevronDown, RefreshCcw, Download, BarChart3, GitCompare } from 'lucide-react'
import { DateRange } from 'react-day-picker'

import { Button } from '@/components/ui/button'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { useAnalyticsStore } from '@/lib/stores/analytics-store'
import { useRefreshAnalytics } from '@/lib/hooks/use-analytics'
import { TIME_RANGES, EXTENDED_TIME_RANGES, type TimeRangeKey } from '@/lib/constants/time-ranges'

export function AnalyticsHeader() {
    const [calendarOpen, setCalendarOpen] = useState(false)

    const {
        timeRange,
        setTimeRange,
        customRange,
        setCustomRange,
        compareEnabled,
        setCompareEnabled,
        isRefreshing,
    } = useAnalyticsStore()

    const { refresh } = useRefreshAnalytics()

    const handleTimeRangeChange = (range: TimeRangeKey) => {
        setTimeRange(range)
        if (range !== 'custom') {
            setCalendarOpen(false)
        }
    }

    const handleCustomRangeChange = (range: DateRange | undefined) => {
        setCustomRange(range)
        if (range?.from && range?.to) {
            setTimeRange('custom')
        }
    }

    const getTimeRangeLabel = () => {
        if (timeRange === 'custom' && customRange?.from && customRange?.to) {
            return `${format(customRange.from, 'MMM d')} - ${format(customRange.to, 'MMM d, yyyy')}`
        }
        return TIME_RANGES[timeRange]?.label || 'Select Range'
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
            {/* Title Section */}
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25">
                    <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
                    <p className="text-sm text-muted-foreground">
                        Insights and trends from honeypot operations
                    </p>
                </div>
            </div>

            {/* Controls Section */}
            <div className="flex flex-wrap items-center gap-2">
                {/* Time Range Selector */}
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className={cn(
                                "h-9 justify-start gap-2 text-left font-normal",
                                timeRange === 'custom' && "border-primary"
                            )}
                        >
                            <Calendar className="h-4 w-4" />
                            <span className="hidden sm:inline">{getTimeRangeLabel()}</span>
                            <span className="sm:hidden">{TIME_RANGES[timeRange]?.shortLabel || 'Custom'}</span>
                            <ChevronDown className="h-4 w-4 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                        <div className="flex">
                            {/* Preset Options */}
                            <div className="border-r p-2">
                                <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                                    Presets
                                </div>
                                {EXTENDED_TIME_RANGES.map((key) => (
                                    <button
                                        key={key}
                                        onClick={() => handleTimeRangeChange(key)}
                                        className={cn(
                                            "flex w-full items-center rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-accent",
                                            timeRange === key && "bg-accent font-medium"
                                        )}
                                    >
                                        {TIME_RANGES[key].label}
                                    </button>
                                ))}
                            </div>
                            {/* Calendar */}
                            <div className="p-3">
                                <CalendarComponent
                                    mode="range"
                                    selected={customRange}
                                    onSelect={handleCustomRangeChange}
                                    numberOfMonths={2}
                                    disabled={{ after: new Date() }}
                                />
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>

                {/* Compare Toggle */}
                <div className="flex items-center gap-2 rounded-lg border bg-background/50 px-3 py-1.5">
                    <GitCompare className="h-4 w-4 text-muted-foreground" />
                    <span className="hidden text-sm sm:inline">Compare</span>
                    <Switch
                        checked={compareEnabled}
                        onCheckedChange={setCompareEnabled}
                        className="data-[state=checked]:bg-primary"
                    />
                </div>

                {/* Refresh Button */}
                <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => refresh()}
                    disabled={isRefreshing}
                >
                    <RefreshCcw className={cn(
                        "h-4 w-4",
                        isRefreshing && "animate-spin"
                    )} />
                </Button>

                {/* Export Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className="h-9 w-9">
                            <Download className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Export Data</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            Export as PDF
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Export as CSV
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Export as Excel
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            Schedule Report
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </motion.div>
    )
}
