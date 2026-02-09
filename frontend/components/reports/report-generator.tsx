// Report Generator - Interactive Report Creation Form
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { format, subDays, subMonths } from 'date-fns'
import {
    FileText,
    Calendar,
    Download,
    Settings,
    CheckCircle,
    Loader2,
    FileSpreadsheet,
    FileDown
} from 'lucide-react'
import { DateRange } from 'react-day-picker'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useGenerateReport } from '@/lib/hooks/use-reports'
import type { ReportType, ReportFormat } from '@/types/analytics'
import { cn } from '@/lib/utils'

const REPORT_TYPES: { value: ReportType; label: string; description: string }[] = [
    { value: 'daily', label: 'Daily Report', description: 'Summary of the past 24 hours' },
    { value: 'weekly', label: 'Weekly Report', description: 'Weekly trends and analysis' },
    { value: 'monthly', label: 'Monthly Report', description: 'Monthly performance overview' },
    { value: 'custom', label: 'Custom Report', description: 'Select your own date range' },
]

const REPORT_SECTIONS = [
    { id: 'executive_summary', label: 'Executive Summary', default: true },
    { id: 'sessions_analysis', label: 'Sessions Analysis', default: true },
    { id: 'scam_types', label: 'Scam Type Breakdown', default: true },
    { id: 'persona_performance', label: 'Persona Performance', default: true },
    { id: 'entity_extraction', label: 'Entity Extraction', default: true },
    { id: 'geographic_distribution', label: 'Geographic Distribution', default: false },
    { id: 'hourly_analysis', label: 'Hourly Analysis', default: false },
    { id: 'llm_performance', label: 'LLM Performance', default: false },
    { id: 'recommendations', label: 'Recommendations', default: true },
]

const FORMAT_OPTIONS: { value: ReportFormat; label: string; icon: React.ReactNode }[] = [
    { value: 'pdf', label: 'PDF', icon: <FileText className="h-4 w-4" /> },
    { value: 'xlsx', label: 'Excel', icon: <FileSpreadsheet className="h-4 w-4" /> },
    { value: 'csv', label: 'CSV', icon: <FileDown className="h-4 w-4" /> },
]

