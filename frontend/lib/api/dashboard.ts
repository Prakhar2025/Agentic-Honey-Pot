// Dashboard API functions
import { apiClient } from './client'
import { API_ENDPOINTS } from './endpoints'
import type {
    DashboardStats,
    TimelineData,
    ScamTypesData,
    DashboardSession,
    ThreatLevel,
    SystemHealth,
    IntelligenceSummary,
    ActivityItem,
} from '@/types/dashboard'

export const dashboardApi = {
    // Get dashboard statistics
    async getStats(): Promise<DashboardStats> {
        try {
            const { data } = await apiClient.get(API_ENDPOINTS.ANALYTICS_SUMMARY)
            // Add trend data (mock for now, would come from real API)
            return {
                ...data,
                sessions_trend: generateTrendData(7, data.total_sessions || 100),
                intelligence_trend: generateTrendData(7, data.total_intelligence || 50),
                previous_total_sessions: Math.floor((data.total_sessions || 100) * 0.9),
                previous_intelligence: Math.floor((data.total_intelligence || 50) * 0.92),
                previous_detection_rate: (data.scam_detection_rate || 90) - 2,
            }
        } catch (error) {
            // Return mock data for demo/development
            return getMockStats()
        }
    },

    // Get timeline data
    async getTimeline(range: string): Promise<TimelineData> {
        try {
            const { data } = await apiClient.get(API_ENDPOINTS.ANALYTICS_TIMELINE, {
                params: { range },
            })
            const totalSessions = data.data?.reduce((sum: number, d: any) => sum + d.sessions, 0) || 0
            const totalIntelligence = data.data?.reduce((sum: number, d: any) => sum + d.intelligence, 0) || 0
            return {
                data: data.data || [],
                totalSessions,
                totalIntelligence,
                avgPerDay: Math.round(totalSessions / (data.data?.length || 1)),
            }
        } catch (error) {
            return getMockTimeline(range)
        }
    },

    // Get scam types distribution
    async getScamTypes(): Promise<ScamTypesData> {
        try {
            const { data } = await apiClient.get(API_ENDPOINTS.ANALYTICS_SCAM_TYPES)
            return data
        } catch (error) {
            return getMockScamTypes()
        }
    },

    // Get recent sessions
    async getRecentSessions(limit: number): Promise<DashboardSession[]> {
        try {
            const { data } = await apiClient.get(API_ENDPOINTS.SESSIONS, {
                params: { limit, sort: '-created_at' },
            })
            return (data.sessions || data || []).map((session: any) => ({
                id: session.id || session.session_id,
                status: normalizeStatus(session.status),
                scam_type: session.scam_type || session.detected_scam_type || 'UNKNOWN',
                persona_used: session.persona_used || session.persona || 'unknown',
                turn_count: session.turn_count || 0,
                created_at: session.created_at || session.start_time || new Date().toISOString(),
                extracted_count: session.extracted_count || session.entities_count || 0,
            }))
        } catch (error) {
            return getMockSessions(limit)
        }
    },

    // Get threat level (computed from active sessions)
    async getThreatLevel(): Promise<ThreatLevel> {
        try {
            const { data } = await apiClient.get(API_ENDPOINTS.ANALYTICS_SUMMARY)
            const activeSessions = data.active_sessions || 0
            return {
                level: Math.min(10, Math.max(1, Math.floor(activeSessions / 3) + 2)),
                activeThreats: activeSessions,
                highRiskSessions: Math.floor(activeSessions * 0.4),
                change24h: Math.floor(Math.random() * 6) - 2,
            }
        } catch (error) {
            return { level: 5, activeThreats: 3, highRiskSessions: 1, change24h: 1 }
        }
    },

    // Get system health
    async getSystemHealth(): Promise<SystemHealth> {
        try {
            const { data } = await apiClient.get('/health/detailed')
            return {
                status: data.status || 'healthy',
                components: {
                    database: { status: data.components?.database?.status || 'healthy', latency_ms: data.components?.database?.latency_ms || 5 },
                    llm: { status: data.components?.llm?.status || 'healthy', latency_ms: data.components?.llm?.latency_ms || 150 },
                    api: { status: data.components?.api?.status || 'healthy', requests_per_minute: data.components?.api?.requests_per_minute || 120 },
                },
                uptime_seconds: data.uptime_seconds || 86400,
                uptime_percentage: 99.9,
                version: data.version || '1.0.0',
            }
        } catch (error) {
            return getMockHealth()
        }
    },

    // Get intelligence summary
    async getIntelligenceSummary(): Promise<IntelligenceSummary> {
        try {
            const { data } = await apiClient.get(API_ENDPOINTS.INTELLIGENCE)
            const entities = data.entities || data || []
            const byType = Object.entries(
                entities.reduce((acc: Record<string, number>, entity: any) => {
                    const type = entity.type || entity.entity_type || 'UNKNOWN'
                    acc[type] = (acc[type] || 0) + 1
                    return acc
                }, {})
            ).map(([type, count]) => ({ type, count: count as number }))
                .sort((a, b) => b.count - a.count)

            return {
                total: data.total || entities.length,
                by_type: byType,
            }
        } catch (error) {
            return getMockIntelligence()
        }
    },

    // Get activity feed
    async getActivityFeed(): Promise<ActivityItem[]> {
        try {
            const { data } = await apiClient.get(API_ENDPOINTS.SESSIONS, {
                params: { limit: 15, sort: '-created_at' },
            })
            const sessions = data.sessions || data || []
            return sessions.map((session: any, index: number) => ({
                id: `${session.id || session.session_id}-${index}`,
                type: getActivityType(session.status),
                details: `${session.scam_type || 'Scam'} - ${session.persona_used || 'Agent'}`,
                timestamp: session.created_at || session.start_time || new Date().toISOString(),
                session_id: session.id || session.session_id,
            }))
        } catch (error) {
            return getMockActivity()
        }
    },
}

