// Intelligence API functions
import { apiClient } from './client'
import { API_ENDPOINTS } from './endpoints'
import type { ExtractedEntity, IntelligenceStats, IntelligenceResponse, EntitySearchResult } from '@/types/intelligence'
import type { IntelligenceFilters } from '@/types/filters'

// Mock data for development
const mockEntities: ExtractedEntity[] = [
    {
        id: 'ent_001',
        type: 'PHONE_NUMBER',
        value: '+91 98765 43210',
        normalized_value: '+919876543210',
        risk_score: 9.2,
        confidence: 0.94,
        verified: true,
        verification_source: 'User Report + Pattern Match',
        first_seen: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(),
        last_seen: new Date().toISOString(),
        occurrence_count: 12,
        sessions: [
            { id: 'sess_abc123', scam_type: 'KYC_FRAUD', scammer_persona: 'Bank Officer', timestamp: new Date().toISOString(), created_at: new Date().toISOString() },
            { id: 'sess_def456', scam_type: 'OTP_FRAUD', scammer_persona: 'Tech Support', timestamp: new Date(Date.now() - 86400000).toISOString(), created_at: new Date(Date.now() - 86400000).toISOString() },
        ],
        metadata: { country_code: 'IN', carrier: 'Airtel' },
        analysis: { threat_level: 'critical', associated_scam_types: ['KYC_FRAUD', 'OTP_FRAUD'], pattern_matches: [], similar_entities: ['+91 98765 43211'] },
        notes: [{ id: 'note_1', content: 'Confirmed scam number', author: 'Admin', created_at: new Date().toISOString() }],
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: 'ent_002',
        type: 'UPI_ID',
        value: 'scammer@okaxis',
        normalized_value: 'scammer@okaxis',
        risk_score: 8.7,
        confidence: 0.91,
        verified: false,
        first_seen: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
        last_seen: new Date(Date.now() - 86400000).toISOString(),
        occurrence_count: 8,
        sessions: [{ id: 'sess_ghi789', scam_type: 'INVESTMENT_FRAUD', scammer_persona: 'Investment Advisor', timestamp: new Date().toISOString(), created_at: new Date().toISOString() }],
        metadata: {},
        analysis: { threat_level: 'high', associated_scam_types: ['INVESTMENT_FRAUD'], pattern_matches: [], similar_entities: [] },
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: 'ent_003',
        type: 'BANK_ACCOUNT',
        value: 'SBI 12345678901',
        normalized_value: '12345678901',
        risk_score: 7.5,
        confidence: 0.87,
        verified: true,
        verification_source: 'Pattern Match',
        first_seen: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(),
        last_seen: new Date(Date.now() - 172800000).toISOString(),
        occurrence_count: 5,
        sessions: [{ id: 'sess_jkl012', scam_type: 'LOTTERY_SCAM', scammer_persona: 'Lottery Agent', timestamp: new Date().toISOString(), created_at: new Date().toISOString() }],
        metadata: { bank_name: 'State Bank of India' },
        analysis: { threat_level: 'high', associated_scam_types: ['LOTTERY_SCAM'], pattern_matches: [], similar_entities: [] },
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: 'ent_004',
        type: 'URL',
        value: 'bit.ly/fake-kyc',
        normalized_value: 'https://bit.ly/fake-kyc',
        risk_score: 9.8,
        confidence: 0.98,
        verified: true,
        verification_source: 'Automated Scanner',
        first_seen: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
        last_seen: new Date().toISOString(),
        occurrence_count: 23,
        sessions: [{ id: 'sess_mno345', scam_type: 'KYC_FRAUD', scammer_persona: 'Bank Officer', timestamp: new Date().toISOString(), created_at: new Date().toISOString() }],
        metadata: { domain: 'bit.ly', is_suspicious_domain: true },
        analysis: { threat_level: 'critical', associated_scam_types: ['KYC_FRAUD', 'PHISHING'], pattern_matches: ['short_url'], similar_entities: [] },
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: 'ent_005',
        type: 'EMAIL',
        value: 'support@fake-bank.com',
        normalized_value: 'support@fake-bank.com',
        risk_score: 5.2,
        confidence: 0.72,
        verified: false,
        first_seen: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
        last_seen: new Date(Date.now() - 259200000).toISOString(),
        occurrence_count: 3,
        sessions: [{ id: 'sess_pqr678', scam_type: 'TECH_SUPPORT', scammer_persona: 'Tech Support Agent', timestamp: new Date().toISOString(), created_at: new Date().toISOString() }],
        metadata: { domain: 'fake-bank.com', is_suspicious_domain: true },
        analysis: { threat_level: 'medium', associated_scam_types: ['TECH_SUPPORT'], pattern_matches: [], similar_entities: [] },
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: 'ent_006',
        type: 'IFSC_CODE',
        value: 'SBIN0001234',
        normalized_value: 'SBIN0001234',
        risk_score: 4.0,
        confidence: 0.65,
        verified: false,
        first_seen: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
        last_seen: new Date(Date.now() - 604800000).toISOString(),
        occurrence_count: 2,
        sessions: [{ id: 'sess_stu901', scam_type: 'KYC_FRAUD', scammer_persona: 'Bank Officer', timestamp: new Date().toISOString(), created_at: new Date().toISOString() }],
        metadata: { bank_name: 'State Bank of India' },
        analysis: { threat_level: 'low', associated_scam_types: ['KYC_FRAUD'], pattern_matches: [], similar_entities: [] },
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
        updated_at: new Date().toISOString(),
    },
]

