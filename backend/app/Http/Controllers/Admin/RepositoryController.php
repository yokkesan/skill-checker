<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Repository;

class RepositoryController extends Controller
{
    public function index()
    {
        $repositories =
            Repository::latest()->get();

        return view(
            'admin.repositories.index',
            compact('repositories')
        );
    }
}