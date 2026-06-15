<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\Repository;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Http;

class RepositoryController extends Controller
{
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

        return response()->json([
            'message' => 'Repository created',
            'repository' => $repository
        ], 201);
    }

    public function index()
{
    $repositories =
        Repository::all();

    $repositories =
        $repositories->map(
            function ($repository) {

                $repoPath =
                    str_replace(
                        'https://github.com/',
                        '',
                        $repository->github_url
                    );

                $response =
                    Http::get(
                        "https://api.github.com/repos/{$repoPath}"
                    );

                $githubRepository =
                    $response->json();

                return [
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

                    'language' =>
                        $githubRepository['language']
                        ?? null,

                    'description' =>
                        $githubRepository['description']
                        ?? null,

                    'stargazers_count' =>
                        $githubRepository['stargazers_count']
                        ?? 0,

                    'forks_count' =>
                        $githubRepository['forks_count']
                        ?? 0,

                    'updated_at' =>
                        $githubRepository['updated_at']
                        ?? null,
                ];
            }
        );

    return response()->json([
        'repositories' =>
            $repositories
    ]);
}
}