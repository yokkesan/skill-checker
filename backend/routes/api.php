<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\RepositoryController;
use App\Http\Controllers\Api\SkillCheckController;
use App\Http\Controllers\Api\RegisterController;
use App\Http\Controllers\Api\LoginController;

Route::post( '/repositories', [RepositoryController::class, 'store'] );

Route::get( '/repositories', [RepositoryController::class, 'index'] );

Route::post( '/repositories/{repository}/analyze', [SkillCheckController::class, 'analyze'] );

Route::post( '/register', [RegisterController::class, 'store'] );
Route::post( '/login', [LoginController::class, 'login'] );