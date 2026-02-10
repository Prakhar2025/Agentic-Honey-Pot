'use client'

import { useState } from 'react'
import { Plus, Trash2, Copy, Check, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { toast } from 'sonner'
import { format } from 'date-fns'

interface ApiKey {
    id: string
    name: string
    key: string
    created: Date
    lastUsed: Date | null
}

const mockKeys: ApiKey[] = [
    {
        id: '1',
        name: 'Production API',
        key: 'sk_live_abc123xyz456',
        created: new Date('2026-01-15'),
        lastUsed: new Date('2026-02-10'),
    },
    {
        id: '2',
        name: 'Development API',
        key: 'sk_test_def789ghi012',
        created: new Date('2026-02-01'),
        lastUsed: null,
    },
]

export function ApiKeyList() {
    const [keys, setKeys] = useState<ApiKey[]>(mockKeys)
    const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set())
    const [copiedKey, setCopiedKey] = useState<string | null>(null)
    const [deleteId, setDeleteId] = useState<string | null>(null)

    const toggleKeyVisibility = (id: string) => {
        setVisibleKeys((prev) => {
            const newSet = new Set(prev)
            if (newSet.has(id)) {
                newSet.delete(id)
            } else {
                newSet.add(id)
            }
            return newSet
        })
    }

    const copyKey = async (key: string, id: string) => {
        await navigator.clipboard.writeText(key)
        setCopiedKey(id)
        toast.success('API key copied to clipboard')
        setTimeout(() => setCopiedKey(null), 2000)
    }

    const deleteKey = (id: string) => {
        setKeys((prev) => prev.filter((k) => k.id !== id))
        toast.success('API key deleted successfully')
        setDeleteId(null)
    }

    const maskKey = (key: string) => {
        return `${key.substring(0, 7)}${'•'.repeat(20)}${key.substring(key.length - 4)}`
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-medium">API Keys</h3>
                    <p className="text-sm text-muted-foreground">Manage your API keys for ScamShield integration</p>
                </div>
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Key
                </Button>
            </div>

            <div className="space-y-4">
                {keys.map((apiKey) => (
                    <Card key={apiKey.id}>
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-base">{apiKey.name}</CardTitle>
                                    <CardDescription className="mt-1">
                                        Created {format(apiKey.created, 'MMM dd, yyyy')}
                                    </CardDescription>
                                </div>
                                <Badge variant={apiKey.lastUsed ? 'default' : 'secondary'}>
                                    {apiKey.lastUsed ? 'Active' : 'Unused'}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <code className="flex-1 px-3 py-2 rounded bg-muted text-sm font-mono">
                                        {visibleKeys.has(apiKey.id) ? apiKey.key : maskKey(apiKey.key)}
                                    </code>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => toggleKeyVisibility(apiKey.id)}
                                    >
                                        {visibleKeys.has(apiKey.id) ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => copyKey(apiKey.key, apiKey.id)}
                                    >
                                        {copiedKey === apiKey.id ? (
                                            <Check className="h-4 w-4" />
                                        ) : (
                                            <Copy className="h-4 w-4" />
                                        )}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setDeleteId(apiKey.id)}
                                        className="text-destructive hover:text-destructive"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                                {apiKey.lastUsed && (
                                    <p className="text-xs text-muted-foreground">
                                        Last used: {format(apiKey.lastUsed, 'MMM dd, yyyy HH:mm')}
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {keys.length === 0 && (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <p className="text-muted-foreground mb-4">No API keys yet</p>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Create Your First Key
                        </Button>
                    </CardContent>
                </Card>
            )}

            <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete API Key?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. Applications using this key will no longer be able to access
                            the API.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteId && deleteKey(deleteId)} className="bg-destructive">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
