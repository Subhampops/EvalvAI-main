import { NextRequest, NextResponse } from 'next/server'
import { fetchGitHubUser, fetchGitHubRepos, extractUsernameFromUrl } from '@/lib/github'
import { generateContent } from '@/lib/gemini'

export async function POST(request: NextRequest) {
    try {
        const { githubUrl } = await request.json()

        if (!githubUrl) {
            return NextResponse.json(
                { error: 'GitHub URL is required' },
                { status: 400 }
            )
        }

        // Extract username from URL
        const username = extractUsernameFromUrl(githubUrl)

        // Fetch GitHub data
        const [user, repos] = await Promise.all([
            fetchGitHubUser(username),
            fetchGitHubRepos(username)
        ])

        // Filter out forks and sort by stars
        const originalRepos = repos.filter(repo => !repo.fork)

        // Prepare data for Gemini analysis
        const repoSummary = originalRepos.map(repo => ({
            name: repo.name,
            description: repo.description || 'No description',
            language: repo.language || 'Unknown',
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            topics: repo.topics || [],
            url: repo.html_url
        }))

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

Be specific, insightful, and encouraging.`

        const analysis = await generateContent(prompt)

        // Parse the JSON response
        let result
        try {
            const jsonMatch = analysis.match(/\{[\s\S]*\}/)
            if (jsonMatch) {
                result = JSON.parse(jsonMatch[0])
            } else {
                throw new Error('No JSON found')
            }
        } catch (parseError) {
            // Fallback response
            result = {
                profileSummary: `${user.name || user.login} is a developer with ${user.public_repos} public repositories.`,
                projectTypes: [{ category: 'General Development', count: originalRepos.length, description: 'Various projects' }],
                topSkills: originalRepos.slice(0, 5).map(r => r.language).filter(Boolean),
                bestProjects: originalRepos.slice(0, 3).map(r => ({
                    name: r.name,
                    url: r.html_url,
                    reason: `${r.stargazers_count} stars`,
                    highlights: [r.description || 'No description']
                })),
                overallAssessment: analysis.substring(0, 500)
            }
        }

        return NextResponse.json({
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
        })
    } catch (error: any) {
        console.error('GitHub Crawler Error:', error)
        return NextResponse.json(
            { error: error.message || 'Failed to analyze GitHub profile' },
            { status: 500 }
        )
    }
}
