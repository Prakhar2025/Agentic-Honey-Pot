'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Settings,
    User,
    Bell,
    Shield,
    Globe,
    Palette,
    Key,
    Database,
    Server,
    Code,
    Zap,
    Check,
    Copy,
    ExternalLink,
    RefreshCw,
    Save,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'

export default function SettingsPage() {
    const [apiUrl, setApiUrl] = useState('https://scamshield-honeypot.onrender.com')
    const [apiKeyCopied, setApiKeyCopied] = useState(false)
    const [refreshRate, setRefreshRate] = useState('30')
    const [notifications, setNotifications] = useState(true)
    const [darkMode, setDarkMode] = useState(true)
    const [autoEngage, setAutoEngage] = useState(false)
    const [defaultPersona, setDefaultPersona] = useState('auto')
    const [saving, setSaving] = useState(false)

    const handleSave = async () => {
        setSaving(true)
        await new Promise((r) => setTimeout(r, 800))
        setSaving(false)
        toast.success('Settings saved successfully')
    }

    const copyApiUrl = () => {
        navigator.clipboard.writeText(apiUrl)
        setApiKeyCopied(true)
        toast.success('API URL copied')
        setTimeout(() => setApiKeyCopied(false), 2000)
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    <Settings className="h-6 w-6" />
                    Settings
                </h1>
                <p className="text-muted-foreground">
                    Manage your ScamShield configuration and preferences
                </p>
            </motion.div>

            <Tabs defaultValue="general" className="space-y-6">
                <TabsList className="grid w-full max-w-lg grid-cols-4">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="api">API</TabsTrigger>
                    <TabsTrigger value="personas">Personas</TabsTrigger>
                    <TabsTrigger value="about">About</TabsTrigger>
                </TabsList>

                {/* ─── General Tab ─── */}
                <TabsContent value="general" className="space-y-6">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        {/* Appearance */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Palette className="h-4 w-4" />
                                    Appearance
                                </CardTitle>
                                <CardDescription>Customize the dashboard look and feel</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label className="font-medium">Dark Mode</Label>
                                        <p className="text-sm text-muted-foreground">Use dark theme across the dashboard</p>
                                    </div>
                                    <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label className="font-medium">Compact View</Label>
                                        <p className="text-sm text-muted-foreground">Reduce spacing for denser layout</p>
                                    </div>
                                    <Switch />
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                        {/* Notifications */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Bell className="h-4 w-4" />
                                    Notifications
                                </CardTitle>
                                <CardDescription>Configure alert preferences</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label className="font-medium">Enable Notifications</Label>
                                        <p className="text-sm text-muted-foreground">Receive alerts for new scam detections</p>
                                    </div>
                                    <Switch checked={notifications} onCheckedChange={setNotifications} />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label className="font-medium">Sound Alerts</Label>
                                        <p className="text-sm text-muted-foreground">Play sound for critical detections</p>
                                    </div>
                                    <Switch />
                                </div>
                                <Separator />
                                <div className="space-y-2">
                                    <Label>Refresh Rate</Label>
                                    <Select value={refreshRate} onValueChange={setRefreshRate}>
                                        <SelectTrigger className="w-48">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="10">Every 10 seconds</SelectItem>
                                            <SelectItem value="30">Every 30 seconds</SelectItem>
                                            <SelectItem value="60">Every minute</SelectItem>
                                            <SelectItem value="300">Every 5 minutes</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </TabsContent>

                {/* ─── API Tab ─── */}
                <TabsContent value="api" className="space-y-6">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Globe className="h-4 w-4" />
                                    API Configuration
                                </CardTitle>
                                <CardDescription>Configure the backend API connection</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="api-url">API Base URL</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="api-url"
                                            value={apiUrl}
                                            onChange={(e) => setApiUrl(e.target.value)}
                                            placeholder="https://api.example.com"
                                            className="font-mono text-sm"
                                        />
                                        <Button variant="outline" size="icon" onClick={copyApiUrl}>
                                            {apiKeyCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="api-key">API Key (Optional)</Label>
                                    <Input
                                        id="api-key"
                                        type="password"
                                        placeholder="sk_live_..."
                                        className="font-mono text-sm"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        For authenticated API access. Leave blank for public endpoints.
                                    </p>
                                </div>

                                <Separator />

                                <div className="space-y-2">
                                    <Label>Connection Status</Label>
                                    <div className="flex items-center gap-2">
                                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-sm text-green-600 dark:text-green-400 font-medium">Connected</span>
                                        <Badge variant="outline" className="text-xs ml-auto">v1</Badge>
                                    </div>
                                </div>

                                <Button variant="outline" size="sm" className="gap-2">
                                    <RefreshCw className="h-3.5 w-3.5" />
                                    Test Connection
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Code className="h-4 w-4" />
                                    API Endpoints
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-3 text-sm">
                                    {[
                                        { method: 'POST', path: '/api/v1/honeypot/engage', desc: 'Start session' },
                                        { method: 'POST', path: '/api/v1/honeypot/continue', desc: 'Continue conversation' },
                                        { method: 'GET', path: '/api/v1/sessions', desc: 'List sessions' },
                                        { method: 'GET', path: '/api/v1/intelligence', desc: 'List intelligence' },
                                        { method: 'GET', path: '/api/v1/analytics/summary', desc: 'Analytics' },
                                        { method: 'GET', path: '/api/v1/health', desc: 'Health check' },
                                    ].map((ep) => (
                                        <div key={ep.path} className="flex items-center justify-between p-2 rounded bg-muted/50">
                                            <div className="flex items-center gap-2">
                                                <Badge variant="outline" className={`text-[10px] w-12 justify-center ${ep.method === 'POST' ? 'border-blue-500 text-blue-500' : 'border-green-500 text-green-500'
                                                    }`}>
                                                    {ep.method}
                                                </Badge>
                                                <code className="text-xs">{ep.path}</code>
                                            </div>
                                            <span className="text-xs text-muted-foreground">{ep.desc}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </TabsContent>

                {/* ─── Personas Tab ─── */}
                <TabsContent value="personas" className="space-y-6">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    Persona Configuration
                                </CardTitle>
                                <CardDescription>Configure AI persona behavior</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Default Persona</Label>
                                    <Select value={defaultPersona} onValueChange={setDefaultPersona}>
                                        <SelectTrigger className="w-64">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="auto">Auto-Select (Recommended)</SelectItem>
                                            <SelectItem value="elderly_victim">👵 Elderly Victim</SelectItem>
                                            <SelectItem value="busy_professional">🧑‍💼 Busy Professional</SelectItem>
                                            <SelectItem value="naive_student">🎓 Naive Student</SelectItem>
                                            <SelectItem value="small_business">🏪 Small Business Owner</SelectItem>
                                            <SelectItem value="curious_user">🤷 Curious User</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <p className="text-xs text-muted-foreground">
                                        Auto-select allows the AI to choose the best persona based on scam type.
                                    </p>
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label className="font-medium">Auto-Engage Mode</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Automatically respond to incoming scam messages
                                        </p>
                                    </div>
                                    <Switch checked={autoEngage} onCheckedChange={setAutoEngage} />
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label className="font-medium">Response Variation</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Vary responses to prevent detection
                                        </p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Shield className="h-4 w-4" />
                                    Safety & Ethics
                                </CardTitle>
                                <CardDescription>Configure ethical boundaries</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label className="font-medium">Safety Guardrails</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Prevent generation of harmful or illegal content
                                        </p>
                                    </div>
                                    <Switch defaultChecked disabled />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label className="font-medium">Data Anonymization</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Anonymize personal data in reports
                                        </p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label className="font-medium">Intelligence Sharing</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Share extracted intelligence with authorities
                                        </p>
                                    </div>
                                    <Switch />
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </TabsContent>

                {/* ─── About Tab ─── */}
                <TabsContent value="about" className="space-y-6">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Zap className="h-4 w-4" />
                                    About ScamShield
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-3">
                                    {[
                                        { label: 'Version', value: '1.0.0' },
                                        { label: 'API Version', value: 'v1' },
                                        { label: 'Framework', value: 'Next.js 14' },
                                        { label: 'AI Model', value: 'LLaMA 3.3-70b (Groq)' },
                                        { label: 'Category', value: 'Cybersecurity & AI' },
                                        { label: 'License', value: 'MIT' },
                                    ].map((info) => (
                                        <div key={info.label} className="flex items-center justify-between py-1.5">
                                            <span className="text-sm text-muted-foreground">{info.label}</span>
                                            <span className="text-sm font-medium">{info.value}</span>
                                        </div>
                                    ))}
                                </div>

                                <Separator />

                                <div className="flex gap-3">
                                    <Button variant="outline" size="sm" asChild>
                                        <a href="https://github.com/Prakhar2025/Agentic-Honey-Pot" target="_blank" rel="noreferrer">
                                            <span className="flex items-center gap-1">
                                                GitHub
                                                <ExternalLink className="h-3 w-3" />
                                            </span>
                                        </a>
                                    </Button>
                                    <Button variant="outline" size="sm" asChild>
                                        <a href="/docs">
                                            <span>Documentation</span>
                                        </a>
                                    </Button>
                                    <Button variant="outline" size="sm" asChild>
                                        <a href="/docs/api-reference">
                                            <span>API Reference</span>
                                        </a>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Database className="h-4 w-4" />
                                    System Info
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-3 text-sm">
                                    {[
                                        { label: 'Backend', value: 'Render', status: 'Connected' },
                                        { label: 'Database', value: 'MongoDB Atlas', status: 'Connected' },
                                        { label: 'AI Provider', value: 'Groq', status: 'Active' },
                                        { label: 'Cache', value: 'Redis', status: 'Active' },
                                    ].map((sys) => (
                                        <div key={sys.label} className="flex items-center justify-between p-2 rounded bg-muted/50">
                                            <div>
                                                <span className="font-medium">{sys.label}</span>
                                                <span className="text-muted-foreground ml-2">— {sys.value}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <div className="h-2 w-2 rounded-full bg-green-500" />
                                                <span className="text-xs text-green-600 dark:text-green-400">{sys.status}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </TabsContent>
            </Tabs>

            {/* Save Button */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-end"
            >
                <Button onClick={handleSave} disabled={saving} className="gap-2">
                    {saving ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                        <Save className="h-4 w-4" />
                    )}
                    {saving ? 'Saving...' : 'Save Settings'}
                </Button>
            </motion.div>
        </div>
    )
}
