<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\DatabaseController;

Route::get('/', function () {
    return view('welcome');
});

Route::prefix('admin')->group(function () {

    Route::get( '/', [DatabaseController::class, 'index'] );

    Route::get( '/{table}', [DatabaseController::class, 'showTable'] );
});