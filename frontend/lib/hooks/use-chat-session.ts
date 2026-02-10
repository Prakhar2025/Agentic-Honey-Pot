'use client'

import { useCallback } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useChatStore } from '@/lib/stores'
import apiClient from '@/lib/api/client'
import { API_ENDPOINTS } from '@/lib/api/endpoints'

export function useChatSession() {
    const router = useRouter()
    const queryClient = useQueryClient()
    const { activeSession, clearSession, updateSession } = useChatStore()

    const endSessionMutation = useMutation({
        mutationFn: async (sessionId: string) => {
            const res = await apiClient.delete(API_ENDPOINTS.SESSION(sessionId))
            return res.data
        },
        onSuccess: (data) => {
            toast.success('Session ended', {
                description: `${data?.summary?.total_turns || 0} turns, ${data?.summary?.entities_extracted || 0} entities extracted`,
            })
            clearSession()
            queryClient.invalidateQueries({ queryKey: ['sessions'] })
            router.push('/chat')
        },
        onError: () => {
            toast.error('Failed to end session')
        },
    })

    const endSession = useCallback(async () => {
        if (!activeSession?.id) return
        await endSessionMutation.mutateAsync(activeSession.id)
    }, [activeSession, endSessionMutation])

    const newSession = useCallback(() => {
        clearSession()
        router.push('/chat')
    }, [clearSession, router])

    return {
        activeSession,
        endSession,
        newSession,
        isEndingSession: endSessionMutation.isPending,
    }
}
