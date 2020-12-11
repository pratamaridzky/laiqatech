<?php

namespace App\models\master;

use Illuminate\Database\Eloquent\Model;

class Type extends Model
{
    protected $fillable = [
        'description', 'is_active', 'categorie_id'
    ];

    public function categorie()
    {
        return $this->belongsTo(Categorie::class);
    }
}
