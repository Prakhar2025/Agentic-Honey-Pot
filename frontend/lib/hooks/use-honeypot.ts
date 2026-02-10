import { useMutation, useQueryClient } from '@tanstack/react-query'
import { engageScammer, continueConversation, type EngageRequest, type ContinueRequest } from '@/lib/api/honeypot'
import { sessionKeys } from './use-sessions'

export function useEngageScammer() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (request: EngageRequest) => engageScammer(request),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: sessionKeys.lists() })
        },
    })
}

export function useContinueConversation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (request: ContinueRequest) => continueConversation(request),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: sessionKeys.detail(data.session_id) })
        },
    })
}