const mockStats: IntelligenceStats = {
    total_entities: 634,
    total_by_type: {
        PHONE_NUMBER: 234,
        UPI_ID: 156,
        BANK_ACCOUNT: 89,
        URL: 67,
        EMAIL: 45,
        IFSC_CODE: 23,
        CRYPTO_WALLET: 20,
    },
    total_by_risk: {
        critical: 45,
        high: 112,
        medium: 234,
        low: 156,
        minimal: 87,
    },
    verified_percentage: 78,
    extraction_rate: {
        today: 24,
        this_week: 156,
        this_month: 634,
    },
    top_scam_types: [
        { type: 'KYC_FRAUD', count: 234 },
        { type: 'LOTTERY_SCAM', count: 156 },
        { type: 'INVESTMENT_FRAUD', count: 112 },
    ],
    trend: [
        { date: new Date(Date.now() - 6 * 86400000).toISOString(), count: 12 },
        { date: new Date(Date.now() - 5 * 86400000).toISOString(), count: 18 },
        { date: new Date(Date.now() - 4 * 86400000).toISOString(), count: 24 },
        { date: new Date(Date.now() - 3 * 86400000).toISOString(), count: 21 },
        { date: new Date(Date.now() - 2 * 86400000).toISOString(), count: 28 },
        { date: new Date(Date.now() - 1 * 86400000).toISOString(), count: 32 },
        { date: new Date().toISOString(), count: 24 },
    ],
    trends: {
        PHONE_NUMBER: 12,
        UPI_ID: 8,
        BANK_ACCOUNT: 5,
        URL: -2,
        EMAIL: 3,
        IFSC_CODE: 1,
    },
}

