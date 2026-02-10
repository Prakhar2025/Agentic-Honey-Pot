import apiClient from './client'
import { API_ENDPOINTS } from './endpoints'
import type { Session, SessionWithMessages, Message, PaginatedResponse } from '@/types'

export interface SessionsParams {
    page?: number
    page_size?: number
    status?: string
    scam_type?: string
}

export async function getSessions(params?: SessionsParams): Promise<PaginatedResponse<Session>> {
    const response = await apiClient.get(API_ENDPOINTS.SESSIONS, { params })
    return response.data
}

export async function getSession(id: string): Promise<Session> {
    const response = await apiClient.get(API_ENDPOINTS.SESSION(id))
    return response.data
}

export async function getSessionMessages(id: string): Promise<Message[]> {
    const response = await apiClient.get(API_ENDPOINTS.SESSION_MESSAGES(id))
    return response.data
}

export async function getSessionWithMessages(id: string): Promise<SessionWithMessages> {
    const [session, messages] = await Promise.all([
        getSession(id),
        getSessionMessages(id),
    ])
    return { ...session, messages }
}

export async function endSession(id: string): Promise<Session> {
    const response = await apiClient.post(API_ENDPOINTS.END_SESSION(id))
    return response.data
}

export async function deleteSession(id: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.SESSION(id))
}
