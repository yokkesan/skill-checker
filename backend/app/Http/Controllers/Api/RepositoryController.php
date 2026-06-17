<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Repository;
use App\Models\SkillCheck;
use App\Services\GithubRepositoryService;
use App\Services\SkillScoreService;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class RepositoryController
    extends Controller
{
    public function __construct(
        private GithubRepositoryService
            $githubService,

        private SkillScoreService
            $scoreService
    ) {}

    public function store(
        Request $request
    )
    {
        $request->validate([
            'github_url' => [
                'required',
                'url'
            ],

            'repository_name' => [
                'required',
                'string'
            ],

            'branch_name' => [
                'nullable',
                'string'
            ]
        ]);

        $repository =
            Repository::create([
                'user_id' => 1,

                'github_url' =>
                    $request->github_url,

                'repository_name' =>
                    $request->repository_name,

                'branch_name' =>
                    $request->branch_name
                    ?? 'main',

                'status' =>
                    'pending'
            ]);

        $githubRepository =
            $this->githubService
                ->getRepository(
                    $repository->github_url
                );

        $totalScore =
            $this->scoreService
                ->calculate(
                    $githubRepository
                );

        SkillCheck::create([
            'repository_id' =>
                $repository->id,

            'total_score' =>
                $totalScore,

            'comment' =>
                '解析開始',

            'status' =>
                'processing',

            'started_at' =>
                now(),
        ]);

        return response()->json([
            'message' =>
                'Repository created',

            'repository' =>
                $repository
        ], 201);
    }

    public function index()
    {
        $repositories =
            Repository::all();

        $this->syncSkillChecks(
            $repositories
        );

        return response()->json([
            'repositories' =>
                $this
                    ->formatRepositories(
                        $repositories
                    )
        ]);
    }

    private function
    syncSkillChecks(
        Collection $repositories
    ): void
    {
        $repositories->each(
            function ($repository) {

                $githubRepository =
                    $this->githubService
                        ->getRepository(
                            $repository
                                ->github_url
                        );

                $totalScore =
                    $this->scoreService
                        ->calculate(
                            $githubRepository
                        );

                SkillCheck
                    ::updateOrCreate(
                        [
                            'repository_id' =>
                                $repository
                                    ->id
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
        );
    }

    private function
    formatRepositories(
        Collection $repositories
    ): Collection
    {
        return $repositories->map(
            function ($repository) {

                $githubRepository =
                    $this->githubService
                        ->getRepository(
                            $repository
                                ->github_url
                        );

                $score =
                    SkillCheck::where(
                        'repository_id',
                        $repository->id
                    )
                    ->value(
                        'total_score'
                    ) ?? 0;

                return [
                    'id' =>
                        $repository->id,

                    'repository_name' =>
                        $repository
                            ->repository_name,

                    'github_url' =>
                        $repository
                            ->github_url,

                    'branch_name' =>
                        $repository
                            ->branch_name,

                    'status' =>
                        $repository
                            ->status,

                    'score' =>
                        $score,

                    'language' =>
                        $githubRepository[
                            'language'
                        ] ?? null,

                    'description' =>
                        $githubRepository[
                            'description'
                        ] ?? null,

                    'stargazers_count' =>
                        $githubRepository[
                            'stargazers_count'
                        ] ?? 0,

                    'forks_count' =>
                        $githubRepository[
                            'forks_count'
                        ] ?? 0,

                    'updated_at' =>
                        $githubRepository[
                            'updated_at'
                        ] ?? null,
                ];
            }
        );
    }
}