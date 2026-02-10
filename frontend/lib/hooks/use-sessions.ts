'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import * as sessionsApi from '@/lib/api/sessions'
import type { SessionFilters } from '@/types/filters'

// Query keys for cache management
export const sessionKeys = {
    all: ['sessions'] as const,
    lists: () => [...sessionKeys.all, 'list'] as const,
    list: (filters: SessionFilters) => [...sessionKeys.lists(), filters] as const,
    details: () => [...sessionKeys.all, 'detail'] as const,
    detail: (id: string) => [...sessionKeys.details(), id] as const,
    messages: (id: string) => [...sessionKeys.detail(id), 'messages'] as const,
    intelligence: (id: string) => [...sessionKeys.detail(id), 'intelligence'] as const,
}

// Hook for sessions list with filters
export function useSessions(filters: SessionFilters = {}) {
    return useQuery({
        queryKey: sessionKeys.list(filters),
        queryFn: async () => {
            try {
                const params = {
                    page: filters.page || 1,
                    page_size: filters.limit || 20,
                    ...(filters.status && filters.status !== 'all' && { status: filters.status }),
                    ...(filters.scam_type && { scam_type: filters.scam_type }),
                    ...(filters.persona && { persona: filters.persona }),
                    ...(filters.search && { search: filters.search }),
                    ...(filters.sort && { sort: filters.sort }),
                    ...(filters.order && { order: filters.order }),
                }
                return await sessionsApi.getSessions(params)
            } catch (error) {
                // Return mock data for development
                return getMockSessionsData(filters)
            }
        },
        staleTime: 10000,
        placeholderData: (previousData) => previousData,
    })
}

// Hook for single session detail
export function useSessionDetail(sessionId: string) {
    return useQuery({
        queryKey: sessionKeys.detail(sessionId),
        queryFn: async () => {
            try {
                return await sessionsApi.getSession(sessionId)
            } catch {
                return getMockSession(sessionId)
            }
        },
        staleTime: 10000,
        enabled: !!sessionId,
    })
}

// Hook for session messages with real-time polling
export function useSessionMessages(sessionId: string, options: { refetchInterval?: number | false } = {}) {
    return useQuery({
        queryKey: sessionKeys.messages(sessionId),
        queryFn: async () => {
            try {
                const messages = await sessionsApi.getSessionMessages(sessionId)
                return {
                    messages: messages.sort((a: any, b: any) =>
                        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
                    ),
                    total: messages.length,
                    has_more: false,
                }
            } catch {
                return getMockMessages(sessionId)
            }
        },
        refetchInterval: options.refetchInterval,
        staleTime: 2000,
        enabled: !!sessionId,
    })
}

