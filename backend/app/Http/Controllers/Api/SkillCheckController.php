<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use App\Models\Repository;
use App\Models\SkillCheck;
use App\Models\CheckDetail;

class SkillCheckController extends Controller
{
    public function analyze(
        Repository $repository
    ) {
        if (
            $repository->user_id
            !== auth()->id()
        ) {
            abort(403);
        }

        $response = Http::withHeaders([
            'X-API-KEY' =>
            config('services.analyzer.key'),
        ])
            ->post(
                config('services.analyzer.url') . '/analyze',
                [
                    'repositoryId' =>
                    $repository->id,

                    'githubUrl' =>
                    $repository->github_url,
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

        foreach (
            $data['details'] ?? []
            as $detail
        ) {
            CheckDetail::create([
                'skill_check_id' =>
                $skillCheck->id,

                'category' =>
                $detail['category'],

                'score' =>
                $detail['score'],

                'max_score' =>
                $detail['maxScore'],

                'message' =>
                $detail['message'],

                'reason' =>
                $detail['comment'],

                'issues' =>
                $detail['issues'],
            ]);
        }

        $skillCheck->update([
            'total_score' =>
            $data['totalScore'] ?? 0,

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