'use client'

import * as React from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { format } from 'date-fns'
import { Calendar as CalendarIcon, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar } from '@/components/ui/calendar'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useSessionFiltersStore } from '@/lib/stores/session-filters'
import { SCAM_TYPES, PERSONAS } from '@/lib/constants'
import { cn } from '@/lib/utils/cn'
import type { DateRange } from 'react-day-picker'

export function SessionsFilters() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [isPending, startTransition] = React.useTransition()

    const { isFiltersOpen, setActiveFilterCount } = useSessionFiltersStore()

    // Current filter values from URL
    const currentStatus = searchParams.get('status') || 'all'
    const currentScamType = searchParams.get('scam_type') || ''
    const currentPersona = searchParams.get('persona') || ''
    const dateFrom = searchParams.get('date_from')
    const dateTo = searchParams.get('date_to')

    // Date range state
    const dateRange: DateRange | undefined = dateFrom || dateTo ? {
        from: dateFrom ? new Date(dateFrom) : undefined,
        to: dateTo ? new Date(dateTo) : undefined,
    } : undefined

    // Count active filters
    React.useEffect(() => {
        let count = 0
        if (currentStatus && currentStatus !== 'all') count++
        if (currentScamType) count++
        if (currentPersona) count++
        if (dateFrom || dateTo) count++
        setActiveFilterCount(count)
    }, [currentStatus, currentScamType, currentPersona, dateFrom, dateTo, setActiveFilterCount])

    // Update URL with filter
    const updateFilter = React.useCallback((key: string, value: string | null) => {
        startTransition(() => {
            const params = new URLSearchParams(searchParams.toString())
            if (value && value !== 'all') {
                params.set(key, value)
            } else {
                params.delete(key)
            }
            params.set('page', '1') // Reset to first page
            router.push(`${pathname}?${params.toString()}`)
        })
    }, [searchParams, pathname, router])

    // Update date range
    const updateDateRange = React.useCallback((range: DateRange | undefined) => {
        startTransition(() => {
            const params = new URLSearchParams(searchParams.toString())
            if (range?.from) {
                params.set('date_from', range.from.toISOString())
            } else {
                params.delete('date_from')
            }
            if (range?.to) {
                params.set('date_to', range.to.toISOString())
            } else {
                params.delete('date_to')
            }
            params.set('page', '1')
            router.push(`${pathname}?${params.toString()}`)
        })
    }, [searchParams, pathname, router])

    // Clear all filters
    const clearAllFilters = React.useCallback(() => {
        startTransition(() => {
            router.push(pathname)
        })
    }, [pathname, router])

    // Check if any filters are active
    const hasActiveFilters = currentStatus !== 'all' || currentScamType || currentPersona || dateFrom || dateTo

    return (
        <AnimatePresence>
            {isFiltersOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                >
                    <div className="rounded-lg border bg-card p-4 space-y-4">
                        {/* Status filter tabs */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Status</label>
                            <Tabs value={currentStatus} onValueChange={(v) => updateFilter('status', v)}>
                                <TabsList className="grid w-full grid-cols-5">
                                    <TabsTrigger value="all">All</TabsTrigger>
                                    <TabsTrigger value="ongoing" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700 dark:data-[state=active]:bg-green-900/30 dark:data-[state=active]:text-green-400">
                                        Active
                                    </TabsTrigger>
                                    <TabsTrigger value="completed" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-blue-900/30 dark:data-[state=active]:text-blue-400">
                                        Completed
                                    </TabsTrigger>
                                    <TabsTrigger value="terminated" className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700 dark:data-[state=active]:bg-orange-900/30 dark:data-[state=active]:text-orange-400">
                                        Terminated
                                    </TabsTrigger>
                                    <TabsTrigger value="failed" className="data-[state=active]:bg-red-100 data-[state=active]:text-red-700 dark:data-[state=active]:bg-red-900/30 dark:data-[state=active]:text-red-400">
                                        Failed
                                    </TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>

                        {/* Scam type, persona, and date filters */}
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {/* Scam Type */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Scam Type</label>
                                <Select
                                    value={currentScamType || 'all'}
                                    onValueChange={(v) => updateFilter('scam_type', v === 'all' ? null : v)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="All types" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All types</SelectItem>
                                        {Object.entries(SCAM_TYPES).map(([key, { label, icon }]) => (
                                            <SelectItem key={key} value={key}>
                                                <span className="flex items-center gap-2">
                                                    <span>{icon}</span>
                                                    {label}
                                                </span>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Persona */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Persona</label>
                                <Select
                                    value={currentPersona || 'all'}
                                    onValueChange={(v) => updateFilter('persona', v === 'all' ? null : v)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="All personas" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All personas</SelectItem>
                                        {Object.entries(PERSONAS).map(([key, { label, icon }]) => (
                                            <SelectItem key={key} value={key}>
                                                <span className="flex items-center gap-2">
                                                    <span>{icon}</span>
                                                    {label}
                                                </span>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Date range */}
                            <div className="space-y-2 sm:col-span-2 lg:col-span-2">
                                <label className="text-sm font-medium">Date Range</label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                'w-full justify-start text-left font-normal',
                                                !dateRange && 'text-muted-foreground'
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {dateRange?.from ? (
                                                dateRange.to ? (
                                                    <>
                                                        {format(dateRange.from, 'LLL dd, y')} -{' '}
                                                        {format(dateRange.to, 'LLL dd, y')}
                                                    </>
                                                ) : (
                                                    format(dateRange.from, 'LLL dd, y')
                                                )
                                            ) : (
                                                'Select date range'
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            initialFocus
                                            mode="range"
                                            defaultMonth={dateRange?.from}
                                            selected={dateRange}
                                            onSelect={updateDateRange}
                                            numberOfMonths={2}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>

                        {/* Active filters and clear button */}
                        {hasActiveFilters && (
                            <div className="flex items-center justify-between border-t pt-4">
                                <div className="flex flex-wrap gap-2">
                                    {currentStatus !== 'all' && (
                                        <Badge variant="secondary" className="gap-1 capitalize">
                                            Status: {currentStatus}
                                            <X
                                                className="h-3 w-3 cursor-pointer hover:text-foreground"
                                                onClick={() => updateFilter('status', null)}
                                            />
                                        </Badge>
                                    )}
                                    {currentScamType && (
                                        <Badge variant="secondary" className="gap-1">
                                            Type: {SCAM_TYPES[currentScamType as keyof typeof SCAM_TYPES]?.label || currentScamType}
                                            <X
                                                className="h-3 w-3 cursor-pointer hover:text-foreground"
                                                onClick={() => updateFilter('scam_type', null)}
                                            />
                                        </Badge>
                                    )}
                                    {currentPersona && (
                                        <Badge variant="secondary" className="gap-1">
                                            Persona: {PERSONAS[currentPersona as keyof typeof PERSONAS]?.label || currentPersona}
                                            <X
                                                className="h-3 w-3 cursor-pointer hover:text-foreground"
                                                onClick={() => updateFilter('persona', null)}
                                            />
                                        </Badge>
                                    )}
                                    {dateRange && (
                                        <Badge variant="secondary" className="gap-1">
                                            Date: {format(dateRange.from!, 'MMM d')} - {format(dateRange.to || dateRange.from!, 'MMM d')}
                                            <X
                                                className="h-3 w-3 cursor-pointer hover:text-foreground"
                                                onClick={() => updateDateRange(undefined)}
                                            />
                                        </Badge>
                                    )}
                                </div>
                                <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                                    Clear all
                                </Button>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
