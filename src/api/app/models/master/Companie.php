<?php

namespace App\Models\master;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Companie extends Model
{
    use SoftDeletes;
    // protected $appends = ['delete_at'];
    protected $fillable = [
        'code',
        'description',
    ];

    public function areas()
    {
        return $this->hasMany(Area::class);
    }

    public function categories()
    {
        return $this->belongsToMany(Categorie::class);
    }

    /* public function getDeleteAtAttribute()
    {
        $rs = Carbon::createFromFormat('Y-m-d H:i:s', $this->deleted_at)->format('Y-m-d');
        return $rs;
    } */
}
