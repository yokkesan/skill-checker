<?php

namespace App\Services;

use App\Models\Repository;
use App\Models\RepositorySnapshot;
use App\Models\RepositoryLanguage;
use App\Models\SkillCheck;
use Carbon\Carbon;

class RepositorySyncService
{
    public function __construct(
        private GithubRepositoryService $githubService,
        private SkillScoreService $scoreService,
    ) {}

    public function sync(
        Repository $repository
    ): void {

        $githubRepository =
            $this->githubService
            ->getRepository(
                $repository->github_url
            );

        $languages =
            $this->githubService
            ->getLanguages(
                $repository->github_url
            );

        $contributions =
            $this->githubService
            ->getContributions(
                $repository->github_url
            );

        $snapshot =
            RepositorySnapshot::updateOrCreate(
                [
                    'repository_id' =>
                    $repository->id,
                ],
                [
                    'language' =>
                    $githubRepository['language']
                        ?? null,

                    'description' =>
                    $githubRepository['description']
                        ?? null,

                    'stars' =>
                    $githubRepository['stargazers_count']
                        ?? 0,

                    'forks' =>
                    $githubRepository['forks_count']
                        ?? 0,

                    'default_branch' =>
                    $githubRepository['default_branch']
                        ?? null,

                    'contributions' => $contributions,

                    'last_pushed_at' =>
                    isset($githubRepository['pushed_at'])
                        ? Carbon::parse(
                            $githubRepository['pushed_at']
                        )
                        : null,

                    'last_synced_at' =>
                    now(),
                ]
            );

        RepositoryLanguage::where(
            'repository_snapshot_id',
            $snapshot->id
        )->delete();

        foreach (
            $languages as $language => $bytes
        ) {
            RepositoryLanguage::create([
                'repository_snapshot_id' =>
                $snapshot->id,

                'language' =>
                $language,

                'bytes' =>
                $bytes,
            ]);
        }

        $totalScore =
            $this->scoreService
            ->calculate(
                $githubRepository
            );

        SkillCheck::updateOrCreate(
            [
                'repository_id' =>
                $repository->id,
            ],
            [
                'total_score' =>
                $totalScore,

                'comment' =>
                '解析開始',

                'status' =>
                'processing',

                'started_at' =>
                now(),
            ]
        );
    }
}