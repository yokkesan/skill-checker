<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use App\Models\Repository;
use App\Models\SkillCheck;

class SkillCheckController extends Controller
{
    public function analyze(
        Repository $repository
    ) {
        $response = Http::post(
            config('services.analyzer.url') . '/analyze',
            [
                'repositoryId' => $repository->id,
                'githubUrl' => $repository->github_url,
            ]
        );

        $skillCheck =
            SkillCheck::create([
                'repository_id' =>
                $repository->id,

                'total_score' => 0,

                'comment' =>
                '解析開始',

                'status' =>
                'processing',

                'started_at' =>
                now(),
            ]);

        $data =
            $response->json();

        $skillCheck->update([
            'total_score' =>
            $data['score'] ?? 0,

            'status' =>
            'completed',

            'finished_at' =>
            now(),
        ]);

        return response()->json(
            $data
        );
    }
}