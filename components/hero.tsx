import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-primary/10 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance leading-tight">
            Master Your <span className="text-primary">Interviews</span> with AI
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 text-balance max-w-2xl mx-auto">
            Prepare for your dream job with AI-powered tools. Practice DSA questions, analyze your resume, clean your queries, and ace mock interviews.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/sign-up">
              <Button size="lg" className="min-w-max">
                Start Free Today
              </Button>
            </Link>
            <Link href="/guest">
              <Button size="lg" variant="outline" className="min-w-max">
                Try as Guest
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="bg-card rounded-xl p-6 border border-border hover:border-primary transition">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="font-bold text-lg mb-2">AI-Powered</h3>
              <p className="text-muted-foreground">Powered by Gemini API for intelligent analysis</p>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border hover:border-primary transition">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-bold text-lg mb-2">Comprehensive</h3>
              <p className="text-muted-foreground">Cover all interview types and domains</p>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border hover:border-primary transition">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="font-bold text-lg mb-2">Real Results</h3>
              <p className="text-muted-foreground">Join 1000+ students who got placed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
