// Reports Hooks - TanStack Query
'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { reportsApi, type ReportsQueryParams, type ScheduledReport, type CreateScheduledReportRequest } from '@/lib/api/reports'
import type { GenerateReportRequest } from '@/types/analytics'
import { toast } from 'sonner'

// ============================================================================
// Query Keys
// ============================================================================

export const reportsKeys = {
    all: ['reports'] as const,
    list: (params?: ReportsQueryParams) => [...reportsKeys.all, 'list', params] as const,
    detail: (id: string) => [...reportsKeys.all, 'detail', id] as const,
    scheduled: () => [...reportsKeys.all, 'scheduled'] as const,
}

// ============================================================================
// Reports List Hook
// ============================================================================

export function useReports(params?: ReportsQueryParams) {
    return useQuery({
        queryKey: reportsKeys.list(params),
        queryFn: () => reportsApi.getReports(params),
        staleTime: 30 * 1000, // 30 seconds
    })
}

// ============================================================================
// Single Report Hook
// ============================================================================

export function useReport(reportId: string) {
    return useQuery({
        queryKey: reportsKeys.detail(reportId),
        queryFn: () => reportsApi.getReport(reportId),
        enabled: !!reportId,
    })
}

// ============================================================================
// Generate Report Mutation
// ============================================================================

export function useGenerateReport() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (request: GenerateReportRequest) => reportsApi.generateReport(request),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: reportsKeys.all })
            toast.success('Report generation started', {
                description: `Estimated time: ${data.estimated_time} seconds`,
            })
        },
        onError: () => {
            toast.error('Failed to generate report')
        },
    })
}

// ============================================================================
// Download Report Hook
// ============================================================================

export function useDownloadReport() {
    return useMutation({
        mutationFn: async ({ reportId, filename }: { reportId: string; filename: string }) => {
            const blob = await reportsApi.downloadReport(reportId)

            // Create download link
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = filename
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)

            return blob
        },
        onSuccess: () => {
            toast.success('Report downloaded successfully')
        },
        onError: () => {
            toast.error('Failed to download report')
        },
    })
}

// ============================================================================
// Delete Report Mutation
// ============================================================================

export function useDeleteReport() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (reportId: string) => reportsApi.deleteReport(reportId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: reportsKeys.all })
            toast.success('Report deleted')
        },
        onError: () => {
            toast.error('Failed to delete report')
        },
    })
}

// ============================================================================
// Scheduled Reports Hook
// ============================================================================

export function useScheduledReports() {
    return useQuery({
        queryKey: reportsKeys.scheduled(),
        queryFn: () => reportsApi.getScheduledReports(),
        staleTime: 60 * 1000,
    })
}

// ============================================================================
// Create Scheduled Report Mutation
// ============================================================================

export function useCreateScheduledReport() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (request: CreateScheduledReportRequest) => reportsApi.createScheduledReport(request),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: reportsKeys.scheduled() })
            toast.success('Scheduled report created')
        },
        onError: () => {
            toast.error('Failed to create scheduled report')
        },
    })
}

// ============================================================================
// Delete Scheduled Report Mutation
// ============================================================================

export function useDeleteScheduledReport() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (scheduleId: string) => reportsApi.deleteScheduledReport(scheduleId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: reportsKeys.scheduled() })
            toast.success('Scheduled report deleted')
        },
        onError: () => {
            toast.error('Failed to delete scheduled report')
        },
    })
}
