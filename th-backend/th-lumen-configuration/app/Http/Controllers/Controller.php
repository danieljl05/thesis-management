<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Laravel\Lumen\Routing\Controller as BaseController;

class Controller extends BaseController {

    protected $model;

    protected $statusCodes = [
		'ok' => 200,
		'created' => 201,
		'deleted' => 204,
		'bad_request' => 400,
		'not_found' => 404,
		'conflict' => 409,
		'unauthorized' => 401
	];

    protected function respondWithToken($token) {
        return $this->respond('ok', [
            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' => Auth::factory()->getTTL() * 60
        ]);
    }

    protected function assignData($obj, $data) {        
        foreach ($data as $property => $value) {
            $obj->{$property} = $value;
        }
        return $obj;
    }

    protected function upsertHandler($data) {
        $instance = null;
        if(array_key_exists('id', $data)) {
            $instance = $this->model::find($data['id']);
            unset($data['id']);
        }
        $instance = ($instance == null ? new $this->model($data) :  $this->assignData($instance, $data));
        $instance->save();
        return $instance;
    }
 
    protected function getAll() {
        return $this->model::all();
    }

    protected function getById($id) {
        return $this->model::find($id);
    }

    protected function delete($id) {
        if(is_null($this->model::find($id))){
			return false;
		}
		return $this->model::destroy($id);
    }

    protected function respond($status, $data = []) {
    	return response()->json($data, $this->statusCodes[$status]);
    }
}
