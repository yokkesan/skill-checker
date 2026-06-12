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
        Schema::create('check_details', function (Blueprint $table) {
            $table->id();

            $table->foreignId('skill_check_id')
                ->constrained()
                ->onDelete('cascade');

            $table->string('category');

            $table->integer('score')
                ->default(0);

            $table->text('reason')
                ->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('check_details');
    }
};