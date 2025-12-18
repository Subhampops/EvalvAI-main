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
"[project]/Desktop/EvalvAI-main/lib/github.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// GitHub API utility functions
__turbopack_context__.s([
    "extractUsernameFromUrl",
    ()=>extractUsernameFromUrl,
    "fetchGitHubRepos",
    ()=>fetchGitHubRepos,
    "fetchGitHubUser",
    ()=>fetchGitHubUser
]);
async function fetchGitHubUser(username) {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
        throw new Error(`GitHub user not found: ${username}`);
    }
    return response.json();
}
async function fetchGitHubRepos(username) {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    if (!response.ok) {
        throw new Error(`Failed to fetch repositories for: ${username}`);
    }
    return response.json();
}
function extractUsernameFromUrl(url) {
    // Handle various GitHub URL formats
    // https://github.com/username
    // github.com/username
    // username
    const match = url.match(/github\.com\/([^\/]+)/) || url.match(/^([^\/]+)$/);
    if (!match) {
        throw new Error('Invalid GitHub URL or username');
    }
    return match[1];
}
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
"[project]/Desktop/EvalvAI-main/app/api/github-crawler/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$EvalvAI$2d$main$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/EvalvAI-main/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$EvalvAI$2d$main$2f$lib$2f$github$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/EvalvAI-main/lib/github.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$EvalvAI$2d$main$2f$lib$2f$gemini$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/EvalvAI-main/lib/gemini.ts [app-route] (ecmascript)");
;
;
;
async function POST(request) {
    try {
        const { githubUrl } = await request.json();
        if (!githubUrl) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$EvalvAI$2d$main$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'GitHub URL is required'
            }, {
                status: 400
            });
        }
        // Extract username from URL
        const username = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$EvalvAI$2d$main$2f$lib$2f$github$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extractUsernameFromUrl"])(githubUrl);
        // Fetch GitHub data
        const [user, repos] = await Promise.all([
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$EvalvAI$2d$main$2f$lib$2f$github$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchGitHubUser"])(username),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$EvalvAI$2d$main$2f$lib$2f$github$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchGitHubRepos"])(username)
        ]);
        // Filter out forks and sort by stars
        const originalRepos = repos.filter((repo)=>!repo.fork);
        // Prepare data for Gemini analysis
        const repoSummary = originalRepos.map((repo)=>({
                name: repo.name,
                description: repo.description || 'No description',
                language: repo.language || 'Unknown',
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                topics: repo.topics || [],
                url: repo.html_url
            }));
        const prompt = `You are an expert developer and project analyst. Analyze the following GitHub profile and repositories.

GitHub User: ${user.name || user.login}
Bio: ${user.bio || 'No bio'}
Total Public Repos: ${user.public_repos}
Followers: ${user.followers}

Repositories (${originalRepos.length} original projects):
${JSON.stringify(repoSummary, null, 2)}

Provide a comprehensive analysis in the following JSON format (respond ONLY with valid JSON):
{
  "profileSummary": "<2-3 sentence summary of the developer's profile and expertise>",
  "projectTypes": [
    {
      "category": "<category name like 'Web Development', 'Machine Learning', etc>",
      "count": <number of projects>,
      "description": "<brief description of projects in this category>"
    }
  ],
  "topSkills": [<array of 5-8 main programming languages and technologies>],
  "bestProjects": [
    {
      "name": "<project name>",
      "url": "<project URL>",
      "reason": "<why this is one of the best projects>",
      "highlights": [<array of 2-3 key highlights>]
    }
  ],
  "overallAssessment": "<detailed paragraph about the developer's strengths, project quality, and recommendations>"
}

Select 3-5 best projects based on:
- Stars and forks
- Code quality indicators (description, topics, language)
- Project complexity and impact
- Recency and maintenance

Be specific, insightful, and encouraging.`;
        const analysis = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$EvalvAI$2d$main$2f$lib$2f$gemini$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateContent"])(prompt);
        // Parse the JSON response
        let result;
        try {
            const jsonMatch = analysis.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                result = JSON.parse(jsonMatch[0]);
            } else {
                throw new Error('No JSON found');
            }
        } catch (parseError) {
            // Fallback response
            result = {
                profileSummary: `${user.name || user.login} is a developer with ${user.public_repos} public repositories.`,
                projectTypes: [
                    {
                        category: 'General Development',
                        count: originalRepos.length,
                        description: 'Various projects'
                    }
                ],
                topSkills: originalRepos.slice(0, 5).map((r)=>r.language).filter(Boolean),
                bestProjects: originalRepos.slice(0, 3).map((r)=>({
                        name: r.name,
                        url: r.html_url,
                        reason: `${r.stargazers_count} stars`,
                        highlights: [
                            r.description || 'No description'
                        ]
                    })),
                overallAssessment: analysis.substring(0, 500)
            };
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$EvalvAI$2d$main$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            user: {
                username: user.login,
                name: user.name,
                bio: user.bio,
                avatar: user.avatar_url,
                profileUrl: user.html_url,
                repos: user.public_repos,
                followers: user.followers
            },
            analysis: result,
            totalRepos: originalRepos.length
        });
    } catch (error) {
        console.error('GitHub Crawler Error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$EvalvAI$2d$main$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message || 'Failed to analyze GitHub profile'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1752c512._.js.map