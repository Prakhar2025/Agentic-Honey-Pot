// Intelligence Filters Panel Component
'use client'

import { useCallback, useEffect, useMemo } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { X, RotateCcw, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { DatePickerWithRange } from '@/components/ui/date-picker-with-range'
import { useIntelligenceFiltersStore } from '@/lib/stores/intelligence-filters'
import { ENTITY_TYPES, RISK_LEVELS } from '@/types/filters'
import { cn } from '@/lib/utils'
import { DateRange } from 'react-day-picker'
import { format, parseISO } from 'date-fns'

const verificationOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'true', label: 'Verified Only' },
    { value: 'false', label: 'Pending Only' },
]

const sortOptions = [
    { value: 'created_at', label: 'Created Date' },
    { value: 'risk_score', label: 'Risk Score' },
    { value: 'confidence', label: 'Confidence' },
    { value: 'first_seen', label: 'First Seen' },
    { value: 'last_seen', label: 'Last Seen' },
]

export function IntelligenceFilters() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const { isFiltersOpen, setActiveFilterCount } = useIntelligenceFiltersStore()

    // Current filter values from URL
    const currentType = searchParams.get('type') || 'all'
    const currentRisk = searchParams.get('risk_level') || 'all'
    const currentVerified = searchParams.get('verified') || 'all'
    const currentSort = searchParams.get('sort') || 'created_at'
    const currentOrder = searchParams.get('order') || 'desc'
    const currentDateFrom = searchParams.get('date_from')
    const currentDateTo = searchParams.get('date_to')

    // Calculate active filter count
    const activeFilters = useMemo(() => {
        let count = 0
        if (currentType && currentType !== 'all') count++
        if (currentRisk && currentRisk !== 'all') count++
        if (currentVerified && currentVerified !== 'all') count++
        if (currentDateFrom || currentDateTo) count++
        return count
    }, [currentType, currentRisk, currentVerified, currentDateFrom, currentDateTo])

    // Update store with active filter count
    useEffect(() => {
        setActiveFilterCount(activeFilters)
    }, [activeFilters, setActiveFilterCount])

    // Update filter in URL
    const updateFilter = useCallback(
        (key: string, value: string | null) => {
            const params = new URLSearchParams(searchParams.toString())
            if (value && value !== 'all') {
                params.set(key, value)
            } else {
                params.delete(key)
            }
            params.delete('page')
            router.push(`${pathname}?${params.toString()}`)
        },
        [searchParams, pathname, router]
    )

    // Handle date range change
    const handleDateRangeChange = useCallback(
        (range: DateRange | undefined) => {
            const params = new URLSearchParams(searchParams.toString())
            if (range?.from) {
                params.set('date_from', format(range.from, 'yyyy-MM-dd'))
            } else {
                params.delete('date_from')
            }
            if (range?.to) {
                params.set('date_to', format(range.to, 'yyyy-MM-dd'))
            } else {
                params.delete('date_to')
            }
            params.delete('page')
            router.push(`${pathname}?${params.toString()}`)
        },
        [searchParams, pathname, router]
    )

    // Clear all filters
    const clearAllFilters = useCallback(() => {
        router.push(pathname)
    }, [pathname, router])

    // Current date range
    const dateRange: DateRange | undefined = useMemo(() => {
        if (!currentDateFrom && !currentDateTo) return undefined
        return {
            from: currentDateFrom ? parseISO(currentDateFrom) : undefined,
            to: currentDateTo ? parseISO(currentDateTo) : undefined,
        }
    }, [currentDateFrom, currentDateTo])

    if (!isFiltersOpen) return null

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
            >
                <div className="rounded-lg border bg-card p-4 space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <h3 className="font-medium">Filters</h3>
                            {activeFilters > 0 && (
                                <Badge variant="secondary" className="text-xs">
                                    {activeFilters} active
                                </Badge>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            {activeFilters > 0 && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={clearAllFilters}
                                    className="text-muted-foreground hover:text-foreground"
                                >
                                    <RotateCcw className="mr-2 h-3 w-3" />
                                    Clear all
                                </Button>
                            )}
                        </div>
                    </div>

                    <Separator />

                    {/* Filter controls */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                        {/* Entity Type */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Entity Type</label>
                            <Select
                                value={currentType}
                                onValueChange={(v) => updateFilter('type', v)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="All types" />
                                </SelectTrigger>
                                <SelectContent>
                                    {ENTITY_TYPES.map((type) => (
                                        <SelectItem key={type.value} value={type.value}>
                                            <span className="flex items-center gap-2">
                                                {type.icon && <span>{type.icon}</span>}
                                                {type.label}
                                            </span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Risk Level */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Risk Level</label>
                            <Select
                                value={currentRisk}
                                onValueChange={(v) => updateFilter('risk_level', v)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="All levels" />
                                </SelectTrigger>
                                <SelectContent>
                                    {RISK_LEVELS.map((level) => (
                                        <SelectItem key={level.value} value={level.value}>
                                            <span className="flex items-center gap-2">
                                                {level.color && (
                                                    <span
                                                        className={cn(
                                                            'h-2 w-2 rounded-full',
                                                            level.color === 'red' && 'bg-red-500',
                                                            level.color === 'orange' && 'bg-orange-500',
                                                            level.color === 'yellow' && 'bg-yellow-500',
                                                            level.color === 'green' && 'bg-green-500',
                                                            level.color === 'gray' && 'bg-gray-500'
                                                        )}
                                                    />
                                                )}
                                                {level.label}
                                            </span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Verification Status */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Verification</label>
                            <Select
                                value={currentVerified}
                                onValueChange={(v) => updateFilter('verified', v)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="All status" />
                                </SelectTrigger>
                                <SelectContent>
                                    {verificationOptions.map((opt) => (
                                        <SelectItem key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Sort By */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Sort By</label>
                            <Select
                                value={currentSort}
                                onValueChange={(v) => updateFilter('sort', v)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    {sortOptions.map((opt) => (
                                        <SelectItem key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Order */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Order</label>
                            <Select
                                value={currentOrder}
                                onValueChange={(v) => updateFilter('order', v)}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="desc">Descending</SelectItem>
                                    <SelectItem value="asc">Ascending</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Date range filter */}
                    <div className="flex flex-wrap items-center gap-4 pt-2">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Date Range:</span>
                        </div>
                        <DatePickerWithRange
                            date={dateRange}
                            onDateChange={handleDateRangeChange}
                        />
                        {dateRange && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDateRangeChange(undefined)}
                            >
                                <X className="h-3 w-3 mr-1" />
                                Clear dates
                            </Button>
                        )}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
