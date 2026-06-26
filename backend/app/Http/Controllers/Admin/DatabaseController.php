<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DatabaseController extends Controller
{
    public function index()
    {
        $tables = collect(
            config('database_gui.tables')
        )->map(function ($table) {

            return [
                'name' => $table,
                'count' => DB::table($table)->count(),
            ];
        });

        return view(
            'admin.dashboard',
            compact('tables')
        );
    }

    public function showTable(
        string $table
    ) {
        if (
            ! in_array(
                $table,
                config('database_gui.tables')
            )
        ) {
            abort(404);
        }

        $records = DB::table($table)
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