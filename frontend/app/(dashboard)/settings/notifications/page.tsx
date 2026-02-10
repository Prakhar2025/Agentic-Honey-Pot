import { Metadata } from 'next'
import { Bell } from 'lucide-react'
import { NotificationToggles } from '@/components/settings/notification-toggles'

export const metadata: Metadata = {
    title: 'Notification Settings',
    description: 'Configure your notification preferences for ScamShield alerts',
}

export default function NotificationsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <Bell className="h-6 w-6" />
                    Notifications
                </h1>
                <p className="text-muted-foreground mt-1">
                    Configure how and when you receive notifications from ScamShield
                </p>
            </div>

            <NotificationToggles />
        </div>
    )
}
