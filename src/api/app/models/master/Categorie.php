<?php

namespace App\models\master;

use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{
    protected $fillable = [
        'description', 'is_active', 'self_parent_id', 'flag_app'
    ];

    public function types()
    {
        return $this->hasMany(Type::class);
    }
}
