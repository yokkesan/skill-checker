export type AnalysisIssue = {
    file: string;
    startLine: number;
    endLine: number;
    code: string;
    reason: string;
};

export type AnalysisDetail = {
    category: string;
    score: number;
    maxScore: number;
    message: string;

    comment: string;

    issues: AnalysisIssue[];
};

export type AnalyzeResult = {
    framework: string;
    totalScore: number;
    aiComment: string | null;
    details: AnalysisDetail[];
};