// Dashboard TypeScript types

export interface DashboardStats {
    total_sessions: number
    previous_total_sessions?: number
    active_sessions: number
    completed_sessions: number
    total_intelligence: number
    previous_intelligence?: number
    scam_detection_rate: number
    previous_detection_rate?: number
    avg_session_duration: number
    total_entities_extracted: number
    sessions_trend?: number[]
    intelligence_trend?: number[]
}

export interface TimelineDataPoint {
    date: string
    sessions: number
    intelligence: number
}

export interface TimelineData {
    data: TimelineDataPoint[]
    totalSessions: number
    totalIntelligence: number
    avgPerDay: number
}

export interface ScamTypeDistribution {
    scam_type: string
    count: number
    percentage: number
}

export interface ScamTypesData {
    distribution: ScamTypeDistribution[]
}

export interface ThreatLevel {
    level: number
    activeThreats: number
    highRiskSessions: number
    change24h: number
}

export interface ComponentHealth {
    status: 'healthy' | 'degraded' | 'unhealthy'
    latency_ms?: number
    requests_per_minute?: number
}

export interface SystemHealth {
    status: 'healthy' | 'degraded' | 'unhealthy'
    components: {
        database: ComponentHealth
        llm: ComponentHealth
        api: ComponentHealth
    }
    uptime_seconds: number
    uptime_percentage: number
    version: string
}

export interface EntitySummary {
    type: string
    count: number
}

export interface IntelligenceSummary {
    total: number
    by_type: EntitySummary[]
}

export interface ActivityItem {
    id: string
    type: 'session_started' | 'session_completed' | 'intelligence_extracted' | 'threat_elevated' | 'session_failed'
    details?: string
    timestamp: string
    session_id?: string
}

export interface DashboardSession {
    id: string
    status: 'active' | 'completed' | 'failed' | 'ongoing' | 'terminated'
    scam_type: string
    persona_used: string
    turn_count: number
    created_at: string
    extracted_count: number
}

export interface TimeRange {
    label: string
    value: string
    days: number
}

export const TIME_RANGES: TimeRange[] = [
    { label: '24H', value: '24h', days: 1 },
    { label: '7D', value: '7d', days: 7 },
    { label: '30D', value: '30d', days: 30 },
    { label: '90D', value: '90d', days: 90 },
]
