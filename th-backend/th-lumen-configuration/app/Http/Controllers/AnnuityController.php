<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Semester;
use App\Models\EvaluationConfig;
use App\Models\EvItem;
use Illuminate\Support\Facades\Auth;

class AnnuityController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
        $this->model = 'App\Models\Semester';
    }

    /**
     * It saves/edit the semester including the ev config and the ev items
     */
    public function save(Request $request) {
        
        // Get request data
        $sData = $request->input('annuity'); // Object
        $eConfigData = $request->input('evaluationConfig'); // Object
        $evItemDataList = $request->input('lEvaluationItem'); // Array

        // Get semester data 
        $lEvaluationItem = [];
        $semester = $this->getModelInstance($sData);
        $evaluationConfig = $this->getModelInstance($eConfigData, 'EvaluationConfig');

        // It updates / Creates the parent records
        $semester->save();
        $evaluationConfig->semester_id = $semester->id;
        $evaluationConfig->save();

        // Get the actual evItems to know if they are gonna be deleted
        $actualEvItems = $evaluationConfig->evItems;
        if($actualEvItems->count() > 0) {
            $actualEvItems = $actualEvItems->pluck('id');
        }

        $evItemsToUpdate = [];
        $evItemsToDelete = [];
        foreach ($evItemDataList as $evItem) {

            // It gets each evItem model instance
            $eItemInstance = $this->getModelInstance($evItem, 'EvItem');
            array_push($lEvaluationItem, $eItemInstance);

            // If the record exists it saves the id for compare them 
            if($eItemInstance->id != null) {
                array_push($evItemsToUpdate, $eItemInstance->id);
            }
        }

        // It gets the evItems to delete comparing the missing ids
        foreach ($actualEvItems as $actualEvItemId) {
            if(!in_array($actualEvItemId, $evItemsToUpdate)) {
                array_push($evItemsToDelete, $actualEvItemId);
            }
        }

        // It deletes the missing ev items
        if(count($evItemsToDelete) > 0) {
            EvItem::destroy($evItemsToDelete);
        }
        
        // Ev items save
        $evaluationConfig->evItems()->saveMany($lEvaluationItem);
        $response = $this->find($semester->id);

        // Redis save
        $redisKey = 'evaluationConfig' . $response->name;
        app('redis')->set($redisKey, json_encode($response));

        // Returns the semester instance with all related data
        return $this->respond('created', $response);
    }
}