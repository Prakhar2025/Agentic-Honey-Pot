'use client'

import { useState } from 'react'
import { Bell, Mail, MessageSquare, Shield } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'

interface NotificationSetting {
    id: string
    label: string
    description: string
    enabled: boolean
}

export function NotificationToggles() {
    const [emailNotifications, setEmailNotifications] = useState<NotificationSetting[]>([
        {
            id: 'new_session',
            label: 'New Sessions',
            description: 'Get notified when a new scam session is detected',
            enabled: true,
        },
        {
            id: 'intelligence_extracted',
            label: 'Intelligence Extracted',
            description: 'Alerts when new intelligence entities are extracted',
            enabled: true,
        },
        {
            id: 'high_risk_scam',
            label: 'High-Risk Scams',
            description: 'Immediate alerts for high-confidence scam detections',
            enabled: true,
        },
        {
            id: 'weekly_report',
            label: 'Weekly Reports',
            description: 'Weekly summary of scam activity and statistics',
            enabled: false,
        },
    ])

    const [pushNotifications, setPushNotifications] = useState<NotificationSetting[]>([
        {
            id: 'session_updates',
            label: 'Session Updates',
            description: 'Push notifications for ongoing session activities',
            enabled: false,
        },
        {
            id: 'critical_alerts',
            label: 'Critical Alerts',
            description: 'Urgent notifications for critical security events',
            enabled: true,
        },
    ])

    const toggleEmailNotification = (id: string) => {
        setEmailNotifications((prev) =>
            prev.map((notif) => (notif.id === id ? { ...notif, enabled: !notif.enabled } : notif))
        )
        toast.success('Email notification preference updated')
    }

    const togglePushNotification = (id: string) => {
        setPushNotifications((prev) =>
            prev.map((notif) => (notif.id === id ? { ...notif, enabled: !notif.enabled } : notif))
        )
        toast.success('Push notification preference updated')
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Mail className="h-5 w-5" />
                        Email Notifications
                    </CardTitle>
                    <CardDescription>Manage email notification preferences for your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {emailNotifications.map((notif, index) => (
                        <div key={notif.id}>
                            {index > 0 && <Separator className="my-4" />}
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5 flex-1">
                                    <Label htmlFor={`email-${notif.id}`} className="text-base cursor-pointer">
                                        {notif.label}
                                    </Label>
                                    <p className="text-sm text-muted-foreground">{notif.description}</p>
                                </div>
                                <Switch
                                    id={`email-${notif.id}`}
                                    checked={notif.enabled}
                                    onCheckedChange={() => toggleEmailNotification(notif.id)}
                                />
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Bell className="h-5 w-5" />
                        Push Notifications
                    </CardTitle>
                    <CardDescription>Configure push notifications for real-time updates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {pushNotifications.map((notif, index) => (
                        <div key={notif.id}>
                            {index > 0 && <Separator className="my-4" />}
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5 flex-1">
                                    <Label htmlFor={`push-${notif.id}`} className="text-base cursor-pointer">
                                        {notif.label}
                                    </Label>
                                    <p className="text-sm text-muted-foreground">{notif.description}</p>
                                </div>
                                <Switch
                                    id={`push-${notif.id}`}
                                    checked={notif.enabled}
                                    onCheckedChange={() => togglePushNotification(notif.id)}
                                />
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Security Alerts
                    </CardTitle>
                    <CardDescription>Important security notifications (always enabled)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5 flex-1">
                            <Label className="text-base">System Anomalies</Label>
                            <p className="text-sm text-muted-foreground">
                                Notifications about unusual system activity or potential security threats
                            </p>
                        </div>
                        <Switch checked={true} disabled />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5 flex-1">
                            <Label className="text-base">Account Activity</Label>
                            <p className="text-sm text-muted-foreground">Alerts for login attempts and account changes</p>
                        </div>
                        <Switch checked={true} disabled />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
