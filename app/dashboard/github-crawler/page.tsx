'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Github, Star, GitFork, Users, ExternalLink, Loader2 } from 'lucide-react'

interface ProjectType {
    category: string
    count: number
    description: string
}

interface BestProject {
    name: string
    url: string
    reason: string
    highlights: string[]
}

interface Analysis {
    profileSummary: string
    projectTypes: ProjectType[]
    topSkills: string[]
    bestProjects: BestProject[]
    overallAssessment: string
}

interface UserData {
    username: string
    name: string | null
    bio: string | null
    avatar: string
    profileUrl: string
    repos: number
    followers: number
}

export default function GitHubCrawler() {
    const [githubUrl, setGithubUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [userData, setUserData] = useState<UserData | null>(null)
    const [analysis, setAnalysis] = useState<Analysis | null>(null)

    const handleAnalyze = async () => {
        if (!githubUrl.trim()) {
            setError('Please enter a GitHub URL or username')
            return
        }

        setError('')
        setLoading(true)
        setUserData(null)
        setAnalysis(null)

        try {
            const response = await fetch('/api/github-crawler', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ githubUrl: githubUrl.trim() })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to analyze GitHub profile')
            }

            setUserData(data.user)
            setAnalysis(data.analysis)
        } catch (err: any) {
            setError(err.message || 'Failed to analyze GitHub profile')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-3xl font-bold mb-2">GitHub Profile Analyzer</h1>
                <p className="text-muted-foreground">
                    Analyze any GitHub profile with AI to discover project types, best work, and developer insights
                </p>
            </div>

            {/* Input Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Github className="w-5 h-5" />
                        Enter GitHub Profile
                    </CardTitle>
                    <CardDescription>
                        Enter a GitHub username or profile URL (e.g., "torvalds" or "https://github.com/torvalds")
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-2">
                        <Input
                            placeholder="GitHub username or URL"
                            value={githubUrl}
                            onChange={(e) => setGithubUrl(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
                            disabled={loading}
                        />
                        <Button onClick={handleAnalyze} disabled={loading || !githubUrl.trim()}>
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Analyzing...
                                </>
                            ) : (
                                'Analyze Profile'
                            )}
                        </Button>
                    </div>

                    {error && (
                        <div className="p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
                            {error}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Results Section */}
            {userData && analysis && (
                <div className="space-y-6">
                    {/* User Profile Card */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-start gap-4">
                                <img
                                    src={userData.avatar}
                                    alt={userData.username}
                                    className="w-20 h-20 rounded-full border-2 border-primary"
                                />
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold">{userData.name || userData.username}</h2>
                                    <p className="text-muted-foreground">@{userData.username}</p>
                                    {userData.bio && <p className="mt-2">{userData.bio}</p>}
                                    <div className="flex gap-4 mt-3 text-sm">
                                        <span className="flex items-center gap-1">
                                            <Github className="w-4 h-4" />
                                            {userData.repos} repos
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Users className="w-4 h-4" />
                                            {userData.followers} followers
                                        </span>
                                    </div>
                                    <a
                                        href={userData.profileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 mt-2 text-primary hover:underline text-sm"
                                    >
                                        View on GitHub <ExternalLink className="w-3 h-3" />
                                    </a>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Profile Summary */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{analysis.profileSummary}</p>
                        </CardContent>
                    </Card>

                    {/* Project Types */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Project Categories</CardTitle>
                            <CardDescription>Types of projects this developer works on</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-2">
                                {analysis.projectTypes.map((type, idx) => (
                                    <div key={idx} className="p-4 border rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="font-semibold">{type.category}</h3>
                                            <span className="text-sm text-muted-foreground">{type.count} projects</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{type.description}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Top Skills */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Top Skills & Technologies</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {analysis.topSkills.map((skill, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Best Projects */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Best Projects</CardTitle>
                            <CardDescription>Top projects identified by AI analysis</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {analysis.bestProjects.map((project, idx) => (
                                    <div key={idx} className="p-4 border rounded-lg space-y-2">
                                        <div className="flex items-start justify-between">
                                            <h3 className="font-semibold text-lg">{project.name}</h3>
                                            <a
                                                href={project.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-primary hover:underline flex items-center gap-1"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        </div>
                                        <p className="text-sm text-muted-foreground italic">{project.reason}</p>
                                        <ul className="space-y-1">
                                            {project.highlights.map((highlight, hIdx) => (
                                                <li key={hIdx} className="text-sm flex items-start gap-2">
                                                    <span className="text-primary mt-1">•</span>
                                                    <span>{highlight}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Overall Assessment */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Overall Assessment</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground whitespace-pre-line">{analysis.overallAssessment}</p>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    )
}
