<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Repository;
use App\Models\SkillCheck;

use App\Services\GithubRepositoryService;
use App\Services\RepositorySyncService;

use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class RepositoryController extends Controller
{
    public function __construct(
        private GithubRepositoryService $githubService,
        private RepositorySyncService $repositorySyncService,
    ) {}

    public function store(
        Request $request
    ) {
        $request->validate([
            'github_url' => [
                'required',
                'url',
            ],
            'repository_name' => [
                'required',
                'string',
            ],
            'branch_name' => [
                'nullable',
                'string',
            ],
        ]);

        $repository =
            Repository::create([
                'user_id' =>
                1,

                'github_url' =>
                $request->github_url,

                'repository_name' =>
                $request->repository_name,

                'branch_name' =>
                $request->branch_name
                    ?? 'main',

                'status' =>
                'pending',
            ]);

        $this->repositorySyncService
            ->sync(
                $repository
            );

        return response()->json([
            'message' =>
            'Repository created',

            'repository' =>
            $repository,
        ], 201);
    }

    public function index()
    {
        $repositories =
            Repository::with([
                'snapshot.languages',
                'skillChecks',
            ])
            ->get();

        return response()->json([
            'repositories' =>
            $this->formatRepositories(
                $repositories
            ),

            'contributions' =>[],
        ]);
    }

    public function show(
        Repository $repository
    ) {
        $repository->load([
            'snapshot.languages',
        ]);

        $snapshot =
            $repository->snapshot;

        $score = SkillCheck::where( 'repository_id', $repository->id )
            ->orderByDesc('id')
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
                $snapshot
                    ? $snapshot->languages
                    ->pluck('language')
                    ->toArray()
                    : [],

                'description' =>
                $snapshot?->description
                    ?? '',

                'stars' =>
                $snapshot?->stars
                    ?? 0,

                'forks' =>
                $snapshot?->forks
                    ?? 0,

                'updated_at' =>
                $snapshot?->last_pushed_at,
            ],
        ]);
    }

    public function destroy(
        Repository $repository
    ) {
        $repository->delete();

        return response()->json([
            'message' => 'Repository deleted.',
        ]);
    }

    public function sync()
    {
        $repositories =
            Repository::all();

        foreach (
            $repositories as $repository
        ) {
            $this->repositorySyncService
                ->sync(
                    $repository
                );
        }

        return response()->json([
            'message' =>
            'Sync completed.',
        ]);
    }

    private function formatRepositories(
        Collection $repositories
    ): Collection {
        return $repositories->map(
            function ($repository) {

                $snapshot =
                    $repository->snapshot;

                $skillCheck =
                    $repository->skillChecks
                    ->sortByDesc('id')
                    ->first();

                return [
                    'id' => $repository->id,

                    'repository_name' =>
                    $repository->repository_name,

                    'github_url' =>
                    $repository->github_url,

                    'branch_name' =>
                    $repository->branch_name,

                    'status' =>
                    $repository->status,

                    'score' =>
                    $skillCheck?->total_score
                        ?? 0,

                    'technologies' =>
                    $snapshot
                        ? $snapshot->languages
                        ->pluck('language')
                        ->toArray()
                        : [],

                    'contributions' =>
                    $snapshot?->contributions
                        ?? [],

                    'analyzed_at' =>
                    $snapshot?->last_synced_at,
                ];
            }
        );
    }
}