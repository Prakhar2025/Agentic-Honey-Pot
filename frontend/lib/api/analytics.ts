// Comprehensive Analytics API Functions with Mock Data Fallbacks
import apiClient from './client'
import { API_ENDPOINTS } from './endpoints'
import type {
    AnalyticsOverviewResponse,
    SessionsOverTimeResponse,
    ScamTypeDistributionResponse,
    PersonaEffectivenessResponse,
    EntityExtractionResponse,
    GeographicDistributionResponse,
    HourlyActivityResponse,
    RiskDistributionResponse,
    LLMPerformanceResponse,
    DetectionFunnelResponse,
    AnalyticsParams,
    AnalyticsSummary,
    ScamTypeDistribution,
    TimelineData,
    PersonaUsage,
} from '@/types/analytics'

// ============================================================================
// Legacy API Functions (Backward Compatibility)
// ============================================================================

export interface TimelineParams {
    days?: number
    start_date?: string
    end_date?: string
}

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
    try {
        const response = await apiClient.get(API_ENDPOINTS.ANALYTICS_SUMMARY)
        return response.data
    } catch {
        return MOCK_OVERVIEW.summary
    }
}

export async function getScamTypeDistribution(): Promise<ScamTypeDistribution[]> {
    try {
        const response = await apiClient.get(API_ENDPOINTS.ANALYTICS_SCAM_TYPES)
        return response.data
    } catch {
        return MOCK_SCAM_DISTRIBUTION.data
    }
}

export async function getTimeline(params?: TimelineParams): Promise<TimelineData[]> {
    try {
        const response = await apiClient.get(API_ENDPOINTS.ANALYTICS_TIMELINE, { params })
        return response.data
    } catch {
        return MOCK_TIMELINE
    }
}

export async function getPersonaUsage(): Promise<PersonaUsage[]> {
    try {
        const response = await apiClient.get(API_ENDPOINTS.ANALYTICS_PERSONAS)
        return response.data
    } catch {
        return MOCK_PERSONA_USAGE
    }
}

// ============================================================================
// Extended Analytics API (FAANG-level)
// ============================================================================

export const analyticsApi = {
    // Get overview with KPIs
    async getOverview(params: AnalyticsParams): Promise<AnalyticsOverviewResponse> {
        try {
            const response = await apiClient.get('/v1/analytics/overview', { params })
            return response.data
        } catch {
            return MOCK_OVERVIEW
        }
    },

    // Get sessions over time
    async getSessionsOverTime(params: AnalyticsParams): Promise<SessionsOverTimeResponse> {
        try {
            const response = await apiClient.get('/v1/analytics/sessions-over-time', { params })
            return response.data
        } catch {
            return generateMockSessionsOverTime(params)
        }
    },

    // Get scam type distribution
    async getScamTypeDistribution(params: AnalyticsParams): Promise<ScamTypeDistributionResponse> {
        try {
            const response = await apiClient.get('/v1/analytics/scam-type-distribution', { params })
            return response.data
        } catch {
            return MOCK_SCAM_DISTRIBUTION
        }
    },

    // Get persona effectiveness
    async getPersonaEffectiveness(params: AnalyticsParams): Promise<PersonaEffectivenessResponse> {
        try {
            const response = await apiClient.get('/v1/analytics/persona-effectiveness', { params })
            return response.data
        } catch {
            return MOCK_PERSONA_EFFECTIVENESS
        }
    },

    // Get entity extraction trends
    async getEntityExtraction(params: AnalyticsParams): Promise<EntityExtractionResponse> {
        try {
            const response = await apiClient.get('/v1/analytics/entity-extraction', { params })
            return response.data
        } catch {
            return generateMockEntityExtraction(params)
        }
    },

    // Get geographic distribution
    async getGeographicDistribution(params: AnalyticsParams): Promise<GeographicDistributionResponse> {
        try {
            const response = await apiClient.get('/v1/analytics/geographic-distribution', { params })
            return response.data
        } catch {
            return MOCK_GEOGRAPHIC
        }
    },

    // Get hourly activity heatmap
    async getHourlyActivity(params: AnalyticsParams): Promise<HourlyActivityResponse> {
        try {
            const response = await apiClient.get('/v1/analytics/hourly-activity', { params })
            return response.data
        } catch {
            return MOCK_HOURLY_ACTIVITY
        }
    },

    // Get risk distribution
    async getRiskDistribution(params: AnalyticsParams): Promise<RiskDistributionResponse> {
        try {
            const response = await apiClient.get('/v1/analytics/risk-distribution', { params })
            return response.data
        } catch {
            return MOCK_RISK_DISTRIBUTION
        }
    },

    // Get LLM performance metrics
    async getLLMPerformance(params: AnalyticsParams): Promise<LLMPerformanceResponse> {
        try {
            const response = await apiClient.get('/v1/analytics/llm-performance', { params })
            return response.data
        } catch {
            return MOCK_LLM_PERFORMANCE
        }
    },

    // Get detection funnel
    async getDetectionFunnel(params: AnalyticsParams): Promise<DetectionFunnelResponse> {
        try {
            const response = await apiClient.get('/v1/analytics/detection-funnel', { params })
            return response.data
        } catch {
            return MOCK_DETECTION_FUNNEL
        }
    },
}

