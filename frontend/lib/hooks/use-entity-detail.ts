// Entity detail and mutation hooks
'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { intelligenceApi } from '@/lib/api/intelligence'
import { intelligenceKeys } from './use-intelligence'
import { toast } from 'sonner'

// Re-export useEntityDetail
export { useEntityDetail } from './use-intelligence'

// Hook for adding note
export function useAddEntityNote() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ entityId, content }: { entityId: string; content: string }) =>
            intelligenceApi.addNote(entityId, content),
        onSuccess: (_, { entityId }) => {
            queryClient.invalidateQueries({ queryKey: intelligenceKeys.detail(entityId) })
            toast.success('Note added successfully')
        },
        onError: () => {
            toast.error('Failed to add note')
        },
    })
}

// Hook for verifying entity
export function useVerifyEntity() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ entityId, verified, source }: {
            entityId: string
            verified: boolean
            source: string
        }) => intelligenceApi.verifyEntity(entityId, verified, source),
        onMutate: async ({ entityId, verified }) => {
            await queryClient.cancelQueries({ queryKey: intelligenceKeys.detail(entityId) })

            const previousEntity = queryClient.getQueryData(intelligenceKeys.detail(entityId))

            queryClient.setQueryData(intelligenceKeys.detail(entityId), (old: any) => ({
                ...old,
                verified,
            }))

            return { previousEntity }
        },
        onError: (_err, { entityId }, context) => {
            queryClient.setQueryData(
                intelligenceKeys.detail(entityId),
                context?.previousEntity
            )
            toast.error('Failed to update verification')
        },
        onSuccess: (_, { verified }) => {
            toast.success(verified ? 'Entity verified' : 'Verification removed')
        },
        onSettled: (_, __, { entityId }) => {
            queryClient.invalidateQueries({ queryKey: intelligenceKeys.detail(entityId) })
            queryClient.invalidateQueries({ queryKey: intelligenceKeys.lists() })
        },
    })
}

// Hook for deleting entity
export function useDeleteEntity() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (entityId: string) => intelligenceApi.deleteEntity(entityId),
        onMutate: async (entityId) => {
            await queryClient.cancelQueries({ queryKey: intelligenceKeys.lists() })

            const previousData = queryClient.getQueriesData({ queryKey: intelligenceKeys.lists() })

            queryClient.setQueriesData({ queryKey: intelligenceKeys.lists() }, (old: any) => {
                if (!old) return old
                return {
                    ...old,
                    entities: old.entities?.filter((e: any) => e.id !== entityId) || [],
                    total: Math.max(0, (old.total || 0) - 1),
                }
            })

            return { previousData }
        },
        onError: (_err, _entityId, context) => {
            context?.previousData?.forEach(([queryKey, data]) => {
                queryClient.setQueryData(queryKey, data)
            })
            toast.error('Failed to delete entity')
        },
        onSuccess: () => {
            toast.success('Entity deleted')
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: intelligenceKeys.lists() })
            queryClient.invalidateQueries({ queryKey: intelligenceKeys.stats() })
        },
    })
}

// Hook for reporting entity
export function useReportEntity() {
    return useMutation({
        mutationFn: ({ entityId, reportType, details }: {
            entityId: string
            reportType: 'false_positive' | 'duplicate' | 'additional_info' | 'verified_scam'
            details: string
        }) => intelligenceApi.reportEntity(entityId, reportType, details),
        onSuccess: () => {
            toast.success('Report submitted successfully')
        },
        onError: () => {
            toast.error('Failed to submit report')
        },
    })
}

// Hook for exporting entities
export function useExportEntities() {
    return useMutation({
        mutationFn: ({ entityIds, format, includeMetadata }: {
            entityIds?: string[]
            format: 'json' | 'csv' | 'stix' | 'misp'
            includeMetadata: boolean
        }) => intelligenceApi.exportEntities(entityIds, format, includeMetadata),
        onSuccess: (data) => {
            if (data.download_url && data.download_url !== '#') {
                window.open(data.download_url, '_blank')
            }
            toast.success('Export ready for download')
        },
        onError: () => {
            toast.error('Failed to export entities')
        },
    })
}

// Hook for bulk delete
export function useBulkDeleteEntities() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (entityIds: string[]) => {
            await Promise.all(entityIds.map(id => intelligenceApi.deleteEntity(id)))
        },
        onSuccess: (_, entityIds) => {
            queryClient.invalidateQueries({ queryKey: intelligenceKeys.lists() })
            queryClient.invalidateQueries({ queryKey: intelligenceKeys.stats() })
            toast.success(`Deleted ${entityIds.length} entities`)
        },
        onError: () => {
            toast.error('Failed to delete entities')
        },
    })
}

// Hook for bulk verify
export function useBulkVerifyEntities() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ entityIds, verified }: { entityIds: string[]; verified: boolean }) => {
            await Promise.all(
                entityIds.map(id => intelligenceApi.verifyEntity(id, verified, 'bulk_verification'))
            )
        },
        onSuccess: (_, { entityIds, verified }) => {
            queryClient.invalidateQueries({ queryKey: intelligenceKeys.lists() })
            toast.success(`${verified ? 'Verified' : 'Unverified'} ${entityIds.length} entities`)
        },
        onError: () => {
            toast.error('Failed to update entities')
        },
    })
}
