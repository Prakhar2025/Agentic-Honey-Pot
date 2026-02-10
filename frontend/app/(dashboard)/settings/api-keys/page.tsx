import { Metadata } from 'next'
import { Key } from 'lucide-react'
import { ApiKeyList } from '@/components/settings/api-key-list'

export const metadata: Metadata = {
    title: 'API Keys',
    description: 'Manage your ScamShield API keys for integration',
}

export default function ApiKeysPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <Key className="h-6 w-6" />
                    API Keys
                </h1>
                <p className="text-muted-foreground mt-1">
                    Create and manage API keys for integrating ScamShield into your applications
                </p>
            </div>

            <ApiKeyList />
        </div>
    )
}
