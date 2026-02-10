import { Metadata } from 'next'
import { User } from 'lucide-react'
import { ProfileForm } from '@/components/settings/profile-form'

export const metadata: Metadata = {
    title: 'Profile Settings',
    description: 'Manage your ScamShield profile and personal information',
}

export default function ProfileSettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <User className="h-6 w-6" />
                    Profile Settings
                </h1>
                <p className="text-muted-foreground mt-1">
                    Manage your profile information and account details
                </p>
            </div>

            <ProfileForm />
        </div>
    )
}
