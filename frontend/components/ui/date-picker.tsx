'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'

interface DatePickerProps {
    date?: Date
    onDateChange?: (date: Date | undefined) => void
    placeholder?: string
    disabled?: boolean
    className?: string
    dateFormat?: string
}

function DatePicker({
    date,
    onDateChange,
    placeholder = 'Pick a date',
    disabled,
    className,
    dateFormat = 'PPP',
}: DatePickerProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    disabled={disabled}
                    className={cn(
                        'w-[280px] justify-start text-left font-normal',
                        !date && 'text-muted-foreground',
                        className
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, dateFormat) : <span>{placeholder}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={onDateChange}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}

interface DateRangePickerProps {
    dateRange?: { from: Date | undefined; to?: Date | undefined }
    onDateRangeChange?: (range: { from: Date | undefined; to?: Date | undefined } | undefined) => void
    placeholder?: string
    disabled?: boolean
    className?: string
    dateFormat?: string
}

function DateRangePicker({
    dateRange,
    onDateRangeChange,
    placeholder = 'Pick a date range',
    disabled,
    className,
    dateFormat = 'LLL dd, y',
}: DateRangePickerProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    disabled={disabled}
                    className={cn(
                        'w-[300px] justify-start text-left font-normal',
                        !dateRange && 'text-muted-foreground',
                        className
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                        dateRange.to ? (
                            <>
                                {format(dateRange.from, dateFormat)} -{' '}
                                {format(dateRange.to, dateFormat)}
                            </>
                        ) : (
                            format(dateRange.from, dateFormat)
                        )
                    ) : (
                        <span>{placeholder}</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={onDateRangeChange}
                    numberOfMonths={2}
                />
            </PopoverContent>
        </Popover>
    )
}

export { DatePicker, DateRangePicker }
