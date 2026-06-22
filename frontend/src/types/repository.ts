export type Repository = {
    id: number;
    repository_name: string;
    github_url: string;
    branch_name: string;
    status: string;
    technologies: string[];
    analyzed_at: string | null;
    score: number;
};