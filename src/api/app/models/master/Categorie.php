<?php

namespace App\models\master;

use App\Models\master\Companie;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Categorie extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'description', 'is_active', 'self_parent_id', 'flag_app',
    ];

    public function types()
    {
        return $this->hasMany(Type::class);
    }

    public function brands()
    {
        return $this->hasMany(Brand::class);
    }

    public function companies()
    {
        return $this->belongsToMany(Companie::class);
    }
}
