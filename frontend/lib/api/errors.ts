// API Error classes and handlers

export class ApiError extends Error {
    constructor(
        public code: string,
        message: string,
        public status: number,
        public details?: unknown
    ) {
        super(message)
        this.name = 'ApiError'
    }

    get isNetworkError(): boolean {
        return this.code === 'NETWORK_ERROR'
    }

    get isServerError(): boolean {
        return this.status >= 500
    }

    get isClientError(): boolean {
        return this.status >= 400 && this.status < 500
    }

    get isRetryable(): boolean {
        return this.isServerError || this.isNetworkError
    }

    toJSON() {
        return {
            code: this.code,
            message: this.message,
            status: this.status,
            details: this.details,
        }
    }
}

export function isApiError(error: unknown): error is ApiError {
    return error instanceof ApiError
}

export function getErrorMessage(error: unknown): string {
    if (isApiError(error)) {
        return error.message
    }
    if (error instanceof Error) {
        return error.message
    }
    return 'An unexpected error occurred'
}

export const ERROR_MESSAGES: Record<string, string> = {
    NETWORK_ERROR: 'Unable to connect. Please check your internet connection.',
    HTTP_400: 'Invalid request. Please check your input.',
    HTTP_401: 'Authentication required. Please log in.',
    HTTP_403: 'Access denied. You don\'t have permission.',
    HTTP_404: 'Resource not found.',
    HTTP_429: 'Too many requests. Please slow down.',
    HTTP_500: 'Server error. Please try again later.',
    HTTP_502: 'Server temporarily unavailable.',
    HTTP_503: 'Service maintenance. Please try again later.',
}
