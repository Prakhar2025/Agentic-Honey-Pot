import apiClient from './client'
import { API_ENDPOINTS } from './endpoints'
import type { HealthCheck } from '@/types'

export async function getHealth(): Promise<HealthCheck> {
    const response = await apiClient.get(API_ENDPOINTS.HEALTH)
    return response.data
}

export async function getHealthReady(): Promise<HealthCheck> {
    const response = await apiClient.get(API_ENDPOINTS.HEALTH_READY)
    return response.data
}

export async function getHealthLive(): Promise<HealthCheck> {
    const response = await apiClient.get(API_ENDPOINTS.HEALTH_LIVE)
    return response.data
}
