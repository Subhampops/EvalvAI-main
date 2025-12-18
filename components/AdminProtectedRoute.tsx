'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

export default function AdminProtectedRoute({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Check if admin is logged in
        const adminSession = localStorage.getItem('adminSession')
        const adminCookie = document.cookie
            .split('; ')
            .find(row => row.startsWith('admin='))

        if (adminSession || adminCookie) {
            try {
                const adminData = adminSession ? JSON.parse(adminSession) : null
                if (adminData && adminData.isAdmin) {
                    setIsAuthenticated(true)
                } else {
                    router.push('/teacher-login')
                }
            } catch (error) {
                router.push('/teacher-login')
            }
        } else {
            router.push('/teacher-login')
        }

        setLoading(false)
    }, [router])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Card className="w-full max-w-md">
                    <CardContent className="pt-6">
                        <div className="flex flex-col items-center gap-4">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            <p className="text-muted-foreground">Verifying admin access...</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (!isAuthenticated) {
        return null
    }

    return <>{children}</>
}
