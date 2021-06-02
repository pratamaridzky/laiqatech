<?php

namespace App\models\master;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Brand extends Model
{
    use SoftDeletes;
    
    protected $fillable =[
        'categorie_id', 
        'description'
    ];

    public function categorie()
    {
        return $this->belongsTo(Categorie::class);
    }
}
