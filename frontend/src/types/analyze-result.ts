export type AnalysisDetail = {
    category: string;
    score: number;
    message: string;
};

export type AnalyzeResult = {
    framework: string;
    totalScore: number;
    aiComment: string | null;
    details: AnalysisDetail[];
};