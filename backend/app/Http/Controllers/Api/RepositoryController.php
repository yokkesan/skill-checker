<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Repository;
use App\Models\SkillCheck;
use App\Services\GithubRepositoryService;
use App\Services\SkillScoreService;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class RepositoryController extends Controller
{
    public function __construct(
        private GithubRepositoryService $githubService,
        private SkillScoreService $scoreService
    ) {}

    public function store(Request $request)
    {
        $request->validate([
            'github_url' => ['required', 'url'],
            'repository_name' => ['required', 'string'],
            'branch_name' => ['nullable', 'string']
        ]);

        $repository = Repository::create([
            'user_id' => 1,
            'github_url' => $request->github_url,
            'repository_name' => $request->repository_name,
            'branch_name' => $request->branch_name ?? 'main',
            'status' => 'pending'
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
            'repository_id' => $repository->id,
            'total_score' => $totalScore,
            'comment' => '解析開始',
            'status' => 'processing',
            'started_at' => now(),
        ]);

        return response()->json([
            'message' => 'Repository created',
            'repository' => $repository
        ], 201);
    }


    public function index()
    {
        $repositories =
            Repository::all();

        $githubRepositories = [];
        $contributions = [];

        foreach ($repositories as $repository) {

            $githubRepositories[$repository->id] =
                $this->githubService
                ->getRepository(
                    $repository->github_url
                );

            $commits =
                $this->githubService
                ->getCommits(
                    $repository->github_url
                );

            foreach ($commits as $commit) {

                $date = substr( $commit['commit']['author']['date'], 0, 10 );

                $contributions[$date] = ($contributions[$date] ?? 0) + 1;
            }
        }

        $this->syncSkillChecks(
            $repositories,
            $githubRepositories
        );

        return response()->json([
            'repositories' =>
            $this->formatRepositories(
                $repositories,
                $githubRepositories
            ),

            'contributions' =>$contributions
        ]);
    }

    public function show(
        Repository $repository
    ) {
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

        $score =
            SkillCheck::where(
                'repository_id',
                $repository->id
            )
            ->value('total_score')
            ?? 0;

        return response()->json([
            'repository' => [
                'id' =>
                $repository->id,

                'repository_name' =>
                $repository->repository_name,

                'github_url' =>
                $repository->github_url,

                'branch_name' =>
                $repository->branch_name,

                'status' =>
                $repository->status,

                'score' =>
                $score,

                'technologies' =>
                array_keys(
                    $languages
                ),

                'description' =>
                $githubRepository['description']
                    ?? '',

                'stars' =>
                $githubRepository['stargazers_count']
                    ?? 0,

                'forks' =>
                $githubRepository['forks_count']
                    ?? 0,

                'updated_at' =>
                $githubRepository['updated_at']
                    ?? null,
            ],
        ]);
    }

    private function syncSkillChecks(
        Collection $repositories,
        array $githubRepositories
    ): void
    {
        $repositories->each(
            function ($repository)
            use ($githubRepositories) {

                $githubRepository =
                    $githubRepositories[
                        $repository->id
                    ];

                $totalScore =
                    $this->scoreService
                        ->calculate(
                            $githubRepository
                        );

                SkillCheck::updateOrCreate(
                    [
                        'repository_id' =>
                            $repository->id
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

    private function formatRepositories(
        Collection $repositories,
        array $githubRepositories
    ): Collection {
        return $repositories->map(
            function ($repository)
            use ($githubRepositories) {

                $githubRepository =
                    $githubRepositories[$repository->id];

                $score =
                    SkillCheck::where(
                        'repository_id',
                        $repository->id
                    )
                    ->value('total_score')
                    ?? 0;

                return [
                    'id' => $repository->id,

                    'repository_name' => $repository->repository_name,

                    'github_url' => $repository->github_url,

                    'branch_name' => $repository->branch_name,

                    'status' => $repository->status,

                    'score' => $score,

                    'technologies' => [ $githubRepository['language'] ?? 'Unknown', ],

                    'analyzed_at' => $githubRepository['updated_at'] ?? null,
                ];
            }
        );
    }
}