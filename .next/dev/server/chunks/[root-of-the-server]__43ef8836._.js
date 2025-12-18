module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Desktop/EvalvAI-main/lib/gemini.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "geminiModel",
    ()=>geminiModel,
    "generateContent",
    ()=>generateContent,
    "generateStreamContent",
    ()=>generateStreamContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$EvalvAI$2d$main$2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/EvalvAI-main/node_modules/@google/generative-ai/dist/index.mjs [app-route] (ecmascript)");
;
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error('❌ GEMINI_API_KEY is not defined in environment variables');
    console.error('Please check your .env.local file');
    throw new Error('GEMINI_API_KEY is not defined in environment variables');
}
console.log('✅ Gemini API Key loaded:', apiKey.substring(0, 10) + '...');
const genAI = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$EvalvAI$2d$main$2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GoogleGenerativeAI"](apiKey);
const geminiModel = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash'
});
async function generateContent(prompt) {
    try {
        console.log('🤖 Calling Gemini API...');
        const result = await geminiModel.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log('✅ Gemini API response received');
        return text;
    } catch (error) {
        console.error('❌ Gemini API Error:', error);
        console.error('Error details:', {
            message: error.message,
            status: error.status,
            statusText: error.statusText
        });
        // Provide more specific error messages
        if (error.message?.includes('API_KEY_INVALID')) {
            throw new Error('Invalid Gemini API key. Please check your API key in .env.local');
        }
        if (error.message?.includes('QUOTA_EXCEEDED')) {
            throw new Error('Gemini API quota exceeded. Please try again later or upgrade your plan');
        }
        if (error.message?.includes('RATE_LIMIT')) {
            throw new Error('Rate limit exceeded. Please wait a moment and try again');
        }
        throw new Error(`Failed to generate content from Gemini API: ${error.message}`);
    }
}
async function generateStreamContent(prompt) {
    try {
        const result = await geminiModel.generateContentStream(prompt);
        return result.stream;
    } catch (error) {
        console.error('❌ Gemini API Stream Error:', error);
        throw new Error(`Failed to generate stream from Gemini API: ${error.message}`);
    }
}
}),
"[project]/Desktop/EvalvAI-main/app/api/resume-analyzer/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$EvalvAI$2d$main$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/EvalvAI-main/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$EvalvAI$2d$main$2f$lib$2f$gemini$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/EvalvAI-main/lib/gemini.ts [app-route] (ecmascript)");
;
;
async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file');
        if (!file) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$EvalvAI$2d$main$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: 'No file provided'
            }, {
                status: 400
            });
        }
        // Extract text from file
        const text = await file.text();
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

Be specific, actionable, and encouraging in your feedback.`;
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$EvalvAI$2d$main$2f$lib$2f$gemini$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateContent"])(prompt);
        // Parse the JSON response
        let analysis;
        try {
            // Extract JSON from response (in case there's extra text)
            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                analysis = JSON.parse(jsonMatch[0]);
            } else {
                throw new Error('No JSON found in response');
            }
        } catch (parseError) {
            // Fallback if parsing fails
            analysis = {
                score: 75,
                suggestedRoles: [
                    'Software Engineer',
                    'Full Stack Developer',
                    'Backend Engineer'
                ],
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
                missingSkills: [
                    'System Design',
                    'Cloud Technologies',
                    'DevOps'
                ],
                overallFeedback: response.substring(0, 500)
            };
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$EvalvAI$2d$main$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(analysis);
    } catch (error) {
        console.error('Resume Analysis Error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$EvalvAI$2d$main$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: error.message || 'Failed to analyze resume'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__43ef8836._.js.map