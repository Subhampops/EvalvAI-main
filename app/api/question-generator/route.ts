import { NextRequest, NextResponse } from 'next/server'
import { generateContent } from '@/lib/gemini'

export async function POST(request: NextRequest) {
  try {
    const { category, difficulty, count } = await request.json()

    const prompt = `You are an expert interview question generator. Generate ${count} ${difficulty} level ${category} interview questions.

Category: ${category}
Difficulty: ${difficulty}
Number of Questions: ${count}

For each question, provide:
1. The question text
2. A helpful hint
3. A sample answer/approach

Respond ONLY with valid JSON in this exact format:
{
  "questions": [
    {
      "text": "question text here",
      "hint": "helpful hint here",
      "sampleAnswer": "detailed sample answer or approach here"
    }
  ]
}

Make the questions realistic, relevant for ${category} interviews, and appropriate for ${difficulty} difficulty level.`

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
      // Fallback with a default question
      result = {
        questions: [{
          text: `Sample ${difficulty} ${category} question`,
          hint: 'Think about the core concepts and break down the problem',
          sampleAnswer: 'Approach this systematically by identifying the key requirements first'
        }]
      }
    }

    // Add IDs and metadata to questions
    const questionsWithMetadata = result.questions.map((q: any, idx: number) => ({
      id: `q-${Date.now()}-${idx}`,
      text: q.text,
      category,
      difficulty,
      hint: q.hint,
      sampleAnswer: q.sampleAnswer
    }))

    return NextResponse.json({
      questions: questionsWithMetadata,
      totalCount: questionsWithMetadata.length
    })
  } catch (error: any) {
    console.error('Question Generator Error:', error)
    return NextResponse.json(
      { message: error.message || 'Failed to generate questions' },
      { status: 500 }
    )
  }
}
