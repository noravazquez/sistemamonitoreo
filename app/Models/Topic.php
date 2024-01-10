<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Topic extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'nombre_corto',
        'configuration_id'
    ];

    /**
     * Get the configuration that owns the Topic
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function configuration(): BelongsTo
    {
        return $this->belongsTo(Configuration::class);
    }

    public function user(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }
}
