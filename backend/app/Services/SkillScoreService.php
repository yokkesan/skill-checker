<?php

namespace App\Services;

class SkillScoreService
{
    public function calculate(
        array $githubRepository
    ): int
    {
        $totalScore = 0;

        if (
            ! empty(
                $githubRepository[
                    'language'
                ]
            )
        ) {
            $totalScore += 20;
        }

        if (
            ! empty(
                $githubRepository[
                    'description'
                ]
            )
        ) {
            $totalScore += 20;
        }

        $totalScore += min(
            $githubRepository[
                'stargazers_count'
            ] ?? 0,
            20
        );

        $totalScore += min(
            $githubRepository[
                'forks_count'
            ] ?? 0,
            20
        );

        if (
            isset(
                $githubRepository[
                    'updated_at'
                ]
            )
        ) {
            $totalScore += 20;
        }

        return $totalScore;
    }
}