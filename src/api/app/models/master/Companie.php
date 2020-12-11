<?php

namespace App\models\master;

use Illuminate\Database\Eloquent\Model;

class Companie extends Model
{
    protected $fillable = [
        'description', 'is_active'
    ];

    public function subAreas()
    {
        return $this->hasMany(SubArea::class);
    }
}
