<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Semester;
use App\Models\EvaluationConfig;
use App\Models\EvItem;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\DB;

class ProjectController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
        $this->model = 'App\Models\Project';
    }

    public function getAllByProgram()
    {
        try {
            $response = $this->model::whereIn('program_id', $this->getProgramsIdList())
                ->where('state', 0)
                ->get();
            return $this->respond('ok', $response);
        } catch (\Exception $e) {
            return $this->respond('error', $this->getErrorMessage($e));
        }
    }

    private function getProgramsIdList()
    {
        return DB::table('program_user')->where('user_id', '=', JWTAuth::user()->id)->pluck('program_id');
    }

    public function evaluate(Request $request)
    {
        try {
            //code...

            // Get request data
            $project = $request->input('project'); // Object
            $approved = $request->input('approved'); // Object
            $lNewEvaluation = $request->input('lNewEvaluation'); // Array
            $lUpdateEvaluation = $request->input('lUpdateEvaluation'); // Array

            // Scores upsert
            $this->upsertScores($lNewEvaluation, $lUpdateEvaluation);
            // Update project state
            $this->updateprojectState($project, $approved);

            return $this->respond('ok');
        } catch (\Throwable $th) {
            return $this->respond('error', $th->getMessage());
        }
    }

    private function upsertScores($lNewEvaluation, $lUpdateEvaluation)
    {
        DB::table('proj_ev')->insert($lNewEvaluation);
        foreach ($lUpdateEvaluation as $evaluation) {
            $id = $evaluation['id'];
            unset($evaluation['id']);
            DB::table('proj_ev')
                ->where('id', '=', $id)
                ->update($evaluation);
        }
    }

    private function updateprojectState($project, $approved)
    {
        $stateId = $approved ? 2 : 3;
        return $this->model::where('id', '=', $project['id'])
            ->update(['state' => $stateId]);
    }

    public function getCurrentProjects()
    {
        $projects = DB::table('user_project')
            ->where('user_id', '=', JWTAuth::user()->id)
            ->pluck('project_id');
        $response = $this->model::whereIn('id', $projects)->where('state', '=', 1)->get();
        return $this->respond('ok', $response);
    }

    public function getEvaluation($id)
    {
        $response = DB::table('proj_ev')->where('project_id', '=', $id)->get();
        return $this->respond('ok', $response);
    }
}
