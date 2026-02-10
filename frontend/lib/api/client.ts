import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { config } from '@/lib/config'
import type { ApiError } from '@/types'

// Create axios instance
export const apiClient: AxiosInstance = axios.create({
    baseURL: config.api.baseUrl,
    timeout: config.api.timeout,
    headers: {
        'Content-Type': 'application/json',
    },
})

// Request interceptor
apiClient.interceptors.request.use(
    (requestConfig: InternalAxiosRequestConfig) => {
        // Add API key if available
        if (config.auth.apiKey) {
            requestConfig.headers['x-api-key'] = config.auth.apiKey
        }
        return requestConfig
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Response interceptor
apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ApiError>) => {
        const apiError: ApiError = {
            status: error.response?.status || 500,
            message: error.response?.data?.message || error.message || 'An unexpected error occurred',
            detail: error.response?.data?.detail,
        }

        // Log error in development
        if (process.env.NODE_ENV === 'development') {
            console.error('API Error:', apiError)
        }

        return Promise.reject(apiError)
    }
)

export default apiClient
