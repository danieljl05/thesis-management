<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class EvaluationConfig extends Model {

    protected $table = 'evaluation_config';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id', 'semester_id', 'created_at', 'modified_at'
    ];

     /**
     * Get the post that owns the comment.
     */
    public function semester()
    {
        return $this->belongsTo('App\Models\Semester');
    }

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];
}