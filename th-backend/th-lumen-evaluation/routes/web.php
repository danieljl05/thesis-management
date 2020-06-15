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
    return 'Hello world from evaluation';
});

// API route group
$router->group(['prefix' => 'api'], function () use ($router) {
    /**
     * Project Routes
     */
    $router->get('projects', 'ProjectController@getCurrentProjects');
    $router->post('projects/evaluate', 'ProjectController@evaluate');
    $router->get('projects/{id}/evaluation', 'ProjectController@getEvaluation');
});
