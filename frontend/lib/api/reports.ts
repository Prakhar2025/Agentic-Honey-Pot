// Reports API Functions with Mock Data
import apiClient from './client'
import type {
    Report,
    ReportsListResponse,
    GenerateReportRequest,
    GenerateReportResponse,
    ReportType,
    ReportStatus,
} from '@/types/analytics'

export interface ReportsQueryParams {
    type?: ReportType
    status?: ReportStatus
    page?: number
    limit?: number
}

export const reportsApi = {
    // Get list of reports
    async getReports(params?: ReportsQueryParams): Promise<ReportsListResponse> {
        try {
            const response = await apiClient.get('/v1/reports', { params })
            return response.data
        } catch {
            return MOCK_REPORTS_LIST
        }
    },

    // Get single report
    async getReport(reportId: string): Promise<Report> {
        try {
            const response = await apiClient.get(`/v1/reports/${reportId}`)
            return response.data
        } catch {
            const report = MOCK_REPORTS_LIST.reports.find(r => r.id === reportId)
            if (!report) throw new Error('Report not found')
            return report
        }
    },

    // Generate new report
    async generateReport(request: GenerateReportRequest): Promise<GenerateReportResponse> {
        try {
            const response = await apiClient.post('/v1/reports/generate', request)
            return response.data
        } catch {
            // Simulate report generation
            return {
                report_id: `rpt_${Date.now()}`,
                status: 'pending',
                estimated_time: 30,
            }
        }
    },

    // Download report
    async downloadReport(reportId: string): Promise<Blob> {
        try {
            const response = await apiClient.get(`/v1/reports/${reportId}/download`, {
                responseType: 'blob',
            })
            return response.data
        } catch {
            throw new Error('Failed to download report')
        }
    },

    // Delete report
    async deleteReport(reportId: string): Promise<void> {
        try {
            await apiClient.delete(`/v1/reports/${reportId}`)
        } catch {
            // No-op for mock
        }
    },

    // Get scheduled reports
    async getScheduledReports(): Promise<ScheduledReport[]> {
        try {
            const response = await apiClient.get('/v1/reports/scheduled')
            return response.data
        } catch {
            return MOCK_SCHEDULED_REPORTS
        }
    },

    // Create scheduled report
    async createScheduledReport(request: CreateScheduledReportRequest): Promise<ScheduledReport> {
        try {
            const response = await apiClient.post('/v1/reports/scheduled', request)
            return response.data
        } catch {
            return {
                id: `sch_${Date.now()}`,
                name: request.name,
                type: request.type,
                schedule: request.schedule,
                format: request.format,
                recipients: request.recipients,
                sections: request.sections,
                enabled: true,
                next_run: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
                created_at: new Date().toISOString(),
            }
        }
    },

    // Delete scheduled report
    async deleteScheduledReport(scheduleId: string): Promise<void> {
        try {
            await apiClient.delete(`/v1/reports/scheduled/${scheduleId}`)
        } catch {
            // No-op for mock
        }
    },
}

// Additional types for scheduled reports
export interface ScheduledReport {
    id: string
    name: string
    type: ReportType
    schedule: 'daily' | 'weekly' | 'monthly'
    format: 'pdf' | 'xlsx' | 'csv'
    recipients: string[]
    sections: string[]
    enabled: boolean
    next_run: string
    last_run?: string
    created_at: string
}

export interface CreateScheduledReportRequest {
    name: string
    type: ReportType
    schedule: 'daily' | 'weekly' | 'monthly'
    format: 'pdf' | 'xlsx' | 'csv'
    recipients: string[]
    sections: string[]
}

// Mock Data
const MOCK_REPORTS_LIST: ReportsListResponse = {
    reports: [
        {
            id: 'rpt_001',
            name: 'Weekly Intelligence Report',
            type: 'weekly',
            status: 'generated',
            created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            download_url: '/api/reports/rpt_001/download',
            expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            file_size: 2457600,
        },
        {
            id: 'rpt_002',
            name: 'Daily Summary - Feb 8',
            type: 'daily',
            status: 'generated',
            created_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
            download_url: '/api/reports/rpt_002/download',
            expires_at: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
            file_size: 1234567,
        },
        {
            id: 'rpt_003',
            name: 'Monthly Analytics - January 2026',
            type: 'monthly',
            status: 'generated',
            created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            download_url: '/api/reports/rpt_003/download',
            expires_at: new Date(Date.now() + 23 * 24 * 60 * 60 * 1000).toISOString(),
            file_size: 5678901,
        },
        {
            id: 'rpt_004',
            name: 'Custom Report - Scam Analysis',
            type: 'custom',
            status: 'pending',
            created_at: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
        },
    ],
}

const MOCK_SCHEDULED_REPORTS: ScheduledReport[] = [
    {
        id: 'sch_001',
        name: 'Daily Executive Summary',
        type: 'daily',
        schedule: 'daily',
        format: 'pdf',
        recipients: ['admin@scamshield.app', 'team@scamshield.app'],
        sections: ['executive_summary', 'sessions_analysis', 'scam_types'],
        enabled: true,
        next_run: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
        last_run: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 'sch_002',
        name: 'Weekly Intelligence Digest',
        type: 'weekly',
        schedule: 'weekly',
        format: 'pdf',
        recipients: ['leadership@scamshield.app'],
        sections: ['executive_summary', 'sessions_analysis', 'scam_types', 'persona_performance', 'geographic_distribution', 'recommendations'],
        enabled: true,
        next_run: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        last_run: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    },
]

export default reportsApi
