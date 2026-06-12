<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SkillCheck extends Model
{
    protected $fillable = [
        'repository_id',
        'total_score',
        'comment'
    ];

    public function repository(): BelongsTo
    {
        return $this->belongsTo(Repository::class);
    }

    public function checkDetails(): HasMany
    {
        return $this->hasMany(CheckDetail::class);
    }
}