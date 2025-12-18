import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = process.env.GEMINI_API_KEY

if (!apiKey) {
    console.error('❌ GEMINI_API_KEY is not defined in environment variables')
    console.error('Please check your .env.local file')
    throw new Error('GEMINI_API_KEY is not defined in environment variables')
}

console.log('✅ Gemini API Key loaded:', apiKey.substring(0, 10) + '...')

const genAI = new GoogleGenerativeAI(apiKey)

export const geminiModel = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

export async function generateContent(prompt: string) {
    try {
        console.log('🤖 Calling Gemini API...')
        const result = await geminiModel.generateContent(prompt)
        const response = await result.response
        const text = response.text()
        console.log('✅ Gemini API response received')
        return text
    } catch (error: any) {
        console.error('❌ Gemini API Error:', error)
        console.error('Error details:', {
            message: error.message,
            status: error.status,
            statusText: error.statusText
        })

        // Provide more specific error messages
        if (error.message?.includes('API_KEY_INVALID')) {
            throw new Error('Invalid Gemini API key. Please check your API key in .env.local')
        }
        if (error.message?.includes('QUOTA_EXCEEDED')) {
            throw new Error('Gemini API quota exceeded. Please try again later or upgrade your plan')
        }
        if (error.message?.includes('RATE_LIMIT')) {
            throw new Error('Rate limit exceeded. Please wait a moment and try again')
        }

        throw new Error(`Failed to generate content from Gemini API: ${error.message}`)
    }
}

export async function generateStreamContent(prompt: string) {
    try {
        const result = await geminiModel.generateContentStream(prompt)
        return result.stream
    } catch (error: any) {
        console.error('❌ Gemini API Stream Error:', error)
        throw new Error(`Failed to generate stream from Gemini API: ${error.message}`)
    }
}
