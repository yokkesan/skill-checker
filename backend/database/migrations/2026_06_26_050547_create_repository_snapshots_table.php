<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('repository_snapshots', function (Blueprint $table) {
            $table->id();

            $table->foreignId('repository_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->string('language')
                ->nullable();

            $table->text('description')
                ->nullable();

            $table->unsignedInteger('stars')
                ->default(0);

            $table->unsignedInteger('forks')
                ->default(0);

            $table->string('default_branch')
                ->nullable();

            $table->timestamp('last_pushed_at')
                ->nullable();

            $table->timestamp('last_synced_at')
                ->nullable();

            $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('repository_snapshots');
    }
};
