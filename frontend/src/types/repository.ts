export type Repository = {
    id: number;
    repository_name: string;
    github_url: string;
    branch_name: string;
    status: string;
    technologies: string[];
    analyzed_at: string | null;
    score: number;
    contributions?: Record<string, number>;

    language?: string;
    description?: string;
    stars?: number;
    forks?: number;
    updated_at?: string | null;
};