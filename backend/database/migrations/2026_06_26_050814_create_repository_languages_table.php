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
        Schema::create('repository_languages', function (Blueprint $table) {
            $table->id();

            $table->foreignId('repository_snapshot_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->string('language');

            $table->unsignedBigInteger('bytes');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('repository_languages');
    }
};
