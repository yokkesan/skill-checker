<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class GithubRepositoryService
{
    public function getRepository(
        string $githubUrl
    ): array
    {
        $repoPath =
            str_replace(
                'https://github.com/',
                '',
                $githubUrl
            );

        $response =
            Http::withToken(
                env('GITHUB_TOKEN')
            )->get(
                "https://api.github.com/repos/{$repoPath}"
            );

        return
            $response->json();
    }

    public function getCommits(
        string $githubUrl
    ): array {
        $repoPath =
            str_replace(
                'https://github.com/',
                '',
                $githubUrl
            );

        $response =
            Http::withToken(
                env('GITHUB_TOKEN')
            )->get(
                "https://api.github.com/repos/{$repoPath}/commits"
            );

        return
            $response->json();
    }
}