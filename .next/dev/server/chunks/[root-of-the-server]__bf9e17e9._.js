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
"[project]/Desktop/EvalvAI-main/app/api/query-bot/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
        const { query } = await request.json();
        if (!query || query.trim() === '') {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$EvalvAI$2d$main$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: 'Query is required'
            }, {
                status: 400
            });
        }
        const prompt = `You are an expert AI assistant specializing in interview preparation, placement guidance, and career advice for students and professionals.

User Question: ${query}

Provide a comprehensive, helpful, and encouraging response that includes:
- Clear and actionable advice
- Relevant examples when applicable
- Step-by-step guidance if needed
- Tips and best practices
- Encouragement and motivation

Keep the response well-structured, professional, and easy to read. Use bullet points or numbered lists when appropriate.`;
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$EvalvAI$2d$main$2f$lib$2f$gemini$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateContent"])(prompt);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$EvalvAI$2d$main$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            response: response,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Query Bot Error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$EvalvAI$2d$main$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: error.message || 'Failed to process query'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__bf9e17e9._.js.map