import { NextRequest, NextResponse } from 'next/server'
import { generateContent } from '@/lib/gemini'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { message: 'No file provided' },
        { status: 400 }
      )
    }

    // Extract text from file
    const text = await file.text()

    const prompt = `You are an expert resume analyst and career counselor. Analyze the following resume and provide detailed feedback.

Resume Content:
${text}

Provide your analysis in the following JSON format (respond ONLY with valid JSON, no additional text):
{
  "score": <number between 0-100>,
  "suggestedRoles": [<array of 3-5 job role suggestions based on the resume>],
  "strengths": [<array of 4-6 key strengths identified in the resume>],
  "improvements": [<array of 4-6 specific actionable improvements>],
  "missingSkills": [<array of 4-8 skills that would enhance the profile>],
  "overallFeedback": "<detailed paragraph with encouragement and specific advice>"
}

Be specific, actionable, and encouraging in your feedback.`

    const response = await generateContent(prompt)

    // Parse the JSON response
    let analysis
    try {
      // Extract JSON from response (in case there's extra text)
      const jsonMatch = response.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('No JSON found in response')
      }
    } catch (parseError) {
      // Fallback if parsing fails
      analysis = {
        score: 75,
        suggestedRoles: ['Software Engineer', 'Full Stack Developer', 'Backend Engineer'],
        strengths: [
          'Good technical foundation',
          'Relevant experience demonstrated',
          'Clear project descriptions'
        ],
        improvements: [
          'Add quantifiable metrics to achievements',
          'Include more technical depth',
          'Optimize for ATS systems'
        ],
        missingSkills: ['System Design', 'Cloud Technologies', 'DevOps'],
        overallFeedback: response.substring(0, 500)
      }
    }

    return NextResponse.json(analysis)
  } catch (error: any) {
    console.error('Resume Analysis Error:', error)
    return NextResponse.json(
      { message: error.message || 'Failed to analyze resume' },
      { status: 500 }
    )
  }
}