// Helper functions
function normalizeStatus(status: string): 'active' | 'completed' | 'failed' | 'ongoing' | 'terminated' {
    const normalized = status?.toLowerCase() || 'active'
    if (['ongoing', 'active', 'in_progress'].includes(normalized)) return 'active'
    if (['completed', 'done', 'finished'].includes(normalized)) return 'completed'
    if (['failed', 'error'].includes(normalized)) return 'failed'
    if (['terminated', 'stopped'].includes(normalized)) return 'terminated'
    return 'active'
}

function getActivityType(status: string): ActivityItem['type'] {
    const normalized = status?.toLowerCase() || ''
    if (['ongoing', 'active', 'initial'].includes(normalized)) return 'session_started'
    if (['completed', 'done'].includes(normalized)) return 'session_completed'
    if (['failed', 'error', 'terminated'].includes(normalized)) return 'session_failed'
    return 'session_started'
}

function generateTrendData(points: number, base: number): number[] {
    const data: number[] = []
    let value = Math.floor(base * 0.7)
    for (let i = 0; i < points; i++) {
        value = Math.max(0, value + Math.floor(Math.random() * 20) - 8)
        data.push(value)
    }
    data[data.length - 1] = base
    return data
}

// Mock data functions for development/demo
function getMockStats(): DashboardStats {
    return {
        total_sessions: 1247,
        previous_total_sessions: 1112,
        active_sessions: 23,
        completed_sessions: 1180,
        total_intelligence: 3891,
        previous_intelligence: 3590,
        scam_detection_rate: 94.2,
        previous_detection_rate: 92.1,
        avg_session_duration: 324,
        total_entities_extracted: 3891,
        sessions_trend: [45, 52, 48, 61, 55, 67, 72],
        intelligence_trend: [120, 135, 128, 142, 156, 167, 180],
    }
}

function getMockTimeline(range: string): TimelineData {
    const days = range === '24h' ? 24 : range === '7d' ? 7 : range === '30d' ? 30 : 90
    const data = Array.from({ length: days }, (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() - (days - i - 1))
        return {
            date: date.toISOString().split('T')[0],
            sessions: Math.floor(Math.random() * 50) + 10,
            intelligence: Math.floor(Math.random() * 100) + 30,
        }
    })
    const totalSessions = data.reduce((sum, d) => sum + d.sessions, 0)
    const totalIntelligence = data.reduce((sum, d) => sum + d.intelligence, 0)
    return { data, totalSessions, totalIntelligence, avgPerDay: Math.round(totalSessions / days) }
}

function getMockScamTypes(): ScamTypesData {
    return {
        distribution: [
            { scam_type: 'KYC_FRAUD', count: 423, percentage: 34 },
            { scam_type: 'LOTTERY_SCAM', count: 287, percentage: 23 },
            { scam_type: 'INVESTMENT_FRAUD', count: 198, percentage: 16 },
            { scam_type: 'TECH_SUPPORT', count: 156, percentage: 12 },
            { scam_type: 'JOB_SCAM', count: 89, percentage: 7 },
            { scam_type: 'OTP_FRAUD', count: 54, percentage: 4 },
            { scam_type: 'LOAN_SCAM', count: 40, percentage: 4 },
        ],
    }
}

function getMockSessions(limit: number): DashboardSession[] {
    const types = ['KYC_FRAUD', 'LOTTERY_SCAM', 'TECH_SUPPORT', 'INVESTMENT_FRAUD', 'OTP_FRAUD']
    const personas = ['elderly_victim', 'tech_novice', 'eager_investor', 'busy_professional']
    const statuses: Array<'active' | 'completed' | 'failed'> = ['active', 'completed', 'completed', 'completed', 'failed']

    return Array.from({ length: limit }, (_, i) => ({
        id: `sess_${Math.random().toString(36).substr(2, 9)}`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        scam_type: types[Math.floor(Math.random() * types.length)],
        persona_used: personas[Math.floor(Math.random() * personas.length)],
        turn_count: Math.floor(Math.random() * 15) + 1,
        created_at: new Date(Date.now() - i * 300000).toISOString(),
        extracted_count: Math.floor(Math.random() * 8),
    }))
}

function getMockHealth(): SystemHealth {
    return {
        status: 'healthy',
        components: {
            database: { status: 'healthy', latency_ms: 5 },
            llm: { status: 'healthy', latency_ms: 150 },
            api: { status: 'healthy', requests_per_minute: 120 },
        },
        uptime_seconds: 864000,
        uptime_percentage: 99.9,
        version: '1.0.0',
    }
}

function getMockIntelligence(): IntelligenceSummary {
    return {
        total: 567,
        by_type: [
            { type: 'PHONE_NUMBER', count: 234 },
            { type: 'UPI_ID', count: 156 },
            { type: 'BANK_ACCOUNT', count: 89 },
            { type: 'URL', count: 67 },
            { type: 'EMAIL', count: 21 },
        ],
    }
}

function getMockActivity(): ActivityItem[] {
    const types: ActivityItem['type'][] = ['session_started', 'session_completed', 'intelligence_extracted', 'threat_elevated']
    return Array.from({ length: 10 }, (_, i) => ({
        id: `activity_${i}`,
        type: types[Math.floor(Math.random() * types.length)],
        details: ['KYC Fraud detected', 'UPI ID extracted', 'Session completed', 'New scammer engaged'][Math.floor(Math.random() * 4)],
        timestamp: new Date(Date.now() - i * 60000).toISOString(),
    }))
}

export default dashboardApi
