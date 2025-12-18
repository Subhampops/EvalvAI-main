import { NextRequest, NextResponse } from 'next/server'
import { generateContent } from '@/lib/gemini'

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json()

    if (!query || query.trim() === '') {
      return NextResponse.json(
        { message: 'Query is required' },
        { status: 400 }
      )
    }

    const prompt = `You are an expert AI assistant specializing in interview preparation, placement guidance, and career advice for students and professionals.

User Question: ${query}

Provide a comprehensive, helpful, and encouraging response that includes:
- Clear and actionable advice
- Relevant examples when applicable
- Step-by-step guidance if needed
- Tips and best practices
- Encouragement and motivation

Keep the response well-structured, professional, and easy to read. Use bullet points or numbered lists when appropriate.`

    const response = await generateContent(prompt)

    return NextResponse.json({
      response: response,
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    console.error('Query Bot Error:', error)
    return NextResponse.json(
      { message: error.message || 'Failed to process query' },
      { status: 500 }
    )
  }
}
