<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\Repository;

use App\Models\SkillCheck;

class SkillCheckController extends Controller
{
    public function analyze(
        Repository $repository
    ) {
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

        return response()->json([
            'message' =>
                'Analysis started',

            'skill_check' =>
                $skillCheck,
        ]);
    }
}