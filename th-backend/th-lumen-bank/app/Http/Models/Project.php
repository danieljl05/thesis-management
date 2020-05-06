<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Project extends Model {

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id', 'description', 'state', 'program_id', 'created_at', 'modified_at'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];
}