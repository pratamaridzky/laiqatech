<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('register', 'auth\AuthController@register');
    Route::post('login', 'auth\AuthController@login');
    
    Route::group([
        'middleware' => 'api'
    ], function() {
        Route::get('user', 'auth\AuthController@getAuthenticatedUser');
        Route::post('logout', 'auth\AuthController@logout');
        Route::post('refresh', 'auth\AuthController@refresh');
    });
});

Route::group([
    'prefix' => 'company'
], function () {
    Route::get('/', 'master\CompanyController@index');
});