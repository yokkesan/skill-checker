<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CheckDetail extends Model
{
    protected $fillable = [
        'skill_check_id',
        'category',
        'score',
        'reason'
    ];

    public function skillCheck(): BelongsTo
    {
        return $this->belongsTo(SkillCheck::class);
    }
}