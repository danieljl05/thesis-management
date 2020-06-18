<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use  App\User;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    /**
     * Instantiate a new UserController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
        $this->model = 'App\User';
    }

    /**
     * Get the authenticated User.
     *
     * @return Response
     */
    public function profile()
    {
        return response()->json(['user' => Auth::user()], 200);
    }

    /**
     * Get all User.
     *
     * @return Response
     */
    public function allUsers()
    {
        return response()->json(['users' =>  User::all()], 200);
    }

    /**
     * save
     * @return Response
     */
    public function save(Request $request)
    {
        $sData = $request->input('user');
        if (array_key_exists('password', $sData)) {
            $sData['password'] = app('hash')->make($sData['password']);
        }
        $user = $this->getModelInstance($sData);
        $user->save();

        if ($request->has('programsId')) {
            $sPrograms = $request->input('programsId');
            DB::table('program_user')
                ->where('user_id', '=', $user->id)
                ->whereNotIn('program_id', $sPrograms)
                ->delete();
            foreach ($sPrograms as $key => $programId) {
                DB::table('program_user')->updateOrInsert(['user_id' => $user->id, 'program_id' => $programId]);
            }
        }

        return $this->respond('created', ['user' => $this->find($user->id)]);
    }


    public function getAll()
    {
        try {
            return $this->respond('ok', $this->model::where('id', '!=', 1)->get());
        } catch (\Exception $e) {
            return $this->respond('error', $this->getErrorMessage($e));
        }
    }

    public function getPrograms()
    {
        try {
            return $this->respond('ok', DB::table('programs')->orderBy('name')->get());
        } catch (\Exception $e) {
            return $this->respond('error', $this->getErrorMessage($e));
        }
    }

    public function evaluatorsByProgram($id)
    {
        return DB::table('users AS u')
            ->join('program_user AS pu', 'u.id', '=', 'pu.user_id')
            ->where('u.role', '=', 2)
            ->where('pu.program_id', '=', $id)
            ->select(['u.id', 'u.name'])->get();
    }
}
