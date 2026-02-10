import { Metadata } from 'next'
import { Plug, Check } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export const metadata: Metadata = {
    title: 'Integrations',
    description: 'Connect third-party services with ScamShield',
}

const integrations = [
    {
        id: 'slack',
        name: 'Slack',
        description: 'Receive real-time alerts in your Slack workspace',
        icon: '💬',
        connected: true,
        category: 'Communication',
    },
    {
        id: 'webhook',
        name: 'Webhooks',
        description: 'Send events to your custom webhook endpoints',
        icon: '🔗',
        connected: false,
        category: 'Developer Tools',
    },
    {
        id: 'email',
        name: 'Email Service',
        description: 'Connect your email provider for automated reporting',
        icon: '📧',
        connected: true,
        category: 'Communication',
    },
    {
        id: 'sentry',
        name: 'Sentry',
        description: 'Monitor errors and performance issues',
        icon: '🐛',
        connected: false,
        category: 'Monitoring',
    },
    {
        id: 'datadog',
        name: 'Datadog',
        description: 'Infrastructure monitoring and analytics',
        icon: '📊',
        connected: false,
        category: 'Monitoring',
    },
    {
        id: 'zapier',
        name: 'Zapier',
        description: 'Automate workflows with 5000+ apps',
        icon: '⚡',
        connected: false,
        category: 'Automation',
    },
]

export default function IntegrationsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <Plug className="h-6 w-6" />
                    Integrations
                </h1>
                <p className="text-muted-foreground mt-1">
                    Connect ScamShield with your favorite tools and services
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {integrations.map((integration) => (
                    <Card key={integration.id}>
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="text-3xl">{integration.icon}</div>
                                    <div>
                                        <CardTitle className="text-lg">{integration.name}</CardTitle>
                                        <Badge variant="outline" className="mt-1">
                                            {integration.category}
                                        </Badge>
                                    </div>
                                </div>
                                {integration.connected && (
                                    <Badge className="gap-1">
                                        <Check className="h-3 w-3" />
                                        Connected
                                    </Badge>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="mb-4">{integration.description}</CardDescription>
                            <Separator className="mb-4" />
                            <div className="flex gap-2">
                                {integration.connected ? (
                                    <>
                                        <Button variant="outline" size="sm" className="flex-1">
                                            Configure
                                        </Button>
                                        <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                                            Disconnect
                                        </Button>
                                    </>
                                ) : (
                                    <Button size="sm" className="w-full">
                                        Connect
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
