import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageSquare, FileText, Brain, Users } from 'lucide-react'

export function Features() {
  const features = [
    {
      icon: <MessageSquare className="w-12 h-12 text-primary" />,
      title: 'Query Bot',
      description: 'Upload your placement-related queries and let our AI clean and analyze them using CJQ data + Gemini API. Get instant, curated answers.',
      highlights: ['RAG-based search', 'Data enriched', 'Instant responses']
    },
    {
      icon: <FileText className="w-12 h-12 text-primary" />,
      title: 'Resume Analyzer',
      description: 'Get comprehensive feedback on your resume. Receive job role suggestions, scoring, and targeted improvement areas.',
      highlights: ['Role suggestions', 'Performance score', 'Improvement tips']
    },
    {
      icon: <Brain className="w-12 h-12 text-primary" />,
      title: 'Question Generator',
      description: 'Practice with AI-generated interview questions across DSA, Reasoning, Quantitative, and technical domains.',
      highlights: ['10-20 questions', 'Multiple topics', 'Difficulty levels']
    },
    {
      icon: <Users className="w-12 h-12 text-primary" />,
      title: 'Mock Tests',
      description: 'Simulate real interviews with GD topics and mock tests. Get analyzed feedback on your answers.',
      highlights: ['GD topics', 'Instant feedback', 'Performance metrics']
    }
  ]

  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Powerful Tools for Interview Success
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to ace your placement interviews, all in one platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, idx) => (
            <Card key={idx} className="border border-border hover:border-primary transition hover:shadow-lg">
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle className="text-2xl">{feature.title}</CardTitle>
                <CardDescription className="text-base mt-2">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {feature.highlights.map((highlight, i) => (
                    <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      {highlight}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
