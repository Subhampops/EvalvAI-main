import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-bold text-xl mb-4">InterviewAI</h3>
            <p className="text-primary-foreground/80">
              Your AI-powered companion for acing placement interviews.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><Link href="#features" className="hover:text-primary-foreground transition">Features</Link></li>
              <li><Link href="#testimonials" className="hover:text-primary-foreground transition">Testimonials</Link></li>
              <li><Link href="/pricing" className="hover:text-primary-foreground transition">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><Link href="/about" className="hover:text-primary-foreground transition">About</Link></li>
              <li><Link href="/blog" className="hover:text-primary-foreground transition">Blog</Link></li>
              <li><Link href="/careers" className="hover:text-primary-foreground transition">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><Link href="/privacy" className="hover:text-primary-foreground transition">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-primary-foreground transition">Terms</Link></li>
              <li><Link href="/contact" className="hover:text-primary-foreground transition">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/80">
          <p>&copy; 2025 InterviewAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
