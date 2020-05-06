<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class EvItem extends Model {

    protected $table = 'ev_item';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id', 'evluation_config_id', 'name', 'percentage', 'created_at', 'modified_at'
    ];

    /**
     * Get the post that owns the comment.
     */
    public function evaluationConfig()
    {
        return $this->belongsTo('App\models\EvaluationConfig');
    }

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];
}