<?php

namespace App\models\master;

use Illuminate\Database\Eloquent\Model;

class SubArea extends Model
{
    protected $fillable = [
        'companie_id', 
        'description', 
        'is_active', 
        'address', 
        'phone1', 
        'phone2', 
        'email'
    ];

    public function companie()
    {
        return $this->belongsTo(Companie::class);
    }
}
