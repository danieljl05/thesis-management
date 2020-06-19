<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProjectController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
        $this->model = 'App\Models\Project';
    }

    public function getEvaluator($id)
    {
        return DB::table('users AS u')
            ->join('user_project AS up', 'u.id', '=', 'up.user_id')
            ->where('u.role', '=', 2)
            ->where('up.project_id', '=', $id)
            ->select(['u.id', 'u.name'])->get();
    }
    /**
     * Rest implementations
     */

    public function save(Request $request)
    {
        try {
            $projectData = $request->input('project');
            $evaluatorId = $request->input('evaluatorId');
            $projectData['state'] = 1;
            $instance = $this->upsert($projectData);
            $this->setProjectEvaluator($evaluatorId, $instance->id);
            return $this->respond('created', $instance);
        } catch (\Exception $e) {
            return $this->respond('error', $this->getErrorMessage($e));
        }
    }

    private function setProjectEvaluator($evaluatorId, $projectId)
    {
        DB::table('user_project')
            ->updateOrInsert(
                ['user_id' => $evaluatorId, 'project_id' => $projectId]
            );
    }
}
