<?php

namespace App\Providers;

use App\Models\Repository;
use App\Policies\RepositoryPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        Gate::policy(
            Repository::class,
            RepositoryPolicy::class
        );
    }
}