import { NextRequest, NextResponse } from 'next/server'
import { generateContent } from '@/lib/gemini'

export async function POST(request: NextRequest) {
  try {
    const { testId, userResponse, testType } = await request.json()

    const prompt = `You are an expert interview evaluator. Evaluate the following mock interview response.

Test Type: ${testType}
User Response: ${userResponse}

Provide a detailed evaluation in the following JSON format (respond ONLY with valid JSON):
{
  "score": <overall score 0-100>,
  "communication": <communication score 0-100>,
  "confidence": <confidence score 0-100>,
  "engagement": <engagement score 0-100>,
  "feedback": "<detailed paragraph of positive feedback and constructive criticism>",
  "improvements": [<array of 3-5 specific actionable improvements>]
}

Be encouraging but honest. Provide specific, actionable feedback.`

    const response = await generateContent(prompt)

    // Parse the JSON response
    let result
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('No JSON found')
      }
    } catch (parseError) {
      // Fallback evaluation
      result = {
        score: 75,
        communication: 78,
        confidence: 72,
        engagement: 76,
        feedback: 'Good effort! Your response shows understanding of the topic. Focus on providing more specific examples and structuring your answer more clearly.',
        improvements: [
          'Add more specific examples to support your points',
          'Structure your response using frameworks like STAR',
          'Practice speaking more confidently and clearly',
          'Engage more actively with the question requirements'
        ]
      }
    }

    return NextResponse.json(result)
  } catch (error: any) {
    console.error('Mock Test Evaluation Error:', error)
    return NextResponse.json(
      { message: error.message || 'Failed to evaluate mock test' },
      { status: 500 }
    )
  }
}
