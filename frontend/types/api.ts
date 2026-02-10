// API request/response types for honeypot endpoints

// Engage Request
export interface EngageRequest {
    scammerMessage: string
    persona?: string
    context?: {
        channel?: string
        claimed_identity?: string
    }
}

// Engage Response
export interface EngageResponse {
    session_id: string
    response: string
    persona_used: string
    scam_detected: {
        is_scam: boolean
        scam_type: string
        confidence: number
        risk_level: string
    }
    entities_extracted: Array<{
        type: string
        value: string
        confidence: number
    }>
    session_state: string
    turn_count: number
    created_at: string
}

// Continue Request
export interface ContinueRequest {
    sessionId: string
    scammerMessage: string
}

// Continue Response (same structure as Engage)
export interface ContinueResponse extends EngageResponse { }

// Session Detail Response
export interface SessionDetailResponse {
    session_id: string
    status: 'ACTIVE' | 'COMPLETED' | 'FAILED'
    persona_used: string
    scam_type: string
    risk_level: string
    turn_count: number
    messages: Array<{
        id: string
        role: 'scammer' | 'victim'
        content: string
        timestamp: string
        entities_extracted?: Array<{
            type: string
            value: string
        }>
    }>
    intelligence: Array<{
        id: string
        type: string
        value: string
        confidence: number
        verified: boolean
    }>
    analytics: {
        duration_seconds: number
        avg_response_time: number
        entities_per_turn: number
    }
    created_at: string
    updated_at: string
}

// Delete Session Response
export interface DeleteSessionResponse {
    message: string
    session_id: string
    final_status: string
    summary: {
        total_turns: number
        entities_extracted: number
        duration_seconds: number
    }
}

// Sessions List Response
export interface SessionsListResponse {
    sessions: Array<{
        id: string
        status: string
        persona: string
        scam_type: string
        risk_level: string
        turn_count: number
        entities_count: number
        created_at: string
        updated_at: string
    }>
    total: number
    limit: number
    offset: number
    has_more: boolean
}

// Session Intelligence Response
export interface SessionIntelligenceResponse {
    session_id: string
    entities: Array<{
        id: string
        type: string
        value: string
        confidence: number
        verified: boolean
        first_seen: string
        occurrence_count: number
    }>
    summary: {
        total: number
        by_type: Record<string, number>
        high_confidence: number
    }
}

// Health Response
export interface HealthResponse {
    status: 'healthy' | 'degraded' | 'unhealthy'
    timestamp: string
}

// Alias for backward compatibility
export type HealthCheck = HealthResponse
