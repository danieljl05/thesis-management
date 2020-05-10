<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;

use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
        $this->model = 'App\Models\Project';
    }
}