// Session Types
export type SessionStatus =
    | 'INITIAL'
    | 'ONGOING'
    | 'COMPLETED'
    | 'TERMINATED'
    | 'MAX_TURNS_REACHED'
    | 'SAFETY_EXIT'

export type ScamType =
    | 'KYC_FRAUD'
    | 'LOTTERY_SCAM'
    | 'TECH_SUPPORT'
    | 'INVESTMENT_FRAUD'
    | 'JOB_SCAM'
    | 'LOAN_SCAM'
    | 'OTP_FRAUD'
    | 'UNKNOWN'

export type SourceType = 'sms' | 'whatsapp' | 'email' | 'chat'

export interface Session {
    id: string
    scam_type: ScamType | null
    persona_id: string
    status: SessionStatus
    is_scam: boolean
    source_type: SourceType | null
    turn_count: number
    metadata_json: Record<string, unknown> | null
    started_at: string
    ended_at: string | null
    created_at: string
    updated_at: string
}

export interface Message {
    id: string
    session_id: string
    role: 'scammer' | 'agent'
    content: string
    turn_number: number
    metadata_json: Record<string, unknown> | null
    created_at: string
}

export interface SessionWithMessages extends Session {
    messages: Message[]
}
