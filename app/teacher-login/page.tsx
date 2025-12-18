'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertCircle, GraduationCap } from 'lucide-react'
import Link from 'next/link'

export default function TeacherLogin() {
    const router = useRouter()
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        // Hardcoded credentials check
        if (name === 'Subham Bhattacharya' && password === '12345678') {
            // Set admin session
            const adminData = {
                name: 'Subham Bhattacharya',
                email: 'admin@evalvai.com',
                role: 'admin',
                isAdmin: true
            }

            // Store in localStorage and cookie
            localStorage.setItem('adminSession', JSON.stringify(adminData))
            document.cookie = `admin=${encodeURIComponent(JSON.stringify(adminData))}; path=/; max-age=86400`

            // Redirect to admin dashboard
            router.push('/admin')
        } else {
            setError('Invalid credentials. Only authorized teachers can access this area.')
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center px-4 py-12">
            <Card className="w-full max-w-md border-border shadow-lg">
                <CardHeader className="text-center space-y-2">
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                        <GraduationCap className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-3xl">Teacher Login</CardTitle>
                    <CardDescription>
                        Admin access for authorized teachers only
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        {error && (
                            <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-lg">
                                <AlertCircle size={18} />
                                <span className="text-sm">{error}</span>
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? 'Signing in...' : 'Sign In as Teacher'}
                        </Button>

                        <div className="text-center text-sm space-y-2">
                            <p className="text-muted-foreground">
                                Not a teacher?{' '}
                                <Link href="/sign-in" className="text-primary hover:underline font-semibold">
                                    Student Login
                                </Link>
                            </p>
                            <p className="text-muted-foreground">
                                <Link href="/" className="text-primary hover:underline">
                                    Back to Home
                                </Link>
                            </p>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
