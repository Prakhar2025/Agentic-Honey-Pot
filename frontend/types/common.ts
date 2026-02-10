export type Persona = {
    id: string
    label: string
    description: string
    icon: string
}

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical'

export interface NavigationItem {
    title: string
    href: string
    icon: React.ComponentType<{ className?: string }>
    description?: string
    badge?: string
}

export interface SelectOption {
    value: string
    label: string
    disabled?: boolean
}

export interface TableColumn<T> {
    key: keyof T | string
    header: string
    sortable?: boolean
    render?: (item: T) => React.ReactNode
}

export interface FilterState {
    search: string
    status?: string
    scamType?: string
    dateRange?: {
        from: Date
        to: Date
    }
}

export interface ApiError {
    status: number
    message: string
    code?: string
    detail?: string
    details?: Record<string, unknown>
}

export interface PaginatedResponse<T = unknown> {
    items: T[]
    total: number
    limit: number
    offset: number
    has_more: boolean
}
