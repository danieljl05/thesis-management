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
     
    /**
     * User routes
     */
    $router->get('profile', 'UserController@profile');
    $router->get('users', 'UserController@allUsers');
    $router->get('users/{id}', 'UserController@singleUser');
    $router->post('user', 'UserController@allUsers');

    /**
     * Annuity Routes
     */
    $router->get('annuities', 'AnnuityController@getAll');
    $router->get('annuities/{id}', 'AnnuityController@getById');
    $router->post('annuity', 'AnnuityController@save');
 });
