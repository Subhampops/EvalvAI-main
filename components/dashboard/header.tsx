'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { LogOut, Settings } from 'lucide-react'

export function DashboardHeader({ user }: { user: any }) {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('guestSession')
    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
    router.push('/')
  }

  return (
    <header className="border-b border-border bg-card px-8 py-4 flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Dashboard</h2>
        <p className="text-sm text-muted-foreground">Welcome back!</p>
      </div>

      <div className="flex items-center gap-4">
        <Button size="sm" variant="outline" className="gap-2">
          <Settings size={18} />
          Settings
        </Button>
        <Button size="sm" variant="outline" onClick={handleLogout} className="gap-2">
          <LogOut size={18} />
          Logout
        </Button>
      </div>
    </header>
  )
}
