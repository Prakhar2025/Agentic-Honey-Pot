// Session and Intelligence Filter Types

export interface SessionFilters {
    status?: string
    scam_type?: string
    persona?: string
    search?: string
    sort?: 'created_at' | 'updated_at' | 'turn_count' | 'extracted_count'
    order?: 'asc' | 'desc'
    date_from?: string
    date_to?: string
    page?: number
    limit?: number
}

export interface IntelligenceFilters {
    type?: string
    risk_level?: string
    verified?: boolean
    search?: string
    sort?: 'created_at' | 'risk_score' | 'confidence' | 'frequency' | 'first_seen' | 'last_seen'
    order?: 'asc' | 'desc'
    date_from?: string
    date_to?: string
    session_id?: string
    page?: number
    limit?: number
}

export interface FilterOption {
    value: string
    label: string
    icon?: string
    color?: string
}

export const SESSION_STATUSES: FilterOption[] = [
    { value: 'all', label: 'All Sessions' },
    { value: 'active', label: 'Active', color: 'green' },
    { value: 'ongoing', label: 'Ongoing', color: 'green' },
    { value: 'completed', label: 'Completed', color: 'blue' },
    { value: 'failed', label: 'Failed', color: 'red' },
    { value: 'terminated', label: 'Terminated', color: 'orange' },
]

export const ENTITY_TYPES: FilterOption[] = [
    { value: 'all', label: 'All Types' },
    { value: 'PHONE_NUMBER', label: 'Phone Numbers', icon: '📞' },
    { value: 'UPI_ID', label: 'UPI IDs', icon: '💳' },
    { value: 'BANK_ACCOUNT', label: 'Bank Accounts', icon: '🏦' },
    { value: 'URL', label: 'URLs/Links', icon: '🔗' },
    { value: 'EMAIL', label: 'Email Addresses', icon: '📧' },
    { value: 'IFSC_CODE', label: 'IFSC Codes', icon: '🔢' },
]

export const RISK_LEVELS: FilterOption[] = [
    { value: 'all', label: 'All Risk Levels' },
    { value: 'critical', label: 'Critical', color: 'red' },
    { value: 'high', label: 'High', color: 'orange' },
    { value: 'medium', label: 'Medium', color: 'yellow' },
    { value: 'low', label: 'Low', color: 'green' },
    { value: 'minimal', label: 'Minimal', color: 'gray' },
]