export function ReportGenerator() {
    const [reportType, setReportType] = useState<ReportType>('weekly')
    const [reportName, setReportName] = useState('')
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: subDays(new Date(), 6),
        to: new Date(),
    })
    const [reportFormat, setReportFormat] = useState<ReportFormat>('pdf')
    const [selectedSections, setSelectedSections] = useState<string[]>(
        REPORT_SECTIONS.filter(s => s.default).map(s => s.id)
    )
    const [includeCharts, setIncludeCharts] = useState(true)

    const { mutate: generateReport, isPending } = useGenerateReport()

    const handleSectionToggle = (sectionId: string) => {
        setSelectedSections(prev =>
            prev.includes(sectionId)
                ? prev.filter(id => id !== sectionId)
                : [...prev, sectionId]
        )
    }

    const getDefaultDateRange = (type: ReportType): DateRange => {
        const now = new Date()
        switch (type) {
            case 'daily':
                return { from: subDays(now, 1), to: now }
            case 'weekly':
                return { from: subDays(now, 6), to: now }
            case 'monthly':
                return { from: subMonths(now, 1), to: now }
            default:
                return { from: subDays(now, 6), to: now }
        }
    }

    const handleTypeChange = (type: ReportType) => {
        setReportType(type)
        if (type !== 'custom') {
            setDateRange(getDefaultDateRange(type))
        }
    }

    const handleGenerate = () => {
        if (!dateRange?.from || !dateRange?.to) return

        const name = reportName || `${REPORT_TYPES.find(t => t.value === reportType)?.label} - ${format(new Date(), 'MMM d, yyyy')}`

        generateReport({
            type: reportType,
            name,
            start_date: dateRange.from.toISOString(),
            end_date: dateRange.to.toISOString(),
            sections: selectedSections,
            format: reportFormat,
            include_charts: includeCharts,
        })
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/25">
                        <FileText className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <CardTitle>Generate Report</CardTitle>
                        <CardDescription>
                            Create a customized analytics report
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Report Type Selection */}
                <div className="space-y-3">
                    <Label>Report Type</Label>
                    <RadioGroup
                        value={reportType}
                        onValueChange={(v) => handleTypeChange(v as ReportType)}
                        className="grid grid-cols-2 gap-3 sm:grid-cols-4"
                    >
                        {REPORT_TYPES.map((type) => (
                            <div key={type.value}>
                                <RadioGroupItem
                                    value={type.value}
                                    id={type.value}
                                    className="peer sr-only"
                                />
                                <Label
                                    htmlFor={type.value}
                                    className={cn(
                                        "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-all",
                                    )}
                                >
                                    <span className="text-sm font-medium">{type.label}</span>
                                    <span className="text-xs text-muted-foreground text-center mt-1">
                                        {type.description}
                                    </span>
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>

                {/* Report Name */}
                <div className="space-y-2">
                    <Label htmlFor="reportName">Report Name (Optional)</Label>
                    <Input
                        id="reportName"
                        placeholder="Enter report name..."
                        value={reportName}
                        onChange={(e) => setReportName(e.target.value)}
                    />
                </div>

                {/* Date Range (for custom) */}
                {reportType === 'custom' && (
                    <div className="space-y-2">
                        <Label>Date Range</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full justify-start text-left">
                                    <Calendar className="mr-2 h-4 w-4" />
                                    {dateRange?.from && dateRange?.to
                                        ? `${format(dateRange.from, 'MMM d, yyyy')} - ${format(dateRange.to, 'MMM d, yyyy')}`
                                        : 'Select date range'}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <CalendarComponent
                                    mode="range"
                                    selected={dateRange}
                                    onSelect={setDateRange}
                                    numberOfMonths={2}
                                    disabled={{ after: new Date() }}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                )}

                {/* Format Selection */}
                <div className="space-y-2">
                    <Label>Export Format</Label>
                    <div className="flex gap-2">
                        {FORMAT_OPTIONS.map((option) => (
                            <Button
                                key={option.value}
                                variant={reportFormat === option.value ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setReportFormat(option.value)}
                                className="flex-1"
                            >
                                {option.icon}
                                <span className="ml-2">{option.label}</span>
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Sections Selection */}
                <div className="space-y-3">
                    <Label>Include Sections</Label>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {REPORT_SECTIONS.map((section) => (
                            <div
                                key={section.id}
                                className="flex items-center space-x-2 rounded-lg border p-2"
                            >
                                <Checkbox
                                    id={section.id}
                                    checked={selectedSections.includes(section.id)}
                                    onCheckedChange={() => handleSectionToggle(section.id)}
                                />
                                <Label
                                    htmlFor={section.id}
                                    className="text-sm cursor-pointer flex-1"
                                >
                                    {section.label}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Include Charts Toggle */}
                {reportFormat === 'pdf' && (
                    <div className="flex items-center space-x-2 rounded-lg border p-3">
                        <Checkbox
                            id="includeCharts"
                            checked={includeCharts}
                            onCheckedChange={(checked) => setIncludeCharts(checked as boolean)}
                        />
                        <Label htmlFor="includeCharts" className="cursor-pointer">
                            Include charts and visualizations
                        </Label>
                    </div>
                )}
            </CardContent>

            <CardFooter>
                <Button
                    className="w-full"
                    onClick={handleGenerate}
                    disabled={isPending || selectedSections.length === 0}
                >
                    {isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating Report...
                        </>
                    ) : (
                        <>
                            <Download className="mr-2 h-4 w-4" />
                            Generate Report
                        </>
                    )}
                </Button>
            </CardFooter>
        </Card>
    )
}
