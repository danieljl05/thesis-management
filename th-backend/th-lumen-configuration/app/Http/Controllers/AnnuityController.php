<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Semester;
use App\Models\EvaluationConfig;
use App\Models\EvItem;
use Illuminate\Support\Facades\Auth;

class AnnuityController extends Controller
{

    const ACTIVE_ANNUITY_KEY = 'activeAnnuity';
    const EVALUATION_CONFIG_KEY = 'evaluationConfig';

    public function __construct()
    {
        $this->middleware('auth');
        $this->model = 'App\Models\Semester';
    }

    /**
     * It saves/edit the semester including the ev config and the ev items
     */
    public function save(Request $request)
    {

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
        if ($actualEvItems->count() > 0) {
            $actualEvItems = $actualEvItems->pluck('id');
        }

        $evItemsToUpdate = [];
        $evItemsToDelete = [];
        foreach ($evItemDataList as $evItem) {

            // It gets each evItem model instance
            $eItemInstance = $this->getModelInstance($evItem, 'EvItem');
            array_push($lEvaluationItem, $eItemInstance);

            // If the record exists it saves the id for compare them 
            if ($eItemInstance->id != null) {
                array_push($evItemsToUpdate, $eItemInstance->id);
            }
        }

        // It gets the evItems to delete comparing the missing ids
        foreach ($actualEvItems as $actualEvItemId) {
            if (!in_array($actualEvItemId, $evItemsToUpdate)) {
                array_push($evItemsToDelete, $actualEvItemId);
            }
        }

        // It deletes the missing ev items
        if (count($evItemsToDelete) > 0) {
            EvItem::destroy($evItemsToDelete);
        }

        // Ev items save
        $evaluationConfig->evItems()->saveMany($lEvaluationItem);
        $response = $this->find($semester->id);

        // Redis save
        $this->redisHandler($response);

        // Returns the semester instance with all related data
        return $this->respond('created', $response);
    }

    /**
     * It saves the cacheable info
     */
    private function redisHandler($annuity)
    {
        // It saves the current config
        $redisKey = AnnuityController::EVALUATION_CONFIG_KEY . $annuity->id;
        app('redis')->set($redisKey, json_encode($annuity));
        $this->activeAnnuityHandler($annuity);
    }


    /**
     * It sets the active annuity on cache
     */
    private function activeAnnuityHandler($annuity)
    {
        // Save active annuity id on cache
        if ($annuity->active) {
            $this->setActiveAnnuity($annuity->id);
        }
    }

    /**
     * It sets the current annuity id 
     */
    private function setActiveAnnuity($annuityId)
    {
        $this->model::where('active', '=', 1)
            ->where('id', '!=', $annuityId)
            ->update(['active' => 0]);
        app('redis')->set(AnnuityController::ACTIVE_ANNUITY_KEY, $annuityId);
    }

    /**
     * It gets the current config
     * It asks Redis for the current info, if redis doesnt have it, it makes Database query
     */
    public function getCurrentConfig()
    {
        // Current annuity id logic
        $currentAnnuityId = $this->getCurrentAnnuity();
        if ($currentAnnuityId == null) return $this->respond('not_found');

        // Current config logic
        $currentConfigKey = AnnuityController::EVALUATION_CONFIG_KEY . $currentAnnuityId;
        $currentConfig = app('redis')->get($currentConfigKey);
        if ($currentConfig == null) {
            $currentConfig = $this->find($currentAnnuityId);
            $currentConfig = count($currentConfig) > 0 ? $currentConfig[0] : $currentConfig;
        } else {
            $currentConfig = json_decode($currentConfig);
        }
        return $this->respond('ok', $currentConfig);
    }

    /**
     * It gets the current annuity Id
     */
    private function getCurrentAnnuity()
    {
        $currentAnnuityId = app('redis')->get(AnnuityController::ACTIVE_ANNUITY_KEY);
        $currentAnnuityId =  ($currentAnnuityId == null ? $this->model::where('active', '=', 1)->pluck('id') : $currentAnnuityId);
        return $currentAnnuityId;
    }
}
