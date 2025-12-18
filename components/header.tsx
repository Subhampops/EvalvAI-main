'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src="/evalvai-logo.png" alt="EvalvAI" className="w-8 h-8" />
          <span className="font-bold text-2xl text-primary">EvalvAI</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-foreground hover:text-primary transition">
            Features
          </Link>
          <Link href="#team" className="text-foreground hover:text-primary transition">
            Team
          </Link>
          <Link href="#testimonials" className="text-foreground hover:text-primary transition">
            Testimonials
          </Link>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex gap-4">
          <Link href="/teacher-login">
            <Button variant="ghost">Teacher Login</Button>
          </Link>
          <Link href="/sign-in">
            <Button variant="outline">Sign In</Button>
          </Link>
          <Link href="/sign-up">
            <Button>Get Started</Button>
          </Link>
          <Link href="/guest">
            <Button variant="ghost">Guest</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link href="#features" className="text-foreground hover:text-primary transition">
              Features
            </Link>
            <Link href="#team" className="text-foreground hover:text-primary transition">
              Team
            </Link>
            <Link href="#testimonials" className="text-foreground hover:text-primary transition">
              Testimonials
            </Link>
            <Link href="/sign-in" className="w-full">
              <Button variant="outline" className="w-full">Sign In</Button>
            </Link>
            <Link href="/sign-up" className="w-full">
              <Button className="w-full">Get Started</Button>
            </Link>
            <Link href="/guest" className="w-full">
              <Button variant="ghost" className="w-full">Guest</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
