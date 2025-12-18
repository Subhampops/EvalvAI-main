// GitHub API utility functions
export interface GitHubRepo {
    name: string
    description: string | null
    html_url: string
    language: string | null
    stargazers_count: number
    forks_count: number
    topics: string[]
    created_at: string
    updated_at: string
    size: number
}

export interface GitHubUser {
    login: string
    name: string | null
    bio: string | null
    public_repos: number
    followers: number
    following: number
    avatar_url: string
    html_url: string
}

export async function fetchGitHubUser(username: string): Promise<GitHubUser> {
    const response = await fetch(`https://api.github.com/users/${username}`)

    if (!response.ok) {
        throw new Error(`GitHub user not found: ${username}`)
    }

    return response.json()
}

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
    const response = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
    )

    if (!response.ok) {
        throw new Error(`Failed to fetch repositories for: ${username}`)
    }

    return response.json()
}

export function extractUsernameFromUrl(url: string): string {
    // Handle various GitHub URL formats
    // https://github.com/username
    // github.com/username
    // username

    const match = url.match(/github\.com\/([^\/]+)/) || url.match(/^([^\/]+)$/)

    if (!match) {
        throw new Error('Invalid GitHub URL or username')
    }

    return match[1]
}
