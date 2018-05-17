<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AjaxModel extends Model
{
    protected $table = 'members';

    protected $fillable = ['name', 'surname', 'birthdate', 'report', 'country', 'phone', 'mail',
        'company', 'position', 'about', 'photo', 'hidden', 'created_at'];

    public $timestamps = false;
}
