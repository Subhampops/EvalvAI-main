'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { MessageSquare, FileText, Brain, Users, LogOut, Home, Github } from 'lucide-react'
import { useState } from 'react'

export function Sidebar({ user }: { user: any }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { icon: <Home size={20} />, label: 'Dashboard', href: '/dashboard' },
    { icon: <MessageSquare size={20} />, label: 'Query Bot', href: '/dashboard/query-bot' },
    { icon: <FileText size={20} />, label: 'Resume Analyzer', href: '/dashboard/resume-analyzer' },
    { icon: <Brain size={20} />, label: 'Question Generator', href: '/dashboard/question-generator' },
    { icon: <Users size={20} />, label: 'Mock Tests', href: '/dashboard/mock-tests' },
    { icon: <Github size={20} />, label: 'GitHub Crawler', href: '/dashboard/github-crawler' },
  ]

  const handleLogout = () => {
    localStorage.removeItem('guestSession')
    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
    router.push('/')
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-card border-r border-border">
        <div className="p-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2">
            <img src="/evalvai-logo.png" alt="EvalvAI" className="w-8 h-8" />
            <span className="font-bold text-2xl text-primary">EvalvAI</span>
          </Link>
        </div>

        <nav className="flex-1 overflow-auto p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>
                  <div
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${pathname === item.href
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                      }`}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-border space-y-4">
          <div className="p-4 bg-primary/10 rounded-lg">
            <p className="text-sm text-muted-foreground">Logged in as</p>
            <p className="font-semibold text-foreground">{user?.name || 'Guest User'}</p>
            {user?.email && <p className="text-xs text-muted-foreground">{user.email}</p>}
            {user?.isGuest && <p className="text-xs text-primary font-semibold">Guest Mode</p>}
          </div>
          <Button onClick={handleLogout} variant="outline" className="w-full justify-start">
            <LogOut size={18} className="mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {isOpen && (
        <aside className="md:hidden fixed inset-0 z-40 bg-card border-r border-border w-64 overflow-y-auto">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <img src="/evalvai-logo.png" alt="EvalvAI" className="w-8 h-8" />
              <span className="font-bold text-2xl text-primary">EvalvAI</span>
            </Link>
            <button onClick={() => setIsOpen(false)} className="text-foreground">✕</button>
          </div>

          <nav className="p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={() => setIsOpen(false)}>
                    <div
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${pathname === item.href
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-muted'
                        }`}
                    >
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t border-border space-y-4">
            <div className="p-4 bg-primary/10 rounded-lg">
              <p className="text-sm text-muted-foreground">Logged in as</p>
              <p className="font-semibold text-foreground">{user?.name || 'Guest User'}</p>
            </div>
            <Button onClick={handleLogout} variant="outline" className="w-full justify-start">
              <LogOut size={18} className="mr-2" />
              Logout
            </Button>
          </div>
        </aside>
      )}

      {/* Mobile Header Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-primary text-primary-foreground rounded-lg"
        >
          ☰
        </button>
      </div>
    </>
  )
}
