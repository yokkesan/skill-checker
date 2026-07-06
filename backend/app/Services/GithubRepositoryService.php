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

    public function getLanguages(
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
                "https://api.github.com/repos/{$repoPath}/languages"
            );

        return $response->json();
    }

    public function getContributions(
        string $githubUrl
    ): array {
        $commits =
            $this->getCommits(
                $githubUrl
            );

        $contributions = [];

        foreach ($commits as $commit) {
            if (!isset($commit['commit']['author']['date'])) {
                continue;
            }

            $date =
                substr(
                    $commit['commit']['author']['date'],
                    0,
                    10
                );

            $contributions[$date] =
                ($contributions[$date] ?? 0) + 1;
        }

        return $contributions;
    }
}