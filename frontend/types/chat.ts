// Chat TypeScript type definitions

export interface SessionInfo {
    id: string
    status: 'ACTIVE' | 'COMPLETED' | 'FAILED'
    persona_used: string
    scam_type: string
    risk_level: string
    turn_count: number
    created_at?: string
    updated_at?: string
}

export interface ScamDetection {
    is_scam: boolean
    scam_type: string
    confidence: number
    risk_level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
    indicators?: string[]
}

export interface ExtractedEntity {
    id?: string
    type: 'PHONE_NUMBER' | 'UPI_ID' | 'BANK_ACCOUNT' | 'IFSC_CODE' | 'EMAIL' | 'URL' | 'CRYPTO_WALLET'
    value: string
    confidence: number
    verified?: boolean
    first_seen?: string
    occurrence_count?: number
}

export interface ChatSettings {
    soundEnabled: boolean
    autoScroll: boolean
    showEntities: boolean
    showTypingIndicator: boolean
    messageLimit: number
}

export interface StartSessionParams {
    scammerMessage: string
    persona?: string
    scenario?: string
    context?: {
        channel?: string
        claimed_identity?: string
    }
}
