export interface ApiResponse<T> {
    data: T
    success: boolean
    message?: string
}

export interface PaginatedResponse<T> {
    items: T[]
    total: number
    page: number
    page_size: number
    total_pages: number
}

export interface ApiError {
    status: number
    message: string
    detail?: string
    errors?: Record<string, string[]>
}

export interface HealthCheck {
    status: 'healthy' | 'unhealthy'
    timestamp: string
    version?: string
    components?: {
        database: string
        llm: string
    }
}
