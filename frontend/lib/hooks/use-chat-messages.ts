'use client'

import { useState, useCallback, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useChatStore } from '@/lib/stores'
import { Message } from '@/types/message'
import apiClient from '@/lib/api/client'
import { API_ENDPOINTS } from '@/lib/api/endpoints'

export function useChatMessages(sessionId?: string) {
    const { messages: storeMessages } = useChatStore()
    const [isLoadingHistory, setIsLoadingHistory] = useState(false)
    const [hasMore, setHasMore] = useState(false)
    const [offset, setOffset] = useState(0)

    // Fetch session messages if resuming a session
    const { data: sessionData, isLoading: isFetchingSession } = useQuery({
        queryKey: ['session-messages', sessionId],
        queryFn: async () => {
            if (!sessionId) return null
            try {
                const res = await apiClient.get(API_ENDPOINTS.SESSION(sessionId))
                return res.data
            } catch {
                return null
            }
        },
        enabled: !!sessionId && storeMessages.length === 0,
        staleTime: 30000,
    })

    // Load session messages into store on first fetch
    useEffect(() => {
        if (sessionData?.messages && storeMessages.length === 0) {
            const { addMessage, updateSession } = useChatStore.getState()
            sessionData.messages.forEach((msg: any) => {
                addMessage({
                    id: msg.id || crypto.randomUUID(),
                    role: msg.role,
                    content: msg.content,
                    timestamp: msg.timestamp,
                    status: 'sent',
                    entities_extracted: msg.entities_extracted,
                })
            })
            updateSession({
                id: sessionData.session_id,
                status: sessionData.status,
                persona_used: sessionData.persona_used,
                scam_type: sessionData.scam_type,
                risk_level: sessionData.risk_level,
                turn_count: sessionData.turn_count,
            })
        }
    }, [sessionData, storeMessages.length])

    const loadMoreMessages = useCallback(async () => {
        if (isLoadingHistory || !sessionId) return
        setIsLoadingHistory(true)
        try {
            const newOffset = offset + 20
            setOffset(newOffset)
            setHasMore(false) // Server-driven pagination would set this
        } finally {
            setIsLoadingHistory(false)
        }
    }, [isLoadingHistory, sessionId, offset])

    return {
        messages: storeMessages,
        isLoadingHistory: isLoadingHistory || isFetchingSession,
        loadMoreMessages,
        hasMore,
    }
}
