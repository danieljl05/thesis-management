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
    return 'Hello world from configuration';
    // app('redis')->set('test', 'Hello world from redis');
    // return app('redis')->get('test');
});

// API route group
$router->group(['prefix' => 'api'], function () use ($router) {
     
    /**
     * User routes
     */
    $router->get('profile', 'UserController@profile');
    $router->get('users', 'UserController@getAll');
    $router->get('users/{id}', 'UserController@getById');
    $router->post('users', 'UserController@save');
    $router->delete('users/{id}', 'UserController@delete');

    /**
     * Annuity Routes
     */
    $router->get('annuities', 'AnnuityController@getAll');
    $router->get('annuities/{id}', 'AnnuityController@getById');
    $router->delete('annuities/{id}', 'AnnuityController@delete');
    $router->post('annuities', 'AnnuityController@save');

    /**
     * Project Routes
     */
    $router->get('projects', 'ProjectController@getAll');
    $router->get('projects/{id}', 'ProjectController@getById');
    $router->delete('projects/{id}', 'ProjectController@delete');
    $router->post('projects', 'ProjectController@save');
 });
