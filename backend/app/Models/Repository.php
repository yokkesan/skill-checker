<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Repository extends Model
{
    protected $fillable = [
        'user_id',
        'github_url',
        'repository_name',
        'branch_name',
        'status'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function skillChecks(): HasMany
    {
        return $this->hasMany(SkillCheck::class);
    }

    public function snapshot(): HasOne
    {
        return $this->hasOne(
            RepositorySnapshot::class
        );
    }
}