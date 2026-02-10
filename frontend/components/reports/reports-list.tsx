// Reports List Component - Display Generated Reports
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { format, formatDistanceToNow } from 'date-fns'
import {
    FileText,
    Download,
    Trash2,
    Clock,
    CheckCircle,
    Loader2,
    AlertCircle,
    MoreVertical,
    Eye,
} from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useReports, useDownloadReport, useDeleteReport } from '@/lib/hooks'
import { formatBytes } from '@/lib/utils/format'
import type { Report, ReportStatus } from '@/types/analytics'
import { cn } from '@/lib/utils'

const STATUS_CONFIG: Record<ReportStatus, { icon: React.ReactNode; color: string; label: string }> = {
    pending: {
        icon: <Loader2 className="h-4 w-4 animate-spin" />,
        color: 'text-amber-500',
        label: 'Generating',
    },
    generated: {
        icon: <CheckCircle className="h-4 w-4" />,
        color: 'text-green-500',
        label: 'Ready',
    },
    failed: {
        icon: <AlertCircle className="h-4 w-4" />,
        color: 'text-red-500',
        label: 'Failed',
    },
}

interface ReportCardProps {
    report: Report
    index: number
}

function ReportCard({ report, index }: ReportCardProps) {
    const { mutate: downloadReport, isPending: isDownloading } = useDownloadReport()
    const { mutate: deleteReport, isPending: isDeleting } = useDeleteReport()

    const statusConfig = STATUS_CONFIG[report.status]

    const handleDownload = () => {
        downloadReport({
            reportId: report.id,
            filename: `${report.name}.${report.download_url?.split('.').pop() || 'pdf'}`
        })
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
        >
            <Card className="group transition-all hover:shadow-md">
                <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                        {/* Icon & Info */}
                        <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                <FileText className="h-5 w-5 text-primary" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="font-medium leading-none">{report.name}</h3>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Badge variant="outline" className="text-[10px]">
                                        {report.type}
                                    </Badge>
                                    <span>•</span>
                                    <span>{formatDistanceToNow(new Date(report.created_at), { addSuffix: true })}</span>
                                    {report.file_size && (
                                        <>
                                            <span>•</span>
                                            <span>{formatBytes(report.file_size)}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Status & Actions */}
                        <div className="flex items-center gap-2">
                            {/* Status Badge */}
                            <div className={cn("flex items-center gap-1", statusConfig.color)}>
                                {statusConfig.icon}
                                <span className="text-xs font-medium">{statusConfig.label}</span>
                            </div>

                            {/* Actions */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {report.status === 'generated' && (
                                        <DropdownMenuItem onClick={handleDownload} disabled={isDownloading}>
                                            <Download className="mr-2 h-4 w-4" />
                                            Download
                                        </DropdownMenuItem>
                                    )}
                                    <DropdownMenuItem className="text-destructive" onClick={() => deleteReport(report.id)}>
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

function ReportCardSkeleton() {
    return (
        <Card>
            <CardContent className="p-4">
                <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-lg" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-48" />
                        <Skeleton className="h-3 w-32" />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export function ReportsList() {
    const { data, isLoading, error } = useReports()

    if (isLoading) {
        return (
            <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                    <ReportCardSkeleton key={i} />
                ))}
            </div>
        )
    }

    if (error) {
        return (
            <Card className="border-destructive/50 bg-destructive/5">
                <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                    <AlertCircle className="h-8 w-8 text-destructive mb-2" />
                    <p className="text-destructive">Failed to load reports</p>
                </CardContent>
            </Card>
        )
    }

    if (!data?.reports?.length) {
        return (
            <Card>
                <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                    <FileText className="h-12 w-12 text-muted-foreground/50 mb-4" />
                    <h3 className="text-lg font-medium mb-1">No Reports Yet</h3>
                    <p className="text-sm text-muted-foreground">
                        Generated reports will appear here
                    </p>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="space-y-3">
            {data.reports.map((report, index) => (
                <ReportCard key={report.id} report={report} index={index} />
            ))}
        </div>
    )
}
