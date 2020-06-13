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

    public function choose($id)
    {
        $project = $this->model::find($id);
        $project->state = 1;
        $project->save();
        DB::table('user_project')->insert([
            'user_id' => JWTAuth::user()->id,
            'project_id' => $id
        ]);
        return $this->respond('ok');
    }

    public function getCurrentProject()
    {
        $projects = DB::table('user_project')
            ->where('user_id', '=', JWTAuth::user()->id)
            ->pluck('project_id');
        $projectId = count($projects) > 0 ? $projects[0] : null;
        $response = null;
        if ($projectId != null)
            $response = $this->model::find($projectId);
        return $this->respond('ok', $response);
    }
}
