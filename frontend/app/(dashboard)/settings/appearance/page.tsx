import { Metadata } from 'next'
import { Palette } from 'lucide-react'
import { ThemeSwitcher } from '@/components/settings/theme-switcher'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'

export const metadata: Metadata = {
    title: 'Appearance Settings',
    description: 'Customize the look and feel of your ScamShield dashboard',
}

export default function AppearancePage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <Palette className="h-6 w-6" />
                    Appearance
                </h1>
                <p className="text-muted-foreground mt-1">
                    Customize how ScamShield looks and feels for you
                </p>
            </div>

            <ThemeSwitcher />

            <Card>
                <CardHeader>
                    <CardTitle>Display Options</CardTitle>
                    <CardDescription>Adjust visual preferences and layout options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="compact-mode" className="text-base">Compact Mode</Label>
                            <p className="text-sm text-muted-foreground">
                                Use a more condensed layout with reduced spacing
                            </p>
                        </div>
                        <Switch id="compact-mode" />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="animations" className="text-base">Animations</Label>
                            <p className="text-sm text-muted-foreground">
                                Enable smooth transitions and motion effects
                            </p>
                        </div>
                        <Switch id="animations" defaultChecked />
                    </div>

                    <Separator />

                    <div className="space-y-2">
                        <Label htmlFor="font-size">Font Size</Label>
                        <Select defaultValue="medium">
                            <SelectTrigger id="font-size">
                                <SelectValue placeholder="Select font size" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="small">Small</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="large">Large</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Color Scheme</CardTitle>
                    <CardDescription>Choose your preferred accent color</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-6 gap-3">
                        {['blue', 'purple', 'green', 'orange', 'red', 'pink'].map((color) => (
                            <button
                                key={color}
                                className={`h-12 rounded-lg border-2 transition-all hover:scale-110 ${color === 'blue' ? 'border-primary ring-2 ring-offset-2 ring-primary' : 'border-transparent'
                                    }`}
                                style={{
                                    backgroundColor: `hsl(var(--${color}))`,
                                }}
                                aria-label={`${color} theme`}
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
