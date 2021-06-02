<?php

namespace App\Models\master;

use App\models\master\SubArea;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Area extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'companie_id',
        'name',
        'description'
    ];

    public function companie()
    {
        return $this->belongsTo(Companie::class);
    }

    public function subAreas()
    {
        return $this->hasMany(SubArea::class);
    }
}
