// Session Filter Types

export interface SessionFilters {
    status?: string  // Allow any status string from URL params
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
