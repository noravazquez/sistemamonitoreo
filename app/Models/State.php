<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class State extends Model
{
    use HasFactory;

    /**
     * Get all of the configurations for the State
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function configurations(): HasMany
    {
        return $this->hasMany(Configuration::class);
    }
}