// ============================================================================
// Mock Data for Development
// ============================================================================

const MOCK_OVERVIEW: AnalyticsOverviewResponse = {
    summary: {
        total_sessions: 1847,
        active_sessions: 23,
        completed_sessions: 1654,
        failed_sessions: 170,
        total_messages: 28456,
        total_entities: 4523,
        verified_entities: 3891,
        avg_session_duration: 754,
        avg_turns_per_session: 15.4,
        avg_entities_per_session: 2.45,
        success_rate: 89.5,
        scam_detection_rate: 94.2,
    },
    comparison: {
        sessions_change: 12.5,
        entities_change: 8.3,
        success_rate_change: 2.1,
        duration_change: -5.4,
        messages_change: 15.2,
    },
    period: {
        start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        end: new Date().toISOString(),
        days: 7,
    },
}

function generateMockSessionsOverTime(params: AnalyticsParams): SessionsOverTimeResponse {
    const days = 7
    const data = []
    const now = new Date()

    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(now)
        date.setDate(date.getDate() - i)

        const total = Math.floor(Math.random() * 100) + 150
        const completed = Math.floor(total * (0.8 + Math.random() * 0.15))
        const failed = Math.floor((total - completed) * 0.3)
        const active = total - completed - failed

        data.push({
            timestamp: date.toISOString(),
            total,
            active,
            completed,
            failed,
        })
    }

    return { data, total: data.reduce((sum, d) => sum + d.total, 0) }
}

const MOCK_SCAM_DISTRIBUTION: ScamTypeDistributionResponse = {
    data: [
        { scam_type: 'KYC_FRAUD', count: 456, percentage: 35.2, avg_turns: 18, avg_entities: 3.2, success_rate: 92, trend: 5.3 },
        { scam_type: 'LOTTERY_SCAM', count: 324, percentage: 25.0, avg_turns: 12, avg_entities: 2.1, success_rate: 88, trend: -2.1 },
        { scam_type: 'INVESTMENT_FRAUD', count: 259, percentage: 20.0, avg_turns: 22, avg_entities: 4.5, success_rate: 85, trend: 8.7 },
        { scam_type: 'TECH_SUPPORT', count: 156, percentage: 12.0, avg_turns: 15, avg_entities: 2.8, success_rate: 91, trend: 3.2 },
        { scam_type: 'OTHER', count: 101, percentage: 7.8, avg_turns: 10, avg_entities: 1.5, success_rate: 78, trend: -1.5 },
    ],
    total: 1296,
}

