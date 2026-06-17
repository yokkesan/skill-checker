<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table(
            'skill_checks',
            function (
                Blueprint $table
            ) {
                $table->string('status')
                    ->default(
                        'pending'
                    );

                $table->timestamp(
                    'started_at'
                )->nullable();

                $table->timestamp(
                    'finished_at'
                )->nullable();
            }
        );
    }

    public function down(): void
    {
        Schema::table(
            'skill_checks',
            function (
                Blueprint $table
            ) {
                $table->dropColumn([
                    'status',
                    'started_at',
                    'finished_at',
                ]);
            }
        );
    }
};