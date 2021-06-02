<?php

namespace App\models\master;

use App\Models\master\Area;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SubArea extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'area_id', 
        'description', 
        'is_active', 
        'address', 
        'phone1', 
        'phone2', 
        'email'
    ];

    // protected $appends = ['status_label'];

    public function area()
    {
        return $this->belongsTo(Area::class);
    }


    /* public function getStatusLabelAttribute()
    {
        $rs = 'Non Active';
        if ($this->is_active == '1') {
            $rs = 'Active';
        }
        return $rs;
    } */

}