const MOCK_PERSONA_EFFECTIVENESS: PersonaEffectivenessResponse = {
    data: [
        { persona: 'elderly_victim', total_sessions: 456, completed_sessions: 421, success_rate: 92.3, avg_turns: 18.5, avg_entities: 3.2, avg_duration: 845, effectiveness_score: 94.5 },
        { persona: 'tech_novice', total_sessions: 389, completed_sessions: 342, success_rate: 87.9, avg_turns: 15.2, avg_entities: 2.8, avg_duration: 720, effectiveness_score: 88.2 },
        { persona: 'eager_investor', total_sessions: 312, completed_sessions: 265, success_rate: 84.9, avg_turns: 21.3, avg_entities: 4.1, avg_duration: 920, effectiveness_score: 82.5 },
        { persona: 'curious_user', total_sessions: 278, completed_sessions: 231, success_rate: 83.1, avg_turns: 12.8, avg_entities: 2.2, avg_duration: 560, effectiveness_score: 78.8 },
        { persona: 'confused_senior', total_sessions: 234, completed_sessions: 187, success_rate: 79.9, avg_turns: 16.4, avg_entities: 2.6, avg_duration: 680, effectiveness_score: 75.2 },
    ],
}

function generateMockEntityExtraction(params: AnalyticsParams): EntityExtractionResponse {
    const days = 7
    const data = []
    const now = new Date()

    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(now)
        date.setDate(date.getDate() - i)

        const phone = Math.floor(Math.random() * 50) + 80
        const upi = Math.floor(Math.random() * 40) + 60
        const bank = Math.floor(Math.random() * 30) + 40
        const url = Math.floor(Math.random() * 25) + 30
        const email = Math.floor(Math.random() * 20) + 20
        const ifsc = Math.floor(Math.random() * 15) + 10

        data.push({
            timestamp: date.toISOString(),
            PHONE_NUMBER: phone,
            UPI_ID: upi,
            BANK_ACCOUNT: bank,
            URL: url,
            EMAIL: email,
            IFSC_CODE: ifsc,
            total: phone + upi + bank + url + email + ifsc,
        })
    }

    return {
        data,
        summary: {
            total: data.reduce((sum, d) => sum + d.total, 0),
            by_type: {
                PHONE_NUMBER: data.reduce((sum, d) => sum + d.PHONE_NUMBER, 0),
                UPI_ID: data.reduce((sum, d) => sum + d.UPI_ID, 0),
                BANK_ACCOUNT: data.reduce((sum, d) => sum + d.BANK_ACCOUNT, 0),
                URL: data.reduce((sum, d) => sum + d.URL, 0),
                EMAIL: data.reduce((sum, d) => sum + d.EMAIL, 0),
                IFSC_CODE: data.reduce((sum, d) => sum + d.IFSC_CODE, 0),
            },
            high_confidence: Math.floor(data.reduce((sum, d) => sum + d.total, 0) * 0.78),
        },
    }
}

const MOCK_GEOGRAPHIC: GeographicDistributionResponse = {
    data: [
        { state: 'Maharashtra', state_code: 'MH', count: 312, percentage: 23.5, top_scam_types: ['KYC_FRAUD', 'INVESTMENT_FRAUD'] },
        { state: 'Delhi', state_code: 'DL', count: 234, percentage: 17.6, top_scam_types: ['LOTTERY_SCAM', 'KYC_FRAUD'] },
        { state: 'Karnataka', state_code: 'KA', count: 189, percentage: 14.2, top_scam_types: ['TECH_SUPPORT', 'KYC_FRAUD'] },
        { state: 'Tamil Nadu', state_code: 'TN', count: 156, percentage: 11.7, top_scam_types: ['KYC_FRAUD', 'LOTTERY_SCAM'] },
        { state: 'Gujarat', state_code: 'GJ', count: 134, percentage: 10.1, top_scam_types: ['INVESTMENT_FRAUD', 'KYC_FRAUD'] },
        { state: 'Uttar Pradesh', state_code: 'UP', count: 112, percentage: 8.4, top_scam_types: ['LOTTERY_SCAM', 'JOB_SCAM'] },
        { state: 'West Bengal', state_code: 'WB', count: 89, percentage: 6.7, top_scam_types: ['KYC_FRAUD', 'PHISHING'] },
        { state: 'Rajasthan', state_code: 'RJ', count: 67, percentage: 5.0, top_scam_types: ['LOTTERY_SCAM', 'ROMANCE_SCAM'] },
        { state: 'Others', state_code: 'OT', count: 36, percentage: 2.7, top_scam_types: ['OTHER'] },
    ],
    total: 1329,
}

