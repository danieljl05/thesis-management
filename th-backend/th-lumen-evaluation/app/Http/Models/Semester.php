<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Semester extends Model {

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id', 'name', 'active'
    ];

    /**
     * Get the comments for the blog post.
     */
    public function evaluationConfig()
    {
        return $this->hasOne('App\Models\EvaluationConfig');
    }

    protected $with = ['evaluationConfig'];
    public static $snakeAttributes = false;

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];
}