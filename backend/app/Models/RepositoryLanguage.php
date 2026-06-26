<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RepositoryLanguage extends Model
{
    protected $fillable = [
        'repository_snapshot_id',
        'language',
        'bytes',
    ];

    public function snapshot(): BelongsTo
    {
        return $this->belongsTo(
            RepositorySnapshot::class
        );
    }
}