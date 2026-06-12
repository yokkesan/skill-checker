<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\RepositoryController;

Route::post(
    '/repositories',
    [RepositoryController::class, 'store']
);