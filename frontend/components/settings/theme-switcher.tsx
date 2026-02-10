'use client'

import { useTheme } from 'next-themes'
import { Monitor, Moon, Sun } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils/cn'

export function ThemeSwitcher() {
    const { theme, setTheme } = useTheme()

    const themes = [
        {
            value: 'light',
            label: 'Light',
            description: 'Clean and bright interface',
            icon: Sun,
        },
        {
            value: 'dark',
            label: 'Dark',
            description: 'Easy on the eyes',
            icon: Moon,
        },
        {
            value: 'system',
            label: 'System',
            description: 'Adapts to your system preference',
            icon: Monitor,
        },
    ]

    return (
        <Card>
            <CardHeader>
                <CardTitle>Theme Preference</CardTitle>
                <CardDescription>Choose your preferred theme for the dashboard</CardDescription>
            </CardHeader>
            <CardContent>
                <RadioGroup value={theme} onValueChange={setTheme} className="grid gap-4">
                    {themes.map((themeOption) => (
                        <div key={themeOption.value}>
                            <RadioGroupItem value={themeOption.value} id={themeOption.value} className="peer sr-only" />
                            <Label
                                htmlFor={themeOption.value}
                                className={cn(
                                    'flex items-center gap-4 rounded-lg border-2 border-muted p-4 cursor-pointer',
                                    'peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5',
                                    'hover:bg-muted/50 transition-colors'
                                )}
                            >
                                <div className="p-2 rounded-lg bg-primary/10">
                                    <themeOption.icon className="h-5 w-5 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium">{themeOption.label}</p>
                                    <p className="text-sm text-muted-foreground">{themeOption.description}</p>
                                </div>
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </CardContent>
        </Card>
    )
}
