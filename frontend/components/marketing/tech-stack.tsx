'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils/cn'

const TECH = [
    { name: 'Next.js 14', category: 'Frontend', gradient: 'from-gray-700 to-gray-900' },
    { name: 'TypeScript', category: 'Language', gradient: 'from-blue-500 to-blue-700' },
    { name: 'Tailwind CSS', category: 'Styling', gradient: 'from-cyan-400 to-cyan-600' },
    { name: 'React 18', category: 'UI', gradient: 'from-sky-400 to-sky-600' },
    { name: 'FastAPI', category: 'Backend', gradient: 'from-green-500 to-green-700' },
    { name: 'LLaMA 3.3-70b', category: 'AI Model', gradient: 'from-purple-500 to-purple-700' },
    { name: 'Groq', category: 'Inference', gradient: 'from-orange-400 to-orange-600' },
    { name: 'MongoDB', category: 'Database', gradient: 'from-emerald-500 to-emerald-700' },
    { name: 'Redis', category: 'Cache', gradient: 'from-red-500 to-red-700' },
    { name: 'Recharts', category: 'Charts', gradient: 'from-pink-400 to-pink-600' },
    { name: 'Zustand', category: 'State', gradient: 'from-amber-500 to-amber-700' },
    { name: 'Framer Motion', category: 'Animation', gradient: 'from-violet-500 to-violet-700' },
]

export function TechStack() {
    return (
        <section id="tech" className="py-20 bg-muted/30">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-2xl mx-auto mb-12"
                >
                    <Badge variant="outline" className="mb-4">Technology</Badge>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Built with Modern Technology
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Enterprise-grade stack powering real-time scam detection and intelligence extraction
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                    {TECH.map((tech, i) => (
                        <motion.div
                            key={tech.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <Card className="hover:shadow-lg transition-all group cursor-default overflow-hidden">
                                <CardContent className="p-4 text-center relative">
                                    <div
                                        className={cn(
                                            'absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity bg-gradient-to-br',
                                            tech.gradient
                                        )}
                                    />
                                    <p className="font-semibold text-sm">{tech.name}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{tech.category}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