const MOCK_HOURLY_ACTIVITY: HourlyActivityResponse = {
    data: (() => {
        const data = []
        for (let day = 0; day < 7; day++) {
            for (let hour = 0; hour < 24; hour++) {
                // Simulate realistic patterns
                let baseCount = 5
                if (hour >= 9 && hour <= 21) baseCount = 15 + Math.floor(Math.random() * 20)
                if (hour >= 14 && hour <= 18) baseCount = 25 + Math.floor(Math.random() * 25)
                if (day === 0 || day === 6) baseCount = Math.floor(baseCount * 0.6)

                data.push({
                    day,
                    hour,
                    count: baseCount,
                    avg_duration: 300 + Math.floor(Math.random() * 600),
                })
            }
        }
        return data
    })(),
}

const MOCK_RISK_DISTRIBUTION: RiskDistributionResponse = {
    data: [
        { range: '0-2', count: 156, percentage: 12.1 },
        { range: '2-4', count: 234, percentage: 18.2 },
        { range: '4-6', count: 389, percentage: 30.2 },
        { range: '6-8', count: 345, percentage: 26.8 },
        { range: '8-10', count: 164, percentage: 12.7 },
    ],
    avg_risk_score: 5.4,
    median_risk_score: 5.8,
}

const MOCK_LLM_PERFORMANCE: LLMPerformanceResponse = {
    total_calls: 28456,
    avg_latency_ms: 245,
    p95_latency_ms: 520,
    p99_latency_ms: 890,
    error_rate: 0.23,
    total_tokens: 1245678,
    total_cost_usd: 45.67,
    by_model: [
        { model: 'gpt-4o', calls: 18234, avg_latency: 280, tokens: 845632, cost: 32.45 },
        { model: 'gpt-4o-mini', calls: 8456, avg_latency: 180, tokens: 345678, cost: 10.22 },
        { model: 'claude-3-opus', calls: 1766, avg_latency: 320, tokens: 54368, cost: 3.00 },
    ],
}

const MOCK_DETECTION_FUNNEL: DetectionFunnelResponse = {
    stages: [
        { name: 'Incoming Messages', count: 15234, conversion_rate: 100 },
        { name: 'Scam Detected', count: 12456, conversion_rate: 81.8 },
        { name: 'Session Created', count: 9876, conversion_rate: 79.3 },
        { name: 'Engagement Started', count: 7543, conversion_rate: 76.4 },
        { name: 'Intel Extracted', count: 5234, conversion_rate: 69.4 },
        { name: 'Verified & Stored', count: 4123, conversion_rate: 78.8 },
    ],
}

const MOCK_TIMELINE: TimelineData[] = [
    { date: '2026-02-03', sessions: 156, messages: 2340, entities: 456 },
    { date: '2026-02-04', sessions: 178, messages: 2678, entities: 512 },
    { date: '2026-02-05', sessions: 189, messages: 2890, entities: 534 },
    { date: '2026-02-06', sessions: 167, messages: 2456, entities: 489 },
    { date: '2026-02-07', sessions: 198, messages: 2987, entities: 567 },
    { date: '2026-02-08', sessions: 212, messages: 3234, entities: 623 },
    { date: '2026-02-09', sessions: 187, messages: 2845, entities: 542 },
]

const MOCK_PERSONA_USAGE: PersonaUsage[] = [
    { persona_id: 'elderly_victim', count: 456, percentage: 27.3 },
    { persona_id: 'tech_novice', count: 389, percentage: 23.3 },
    { persona_id: 'eager_investor', count: 312, percentage: 18.7 },
    { persona_id: 'curious_user', count: 278, percentage: 16.6 },
    { persona_id: 'confused_senior', count: 234, percentage: 14.0 },
]

export default analyticsApi
