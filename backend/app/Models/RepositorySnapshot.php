<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RepositorySnapshot extends Model
{
    protected $fillable = [
        'repository_id',
        'language',
        'description',
        'stars',
        'forks',
        'default_branch',
        'last_pushed_at',
        'last_synced_at',
    ];

    public function repository(): BelongsTo
    {
        return $this->belongsTo(
            Repository::class
        );
    }

    public function languages(): HasMany
    {
        return $this->hasMany(
            RepositoryLanguage::class
        );
    }
}