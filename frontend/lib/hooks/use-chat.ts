// Main chat functionality hook
'use client'

import { useCallback } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useChatStore } from '@/lib/stores'
import { engageScammer, continueConversation, EngageRequest, ContinueRequest, EngageResponse } from '@/lib/api/honeypot'
import { useMessageSound } from '@/lib/hooks/use-message-sound'
import { Message } from '@/types/message'

export function useChat() {
    const router = useRouter()
    const queryClient = useQueryClient()
    const { playReceived, playError } = useMessageSound()

    const {
        activeSession,
        addMessage,
        updateMessage,
        setIsTyping,
        setLastScamDetection,
        addExtractedEntities,
        setRiskScore,
        setScamType,
        updateSession,
    } = useChatStore()

    /**
     * Process the API response and update the store
     */
    const processResponse = useCallback((data: EngageResponse) => {
        // Add AI response as message
        const aiMessage: Message = {
            id: crypto.randomUUID(),
            role: 'victim',
            content: data.response,
            timestamp: new Date().toISOString(),
            persona: data.persona_used,
            status: 'sent',
            entities_extracted: [],
        }
        addMessage(aiMessage)

        // Build entities from extracted_intelligence
        const entities: Array<{ type: string; value: string; confidence: number }> = []
        const intel = data.extracted_intelligence
        if (intel) {
            if (intel.phone_numbers) {
                intel.phone_numbers.forEach(v => entities.push({ type: 'PHONE_NUMBER', value: v, confidence: 0.9 }))
            }
            if (intel.upi_ids) {
                intel.upi_ids.forEach(v => entities.push({ type: 'UPI_ID', value: v, confidence: 0.9 }))
            }
            if (intel.bank_accounts) {
                intel.bank_accounts.forEach(v => entities.push({ type: 'BANK_ACCOUNT', value: v, confidence: 0.9 }))
            }
            if (intel.phishing_links) {
                intel.phishing_links.forEach(v => entities.push({ type: 'URL', value: v, confidence: 0.9 }))
            }
        }

        // Update session
        updateSession({
            id: data.session_id,
            status: (data.session_status as 'ACTIVE' | 'COMPLETED' | 'FAILED') || 'ACTIVE',
            persona_used: data.persona_used,
            scam_type: data.scam_type || '',
            risk_level: data.confidence >= 0.8 ? 'CRITICAL' : data.confidence >= 0.6 ? 'HIGH' : data.confidence >= 0.4 ? 'MEDIUM' : 'LOW',
            turn_count: data.turn_number,
        })

        // Update scam detection
        if (data.scam_type) {
            setLastScamDetection({
                is_scam: true,
                scam_type: data.scam_type,
                confidence: data.confidence,
                risk_level: data.confidence >= 0.8 ? 'CRITICAL' : data.confidence >= 0.6 ? 'HIGH' : data.confidence >= 0.4 ? 'MEDIUM' : 'LOW',
            })
            setScamType(data.scam_type)
        }

        // Add extracted entities
        if (entities.length > 0) {
            addExtractedEntities(entities.map(e => ({
                ...e,
                type: e.type as any,
            })))
        }

        // Update risk score
        setRiskScore(data.confidence)

        // Play sound
        playReceived()

        // Update URL with session ID
        router.push(`/chat?session=${data.session_id}`, { scroll: false })

        // Invalidate queries
        queryClient.invalidateQueries({ queryKey: ['sessions'] })
    }, [addMessage, updateSession, setLastScamDetection, addExtractedEntities, setRiskScore, setScamType, playReceived, router, queryClient])

    // Engage mutation (start new session)
    const engageMutation = useMutation({
        mutationFn: (params: { scammerMessage: string; persona?: string; scenario?: string }) => {
            return engageScammer({
                scammer_message: params.scammerMessage,
                persona: params.persona,
            })
        },
        onSuccess: (data) => {
            processResponse(data)
        },
        onError: (error) => {
            playError()
            toast.error('Failed to start session')
            console.error('Engage error:', error)
        },
    })

    // Continue mutation
    const continueMutation = useMutation({
        mutationFn: (params: { sessionId: string; scammerMessage: string }) => {
            return continueConversation({
                session_id: params.sessionId,
                scammer_message: params.scammerMessage,
            })
        },
        onMutate: async (variables) => {
            // Optimistically add the scammer message
            const optimisticMessage: Message = {
                id: crypto.randomUUID(),
                role: 'scammer',
                content: variables.scammerMessage,
                timestamp: new Date().toISOString(),
                status: 'sending',
            }
            addMessage(optimisticMessage)
            setIsTyping(true)

            return { optimisticMessage }
        },
        onSuccess: (data, _variables, context) => {
            // Update the optimistic message status
            if (context?.optimisticMessage) {
                updateMessage(context.optimisticMessage.id, { status: 'sent' })
            }

            setIsTyping(false)
            processResponse(data)
        },
        onError: (error, _variables, context) => {
            setIsTyping(false)
            playError()

            // Update optimistic message to error state
            if (context?.optimisticMessage) {
                updateMessage(context.optimisticMessage.id, {
                    status: 'error',
                    error: {
                        code: 'SEND_FAILED',
                        message: 'Failed to send message. Please try again.',
                        retry_available: true,
                    },
                })
            }

            toast.error('Failed to send message')
            console.error('Continue error:', error)
        },
    })

    // Start a new session
    const startSession = useCallback(async (params: {
        scammerMessage: string
        persona?: string
        scenario?: string
    }) => {
        // Add the initial scammer message to the store
        useChatStore.getState().startSession(params)

        await engageMutation.mutateAsync(params)
    }, [engageMutation])

    // Continue an existing session
    const continueSession = useCallback(async (sessionId: string, message: string) => {
        if (!message.trim()) return

        await continueMutation.mutateAsync({
            sessionId,
            scammerMessage: message,
        })
    }, [continueMutation])

    // Send message - auto-detects new vs existing session
    const sendMessage = useCallback(async (content: string) => {
        if (!content.trim()) return

        if (!activeSession) {
            await startSession({ scammerMessage: content })
        } else {
            await continueSession(activeSession.id, content)
        }
    }, [activeSession, startSession, continueSession])

    // Retry failed message
    const retryMessage = useCallback(async (messageId: string) => {
        const state = useChatStore.getState()
        const message = state.messages.find(m => m.id === messageId)

        if (message && message.status === 'error' && activeSession) {
            state.removeMessage(messageId)
            await continueSession(activeSession.id, message.content)
        }
    }, [activeSession, continueSession])

    return {
        // Named session actions (used by page.tsx)
        startSession,
        continueSession,
        // Generic send (auto-detects)
        sendMessage,
        retryMessage,
        // Loading states
        isLoading: engageMutation.isPending || continueMutation.isPending,
        isStarting: engageMutation.isPending,
        isContinuing: continueMutation.isPending,
        isEngaging: engageMutation.isPending,
    }
}