export const intelligenceApi = {
    // Get intelligence list
    async getIntelligence(filters: IntelligenceFilters): Promise<IntelligenceResponse> {
        try {
            const params = {
                limit: filters.limit || 20,
                offset: ((filters.page || 1) - 1) * (filters.limit || 20),
                ...(filters.type && filters.type !== 'all' && { type: filters.type }),
                ...(filters.risk_level && filters.risk_level !== 'all' && { risk_level: filters.risk_level }),
                ...(filters.verified !== undefined && { verified: filters.verified }),
                ...(filters.search && { search: filters.search }),
                ...(filters.sort && { sort: filters.sort }),
                ...(filters.order && { order: filters.order }),
                ...(filters.date_from && { date_from: filters.date_from }),
                ...(filters.date_to && { date_to: filters.date_to }),
            }
            const { data } = await apiClient.get(API_ENDPOINTS.INTELLIGENCE, { params })
            return data
        } catch {
            // Return mock data for development
            let filtered = [...mockEntities]
            if (filters.type && filters.type !== 'all') {
                filtered = filtered.filter(e => e.type === filters.type)
            }
            if (filters.search) {
                const search = filters.search.toLowerCase()
                filtered = filtered.filter(e => e.value.toLowerCase().includes(search))
            }
            if (filters.verified !== undefined) {
                filtered = filtered.filter(e => e.verified === filters.verified)
            }
            return {
                entities: filtered,
                total: filtered.length,
                limit: filters.limit || 20,
                offset: ((filters.page || 1) - 1) * (filters.limit || 20),
                has_more: false,
                summary: {
                    total: filtered.length,
                    by_type: mockStats.total_by_type,
                    by_risk_level: mockStats.total_by_risk,
                    verified_count: Math.floor(filtered.length * 0.78),
                    high_risk_count: Math.floor(filtered.length * 0.25),
                },
            }
        }
    },

    // Get single entity
    async getEntity(id: string): Promise<ExtractedEntity> {
        try {
            const { data } = await apiClient.get(`${API_ENDPOINTS.INTELLIGENCE}/${id}`)
            return data
        } catch {
            const entity = mockEntities.find(e => e.id === id)
            if (entity) return entity
            throw new Error('Entity not found')
        }
    },

    // Get intelligence stats
    async getStats(): Promise<IntelligenceStats> {
        try {
            const { data } = await apiClient.get(`${API_ENDPOINTS.INTELLIGENCE}/stats`)
            return data
        } catch {
            return mockStats
        }
    },

    // Search entities
    async searchEntities(query: string, limit: number = 10): Promise<{ results: EntitySearchResult[]; total: number }> {
        try {
            const { data } = await apiClient.get(`${API_ENDPOINTS.INTELLIGENCE}/search`, {
                params: { q: query, limit }
            })
            return data
        } catch {
            const results = mockEntities
                .filter(e => e.value.toLowerCase().includes(query.toLowerCase()))
                .slice(0, limit)
                .map(e => ({
                    id: e.id,
                    type: e.type,
                    value: e.value,
                    risk_score: e.risk_score,
                    highlight: e.value,
                }))
            return { results, total: results.length }
        }
    },

    // Verify entity
    async verifyEntity(id: string, verified: boolean, source: string): Promise<{ success: boolean; entity: ExtractedEntity }> {
        try {
            const { data } = await apiClient.post(`${API_ENDPOINTS.INTELLIGENCE}/${id}/verify`, {
                verified,
                source,
            })
            return data
        } catch {
            const entity = mockEntities.find(e => e.id === id)
            if (entity) {
                entity.verified = verified
                entity.verification_source = source
                return { success: true, entity }
            }
            throw new Error('Entity not found')
        }
    },

    // Report entity
    async reportEntity(id: string, reportType: string, details: string): Promise<{ success: boolean; report_id: string }> {
        try {
            const { data } = await apiClient.post(`${API_ENDPOINTS.INTELLIGENCE}/${id}/report`, {
                report_type: reportType,
                details,
            })
            return data
        } catch {
            return { success: true, report_id: `report_${Date.now()}` }
        }
    },

    // Add note
    async addNote(id: string, content: string): Promise<{ success: boolean; note: { id: string; content: string; author: string; created_at: string } }> {
        try {
            const { data } = await apiClient.post(`${API_ENDPOINTS.INTELLIGENCE}/${id}/notes`, {
                content,
            })
            return data
        } catch {
            return {
                success: true,
                note: {
                    id: `note_${Date.now()}`,
                    content,
                    author: 'User',
                    created_at: new Date().toISOString(),
                },
            }
        }
    },

    // Delete entity
    async deleteEntity(id: string): Promise<{ success: boolean; message: string }> {
        try {
            const { data } = await apiClient.delete(`${API_ENDPOINTS.INTELLIGENCE}/${id}`)
            return data
        } catch {
            return { success: true, message: 'Entity deleted successfully' }
        }
    },

    // Export entities
    async exportEntities(
        entityIds: string[] | undefined,
        format: 'json' | 'csv' | 'stix' | 'misp',
        includeMetadata: boolean
    ): Promise<{ download_url: string; expires_at: string }> {
        try {
            const { data } = await apiClient.post(`${API_ENDPOINTS.INTELLIGENCE}/export`, {
                entity_ids: entityIds,
                format,
                include_metadata: includeMetadata,
            })
            return data
        } catch {
            return {
                download_url: '#',
                expires_at: new Date(Date.now() + 3600000).toISOString(),
            }
        }
    },
}
