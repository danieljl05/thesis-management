<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return 'Hello world from login';
    // app('redis')->set('test', 'Hello world from redis');
    // return app('redis')->get('test');
});

// API route group
$router->group(['prefix' => 'api'], function () use ($router) {
     
    // Matches "/api/profile
    $router->get('profile', 'UserController@profile');
    // Matches "/api/users
    $router->get('users', 'UserController@allUsers');
    // Matches "/api/users/1 
    //get one user by id
    $router->get('users/{id}', 'UserController@singleUser');

    /**
     * Annuity Routes
     */
    $router->get('annuity', 'AnnuityController@all');
 });