// Hook for session intelligence
export function useSessionIntelligence(sessionId: string) {
    return useQuery({
        queryKey: sessionKeys.intelligence(sessionId),
        queryFn: async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL || 'https://scamshield-honeypot.onrender.com'}/v1/sessions/${sessionId}/intelligence`
                )
                if (!response.ok) throw new Error('Failed to fetch')
                return response.json()
            } catch {
                return getMockIntelligence(sessionId)
            }
        },
        staleTime: 30000,
        enabled: !!sessionId,
    })
}

// Hook for deleting session with optimistic update
export function useDeleteSession() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: sessionsApi.deleteSession,
        onMutate: async (sessionId) => {
            await queryClient.cancelQueries({ queryKey: sessionKeys.lists() })
            const previousSessions = queryClient.getQueriesData({ queryKey: sessionKeys.lists() })

            queryClient.setQueriesData({ queryKey: sessionKeys.lists() }, (old: any) => {
                if (!old?.items) return old
                return {
                    ...old,
                    items: old.items.filter((s: any) => s.id !== sessionId),
                    total: old.total - 1,
                }
            })

            return { previousSessions }
        },
        onError: (_err, _sessionId, context) => {
            context?.previousSessions?.forEach(([queryKey, data]) => {
                queryClient.setQueryData(queryKey, data)
            })
            toast.error('Failed to delete session')
        },
        onSuccess: () => {
            toast.success('Session deleted')
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: sessionKeys.lists() })
        },
    })
}

// Hook for bulk delete
export function useBulkDeleteSessions() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (sessionIds: string[]) => {
            await Promise.all(sessionIds.map(id => sessionsApi.deleteSession(id)))
        },
        onSuccess: (_, sessionIds) => {
            queryClient.invalidateQueries({ queryKey: sessionKeys.lists() })
            toast.success(`Deleted ${sessionIds.length} sessions`)
        },
        onError: () => {
            toast.error('Failed to delete sessions')
        },
    })
}

// Hook for exporting sessions
export function useExportSessions() {
    return useMutation({
        mutationFn: async ({ sessionIds, format }: { sessionIds: string[], format: 'json' | 'csv' | 'pdf' }) => {
            // Mock export for now
            return { download_url: '#', expires_at: new Date().toISOString() }
        },
        onSuccess: () => {
            toast.success('Export ready')
        },
        onError: () => {
            toast.error('Failed to export sessions')
        },
    })
}

// Mock data functions
function getMockSessionsData(filters: SessionFilters) {
    const mockSessions = [
        {
            id: 'sess_abc123',
            scam_type: 'KYC_FRAUD',
            persona_id: 'elderly_victim',
            status: 'ONGOING',
            is_scam: true,
            source_type: 'sms',
            turn_count: 8,
            extracted_count: 5,
            metadata_json: { initial_message: 'Dear customer, your KYC has expired...', risk_score: 8.5, detection_confidence: 0.94 },
            started_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
            ended_at: null,
            created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
            updated_at: new Date().toISOString(),
        },
        {
            id: 'sess_def456',
            scam_type: 'LOTTERY_SCAM',
            persona_id: 'eager_investor',
            status: 'COMPLETED',
            is_scam: true,
            source_type: 'whatsapp',
            turn_count: 15,
            extracted_count: 7,
            metadata_json: { initial_message: 'Congratulations! You won...', risk_score: 9.2, detection_confidence: 0.98 },
            started_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
            ended_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
            created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
            updated_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        },
        {
            id: 'sess_ghi789',
            scam_type: 'TECH_SUPPORT',
            persona_id: 'tech_novice',
            status: 'COMPLETED',
            is_scam: true,
            source_type: 'email',
            turn_count: 12,
            extracted_count: 4,
            metadata_json: { initial_message: 'Your computer has virus...', risk_score: 7.8, detection_confidence: 0.89 },
            started_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
            ended_at: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
            created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
            updated_at: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
        },
        {
            id: 'sess_jkl012',
            scam_type: 'INVESTMENT_FRAUD',
            persona_id: 'eager_investor',
            status: 'ONGOING',
            is_scam: true,
            source_type: 'chat',
            turn_count: 6,
            extracted_count: 3,
            metadata_json: { initial_message: 'Double your money in 24 hours...', risk_score: 9.0, detection_confidence: 0.96 },
            started_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
            ended_at: null,
            created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
            updated_at: new Date().toISOString(),
        },
        {
            id: 'sess_mno345',
            scam_type: 'OTP_FRAUD',
            persona_id: 'busy_professional',
            status: 'TERMINATED',
            is_scam: true,
            source_type: 'sms',
            turn_count: 4,
            extracted_count: 1,
            metadata_json: { initial_message: 'Your OTP is required for...', risk_score: 6.5, detection_confidence: 0.75 },
            started_at: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
            ended_at: new Date(Date.now() - 1000 * 60 * 170).toISOString(),
            created_at: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
            updated_at: new Date(Date.now() - 1000 * 60 * 170).toISOString(),
        },
    ]

    let filtered = [...mockSessions]

    if (filters.status && filters.status !== 'all') {
        filtered = filtered.filter(s => s.status.toLowerCase() === filters.status?.toLowerCase())
    }
    if (filters.scam_type) {
        filtered = filtered.filter(s => s.scam_type === filters.scam_type)
    }
    if (filters.search) {
        const search = filters.search.toLowerCase()
        filtered = filtered.filter(s =>
            s.scam_type.toLowerCase().includes(search) ||
            s.persona_id.toLowerCase().includes(search) ||
            (s.metadata_json?.initial_message as string)?.toLowerCase().includes(search)
        )
    }

    return {
        items: filtered,
        total: filtered.length,
        page: filters.page || 1,
        page_size: filters.limit || 20,
        has_more: false,
    }
}

function getMockSession(id: string) {
    return {
        id,
        scam_type: 'KYC_FRAUD',
        persona_id: 'elderly_victim',
        status: 'ONGOING',
        is_scam: true,
        source_type: 'sms',
        turn_count: 8,
        extracted_count: 5,
        metadata_json: {
            initial_message: 'Dear customer, your KYC has expired. Please update immediately.',
            risk_score: 8.5,
            detection_confidence: 0.94
        },
        started_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        ended_at: null,
        created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        updated_at: new Date().toISOString(),
    }
}

function getMockMessages(sessionId: string) {
    return {
        messages: [
            {
                id: 'msg_1',
                session_id: sessionId,
                role: 'scammer',
                content: 'Dear customer, your KYC has expired. Please click link to update: bit.ly/fake-kyc',
                turn_number: 1,
                created_at: new Date(Date.now() - 1000 * 60 * 14).toISOString(),
                metadata_json: {
                    extracted_entities: [
                        { type: 'URL', value: 'bit.ly/fake-kyc', confidence: 0.99 }
                    ]
                }
            },
            {
                id: 'msg_2',
                session_id: sessionId,
                role: 'agent',
                content: 'Oh my! I\'m so worried about my account. What should I do? I don\'t want any problems with my bank...',
                turn_number: 1,
                created_at: new Date(Date.now() - 1000 * 60 * 13).toISOString(),
                metadata_json: null
            },
            {
                id: 'msg_3',
                session_id: sessionId,
                role: 'scammer',
                content: 'Ma\'am, don\'t worry. Just share your OTP and send to this number: +91 98765 43210. Also need your bank account for verification: SBI 12345678901',
                turn_number: 2,
                created_at: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
                metadata_json: {
                    extracted_entities: [
                        { type: 'PHONE_NUMBER', value: '+91 98765 43210', confidence: 0.95 },
                        { type: 'BANK_ACCOUNT', value: 'SBI 12345678901', confidence: 0.92 }
                    ]
                }
            },
            {
                id: 'msg_4',
                session_id: sessionId,
                role: 'agent',
                content: 'Oh dear, let me check... I\'m a bit confused about all this. Can you explain again what I need to do?',
                turn_number: 2,
                created_at: new Date(Date.now() - 1000 * 60 * 11).toISOString(),
                metadata_json: null
            },
            {
                id: 'msg_5',
                session_id: sessionId,
                role: 'scammer',
                content: 'Ma\'am, its urgent! Send OTP to my UPI: scammer@upi. Do it now or your account will be blocked!',
                turn_number: 3,
                created_at: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
                metadata_json: {
                    extracted_entities: [
                        { type: 'UPI_ID', value: 'scammer@upi', confidence: 0.98 }
                    ]
                }
            },
        ],
        total: 5,
        has_more: false,
    }
}

function getMockIntelligence(sessionId: string) {
    return {
        entities: [
            { type: 'PHONE_NUMBER', value: '+91 98765 43210', confidence: 0.95, extracted_at: new Date().toISOString() },
            { type: 'UPI_ID', value: 'scammer@upi', confidence: 0.98, extracted_at: new Date().toISOString() },
            { type: 'BANK_ACCOUNT', value: 'SBI 12345678901', confidence: 0.92, extracted_at: new Date().toISOString() },
            { type: 'URL', value: 'bit.ly/fake-kyc', confidence: 0.99, extracted_at: new Date().toISOString() },
        ],
        summary: {
            total: 4,
            by_type: {
                PHONE_NUMBER: 1,
                UPI_ID: 1,
                BANK_ACCOUNT: 1,
                URL: 1,
            },
            high_confidence: 4,
            verified: 2,
        },
    }
}
