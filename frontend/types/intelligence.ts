// Enhanced Intelligence Types for Intelligence Center

export type EntityType =
    | 'PHONE_NUMBER'
    | 'UPI_ID'
    | 'BANK_ACCOUNT'
    | 'IFSC_CODE'
    | 'EMAIL'
    | 'URL'
    | 'CRYPTO_WALLET'

export type IntelligenceRiskLevel = 'critical' | 'high' | 'medium' | 'low' | 'minimal'

export interface ExtractedEntity {
    id: string
    type: EntityType
    value: string
    normalized_value: string
    risk_score: number
    confidence: number
    verified: boolean
    verification_source?: string
    first_seen: string
    last_seen: string
    occurrence_count: number
    sessions?: Array<{
        id: string
        scam_type: string
        scammer_persona?: string
        timestamp: string
        created_at: string
    }>
    metadata?: {
        country_code?: string
        carrier?: string
        bank_name?: string
        domain?: string
        is_suspicious_domain?: boolean
        whois_data?: Record<string, unknown>
    }
    analysis?: {
        threat_level: string
        associated_scam_types: string[]
        pattern_matches: string[]
        similar_entities: string[]
    }
    notes?: EntityNote[]
    created_at: string
    updated_at: string
}

export interface EntityNote {
    id: string
    content: string
    author: string
    created_at: string
}

export interface SessionIntelligence {
    session_id: string
    bank_accounts: BankAccount[]
    upi_ids: UpiId[]
    phone_numbers: PhoneNumber[]
    phishing_links: PhishingLink[]
    other_intel: ExtractedEntity[]
    created_at: string
    updated_at: string
}

export interface BankAccount {
    account_number: string
    ifsc_code?: string
    bank_name?: string
    confidence: number
    extracted_at: string
}

export interface UpiId {
    id: string
    confidence: number
    extracted_at: string
}

export interface PhoneNumber {
    number: string
    confidence: number
    extracted_at: string
}

export interface PhishingLink {
    url: string
    domain?: string
    confidence: number
    extracted_at: string
}

export interface IntelligenceStats {
    total_entities: number
    total_by_type: Record<string, number>
    total_by_risk: Record<string, number>
    verified_percentage: number
    extraction_rate: {
        today: number
        this_week: number
        this_month: number
    }
    top_scam_types: Array<{ type: string; count: number }>
    trend: Array<{ date: string; count: number }>
    trends?: Record<string, number>
}

export interface IntelligenceResponse {
    entities: ExtractedEntity[]
    total: number
    limit: number
    offset: number
    has_more: boolean
    summary: {
        total: number
        by_type: Record<string, number>
        by_risk_level: Record<string, number>
        verified_count: number
        high_risk_count: number
    }
}

export interface EntitySearchResult {
    id: string
    type: string
    value: string
    risk_score: number
    highlight: string
}

export interface IntelligenceSummary {
    total_entities: number
    by_type: Record<EntityType, number>
    recent_entities: ExtractedEntity[]
}
