import apiClient from './client'
import { API_ENDPOINTS } from './endpoints'
import type { ScamType, SourceType, Session, SessionIntelligence } from '@/types'

export interface EngageRequest {
    scammer_message: string
    source_type?: SourceType
    persona?: string
}

export interface EngageResponse {
    session_id: string
    response: string
    persona_used: string
    scam_type: ScamType | null
    confidence: number
    extracted_intelligence: {
        phone_numbers: string[]
        upi_ids: string[]
        bank_accounts: string[]
        phishing_links: string[]
    }
    turn_number: number
    session_status: string
    should_continue: boolean
}

export interface ContinueRequest {
    session_id: string
    scammer_message: string
}

export interface ContinueResponse extends EngageResponse { }

export async function engageScammer(request: EngageRequest): Promise<EngageResponse> {
    const response = await apiClient.post(API_ENDPOINTS.ENGAGE, request)
    return response.data
}

export async function continueConversation(request: ContinueRequest): Promise<ContinueResponse> {
    const response = await apiClient.post(API_ENDPOINTS.CONTINUE, request)
    return response.data
}

export async function getSessionIntelligence(sessionId: string): Promise<SessionIntelligence> {
    const response = await apiClient.get(API_ENDPOINTS.SESSION_INTELLIGENCE(sessionId))
    return response.data
}
