import { Metadata } from 'next'
import { Settings, User, Bell, Shield, Globe, Palette } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
    title: 'Settings',
    description: 'Configure ScamShield settings',
}

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">
                    Manage your ScamShield configuration
                </p>
            </div>

            <div className="grid gap-6">
                {/* API Configuration */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            API Configuration
                        </CardTitle>
                        <CardDescription>
                            Configure the backend API connection
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="api-url">API URL</Label>
                                <Input
                                    id="api-url"
                                    defaultValue="https://scamshield-honeypot.onrender.com"
                                    placeholder="https://api.example.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="api-key">API Key (Optional)</Label>
                                <Input
                                    id="api-key"
                                    type="password"
                                    placeholder="Enter API key"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-green-500/10 text-green-500">
                                Connected
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                                Last checked: 2 minutes ago
                            </span>
                        </div>
                    </CardContent>
                </Card>

                {/* Default Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Settings className="h-4 w-4" />
                            Default Settings
                        </CardTitle>
                        <CardDescription>
                            Configure default behavior for new sessions
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="default-persona">Default Persona</Label>
                                <select
                                    id="default-persona"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                    defaultValue="elderly_victim"
                                >
                                    <option value="elderly_victim">👵 Elderly Victim</option>
                                    <option value="tech_novice">🤷 Tech Novice</option>
                                    <option value="eager_investor">💰 Eager Investor</option>
                                    <option value="busy_professional">👔 Busy Professional</option>
                                    <option value="helpful_auntie">👩 Helpful Auntie</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="max-turns">Max Turns per Session</Label>
                                <Input
                                    id="max-turns"
                                    type="number"
                                    defaultValue="20"
                                    min="1"
                                    max="50"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Appearance */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Palette className="h-4 w-4" />
                            Appearance
                        </CardTitle>
                        <CardDescription>
                            Customize the dashboard appearance
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Dark Mode</p>
                                <p className="text-sm text-muted-foreground">
                                    Toggle between light and dark themes
                                </p>
                            </div>
                            <Badge variant="outline">System</Badge>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Compact Mode</p>
                                <p className="text-sm text-muted-foreground">
                                    Show more content with smaller spacing
                                </p>
                            </div>
                            <Badge variant="outline">Off</Badge>
                        </div>
                    </CardContent>
                </Card>

                {/* Notifications */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Bell className="h-4 w-4" />
                            Notifications
                        </CardTitle>
                        <CardDescription>
                            Configure notification preferences
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">New Session Alerts</p>
                                <p className="text-sm text-muted-foreground">
                                    Get notified when new sessions start
                                </p>
                            </div>
                            <Badge variant="outline" className="bg-green-500/10 text-green-500">
                                Enabled
                            </Badge>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Intelligence Extracted</p>
                                <p className="text-sm text-muted-foreground">
                                    Notify when new entities are extracted
                                </p>
                            </div>
                            <Badge variant="outline" className="bg-green-500/10 text-green-500">
                                Enabled
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                {/* About */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            About ScamShield
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Version</span>
                            <Badge>v1.0.0</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Build</span>
                            <span className="font-mono text-sm">2026.02.04</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Event</span>
                            <span className="text-sm">India AI Impact Buildathon 2026</span>
                        </div>
                        <Separator />
                        <div className="text-sm text-muted-foreground">
                            ScamShield is an AI-powered agentic honeypot that autonomously engages scammers and extracts intelligence to protect potential victims.
                        </div>
                    </CardContent>
                </Card>

                {/* Save Button */}
                <div className="flex justify-end gap-2">
                    <Button variant="outline">Reset to Defaults</Button>
                    <Button>Save Changes</Button>
                </div>
            </div>
        </div>
    )
}
