<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Repository;
use App\Models\SkillCheck;
use App\Models\CheckDetail;
use App\Models\User;

class DatabaseController extends Controller
{
    public function index()
    {
        $tables = [
            [
                'name' => 'repositories',
                'count' => Repository::count(),
            ],
            [
                'name' => 'skill_checks',
                'count' => SkillCheck::count(),
            ],
            [
                'name' => 'check_details',
                'count' => CheckDetail::count(),
            ],
            [
                'name' => 'users',
                'count' => User::count(),
            ],
        ];

        return view(
            'admin.dashboard',
            compact('tables')
        );
    }

    public function showTable(
        string $table
    ) {
        $allowedTables = [
            'repositories',
            'skill_checks',
            'check_details',
            'users',
        ];

        if (
            !in_array(
                $table,
                $allowedTables
            )
        ) {
            abort(404);
        }

        $records =
            \Illuminate\Support\Facades\DB
                ::table($table)
                ->latest('id')
                ->get();

        return view(
            'admin.table',
            compact(
                'table',
                'records'
            )
        );
    }
}