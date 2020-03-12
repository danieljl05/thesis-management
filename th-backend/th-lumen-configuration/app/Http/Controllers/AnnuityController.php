<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AnnuityController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
        $this->model = 'App\Models\Semester';
    }
    

    public function upsert(Request $request) {
        try {
            $semester = $this->upsertHandler($request->all());
            return $this->respond('created', ['semester' => $semester]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function all() {
        return $this->respond('ok', $this->getAll());
    }

    public function hello() {
        return 'hello world';
    }
}