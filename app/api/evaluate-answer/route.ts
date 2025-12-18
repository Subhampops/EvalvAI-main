import { NextRequest, NextResponse } from 'next/server'
import { generateContent } from '@/lib/gemini'

export async function POST(request: NextRequest) {
  try {
    const { question, userAnswer, correctAnswer, category } = await request.json()

    const prompt = `You are an expert evaluator for ${category} interview questions. Evaluate the user's answer.

Question: ${question}
Correct/Sample Answer: ${correctAnswer}
User's Answer: ${userAnswer}

Evaluate the user's answer and respond ONLY with valid JSON in this format:
{
  "isCorrect": <true or false>,
  "feedback": "<encouraging feedback explaining what was good and what could be improved>",
  "matchPercentage": <number 0-100 indicating how close the answer is to the correct one>
}

Be encouraging and specific in your feedback. Consider partial credit for partially correct answers.`

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
      const userAnswerLower = userAnswer.toLowerCase()
      const correctAnswerLower = correctAnswer.toLowerCase()
      const correctTerms = correctAnswerLower.split(' ').filter((w: string) => w.length > 3)
      const matchedTerms = correctTerms.filter((term: string) => userAnswerLower.includes(term))
      const matchPercentage = Math.round((matchedTerms.length / correctTerms.length) * 100)

      result = {
        isCorrect: matchPercentage > 60,
        feedback: matchPercentage > 60
          ? 'Good answer! You covered the key concepts.'
          : 'Good effort! Review the sample answer for additional insights.',
        matchPercentage
      }
    }

    return NextResponse.json(result)
  } catch (error: any) {
    console.error('Answer Evaluation Error:', error)
    return NextResponse.json(
      { message: 'Failed to evaluate answer' },
      { status: 500 }
    )
  }
}
