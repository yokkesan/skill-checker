<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Repository;
use Illuminate\Http\Request;

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
        $repositories = Repository::all();

        return response()->json([
            'repositories' => $repositories
        ]);
    }
}