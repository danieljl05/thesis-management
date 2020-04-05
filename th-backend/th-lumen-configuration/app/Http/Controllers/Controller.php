<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
        'unauthorized' => 401,
        'error' => 500
	];

    /**
     * Generic data transformation
     */
   protected function upsert($data) {
        $instance = null;
        if(array_key_exists('id', $data)) {
            $instance = $this->find($data['id']);
            unset($data['id']);
        }
        $instance = ($instance == null ? new $this->model($data) :  $this->assignData($instance, $data));
        $instance->save();
        return $instance;
    }
 
    protected function all() {
        return $this->model::all();
    }

    protected function find($id) {
        return $this->model::find($id);
    }

    protected function findOrFail($id) {
        return $this->model::findOrFail($id);
    }

    protected function remove($id) {
        $instance = $this->findOrFail($id);
		return $instance->delete();
    }

    /**
     * Rest implementations
     */

    public function save(Request $request) {
        try {
            $instance = $this->upsert($request->all());
            return $this->respond('created', $instance);
        } catch (\Exception $e) {
            return $this->respond('error', $this->getErrorMessage($e));
        }
    }

    public function getAll() {
        try {
            return $this->respond('ok', $this->all());
        } catch (\Exception $e) {
            return $this->respond('error', $this->getErrorMessage($e));
        }   
    }
    
    public function getById($id) {
        try {
            return $this->respond('ok', $this->findOrFail($id));
        } catch (\Exception $e) {
            return $this->respond('not_found', $this->getErrorMessage($e));
        } 
    }

    public function delete($id) {
        try {
            $this->remove($id);
            return $this->respond('deleted', ['deleted' => true]);
        } catch (\Exception $th) {
            return $this->respond('not_found', ['deleted' => false]);
        }
    }

    /**
     * Helpers
     */
    protected function assignData($obj, $data) {        
        foreach ($data as $property => $value) {
            $obj->{$property} = $value;
        }
        return $obj;
    }

    protected function getErrorMessage($e) {
        return ['message' => $e->getMessage()];
    }

    protected function respond($status, $data = []) {
    	return response()->json($data, $this->statusCodes[$status]);
    }

    protected function respondWithToken($token) {
        return $this->respond('ok', [
            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' => Auth::factory()->getTTL() * 60
        ]);
    }
}
