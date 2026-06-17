<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\RepositoryController;
use App\Http\Controllers\Api\SkillCheckController;

Route::post( '/repositories', [RepositoryController::class, 'store'] );

Route::get( '/repositories', [RepositoryController::class, 'index'] );

Route::post( '/repositories/{repository}/analyze', [SkillCheckController::class, 'analyze'] );