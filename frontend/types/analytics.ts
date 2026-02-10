// Analytics TypeScript Types - Complete FAANG-level definitions
import type { ScamType } from './session'

// ============================================================================
// Core Analytics Types
// ============================================================================

export interface AnalyticsSummary {
    total_sessions: number
    active_sessions: number
    completed_sessions: number
    failed_sessions: number
    total_messages: number
    total_entities: number
    verified_entities: number
    avg_session_duration: number
    avg_turns_per_session: number
    avg_entities_per_session: number
    success_rate: number
    scam_detection_rate: number
}

export interface AnalyticsComparison {
    sessions_change: number
    entities_change: number
    success_rate_change: number
    duration_change: number
    messages_change: number
}

export interface AnalyticsPeriod {
    start: string
    end: string
    days: number
}

export interface AnalyticsOverviewResponse {
    summary: AnalyticsSummary
    comparison?: AnalyticsComparison
    period: AnalyticsPeriod
}

// ============================================================================
// Time Series Types
// ============================================================================

export interface TimeSeriesDataPoint {
    timestamp: string
    total: number
    active?: number
    completed?: number
    failed?: number
    [key: string]: number | string | undefined
}

export interface SessionsOverTimeResponse {
    data: TimeSeriesDataPoint[]
    total: number
}

export interface TimelineData {
    date: string
    sessions: number
    messages: number
    entities: number
}

// ============================================================================
// Scam Type Distribution
// ============================================================================

export interface ScamTypeDistribution {
    scam_type: ScamType | string
    count: number
    percentage: number
    avg_turns: number
    avg_entities: number
    success_rate: number
    trend: number
}

export interface ScamTypeDistributionResponse {
    data: ScamTypeDistribution[]
    total: number
}

// ============================================================================
// Persona Effectiveness
// ============================================================================

export interface PersonaUsage {
    persona_id: string
    count: number
    percentage: number
}

export interface PersonaEffectivenessData {
    persona: string
    persona_label?: string
    total_sessions: number
    completed_sessions: number
    success_rate: number
    avg_turns: number
    avg_entities: number
    avg_duration: number
    effectiveness_score: number
}

export interface PersonaEffectivenessResponse {
    data: PersonaEffectivenessData[]
}

// ============================================================================
// Entity Extraction
// ============================================================================

export interface EntityExtractionDataPoint {
    timestamp: string
    PHONE_NUMBER: number
    UPI_ID: number
    BANK_ACCOUNT: number
    URL: number
    EMAIL: number
    IFSC_CODE: number
    total: number
}

export interface EntityExtractionSummary {
    total: number
    by_type: Record<string, number>
    high_confidence: number
}

export interface EntityExtractionResponse {
    data: EntityExtractionDataPoint[]
    summary: EntityExtractionSummary
}

// ============================================================================
// Geographic Distribution
// ============================================================================

export interface GeographicData {
    state: string
    state_code: string
    count: number
    percentage: number
    top_scam_types: string[]
}

export interface GeographicDistributionResponse {
    data: GeographicData[]
    total: number
}

// ============================================================================
// Hourly Activity Heatmap
// ============================================================================

export interface HourlyActivityData {
    day: number  // 0-6 (Sunday-Saturday)
    hour: number // 0-23
    count: number
    avg_duration: number
}

export interface HourlyActivityResponse {
    data: HourlyActivityData[]
}

// ============================================================================
// Risk Distribution
// ============================================================================

export interface RiskDistributionData {
    range: string  // "0-2", "2-4", "4-6", "6-8", "8-10"
    count: number
    percentage: number
}

export interface RiskDistributionResponse {
    data: RiskDistributionData[]
    avg_risk_score: number
    median_risk_score: number
}

// ============================================================================
// LLM Performance
// ============================================================================

export interface LLMModelPerformance {
    model: string
    calls: number
    avg_latency: number
    tokens: number
    cost: number
}

export interface LLMPerformanceResponse {
    total_calls: number
    avg_latency_ms: number
    p95_latency_ms: number
    p99_latency_ms: number
    error_rate: number
    total_tokens: number
    total_cost_usd: number
    by_model: LLMModelPerformance[]
}

// ============================================================================
// Detection Funnel
// ============================================================================

export interface FunnelStage {
    name: string
    count: number
    conversion_rate: number
    color?: string
}

export interface DetectionFunnelResponse {
    stages: FunnelStage[]
}

// ============================================================================
// Report Types
// ============================================================================

export type ReportType = 'daily' | 'weekly' | 'monthly' | 'custom'
export type ReportStatus = 'pending' | 'generated' | 'failed'
export type ReportFormat = 'pdf' | 'xlsx' | 'csv'

export interface Report {
    id: string
    name: string
    type: ReportType
    status: ReportStatus
    created_at: string
    download_url?: string
    expires_at?: string
    file_size?: number
}

export interface ReportsListResponse {
    reports: Report[]
}

export interface GenerateReportRequest {
    type: ReportType
    name: string
    start_date: string
    end_date: string
    sections: string[]
    format: ReportFormat
    include_charts: boolean
}

export interface GenerateReportResponse {
    report_id: string
    status: 'pending'
    estimated_time: number
}

// ============================================================================
// Dashboard Stats (Legacy support)
// ============================================================================

export interface DashboardStats {
    summary: AnalyticsSummary
    scam_distribution: ScamTypeDistribution[]
    timeline: TimelineData[]
    persona_usage: PersonaUsage[]
}

// ============================================================================
// Query Parameter Types
// ============================================================================

export interface AnalyticsParams {
    start_date: string
    end_date: string
    granularity?: 'hour' | 'day' | 'week' | 'month'
    compare_previous?: boolean
    group_by?: 'status' | 'scam_type' | 'persona'
}
