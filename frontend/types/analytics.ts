import type { ScamType } from './session'

export interface AnalyticsSummary {
    total_sessions: number
    active_sessions: number
    completed_sessions: number
    total_messages: number
    total_entities: number
    avg_turns_per_session: number
    scam_detection_rate: number
}

export interface ScamTypeDistribution {
    scam_type: ScamType
    count: number
    percentage: number
}

export interface TimelineData {
    date: string
    sessions: number
    messages: number
    entities: number
}

export interface PersonaUsage {
    persona_id: string
    count: number
    percentage: number
}

export interface DashboardStats {
    summary: AnalyticsSummary
    scam_distribution: ScamTypeDistribution[]
    timeline: TimelineData[]
    persona_usage: PersonaUsage[]
}
