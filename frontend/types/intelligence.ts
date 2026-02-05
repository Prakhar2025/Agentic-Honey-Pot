export type EntityType =
    | 'PHONE_NUMBER'
    | 'UPI_ID'
    | 'BANK_ACCOUNT'
    | 'IFSC_CODE'
    | 'EMAIL'
    | 'URL'
    | 'CRYPTO_WALLET'

export interface ExtractedEntity {
    type: EntityType
    value: string
    confidence: number
    extracted_at: string
    metadata?: Record<string, unknown>
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

export interface IntelligenceSummary {
    total_entities: number
    by_type: Record<EntityType, number>
    recent_entities: ExtractedEntity[]
}
