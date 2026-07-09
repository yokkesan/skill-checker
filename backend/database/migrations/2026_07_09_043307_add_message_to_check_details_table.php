<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table(
            'check_details',
            function (
                Blueprint $table
            ) {
                $table->integer('max_score')
                    ->default(0)
                    ->after('score');

                $table->json('issues')
                    ->nullable()
                    ->after('reason');
            }
        );
    }

    public function down(): void
    {
        Schema::table(
            'check_details',
            function (
                Blueprint $table
            ) {
                $table->dropColumn([
                    'max_score',
                    'issues',
                ]);
            }
        );
    }
};
