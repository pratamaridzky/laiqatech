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
Route::get('test', 'master\SubareaController@viewData');

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('register', 'auth\AuthController@register');
    Route::post('login', 'auth\AuthController@login');
    Route::post('refresh', 'auth\AuthController@refresh');
    
    Route::group([
        'middleware' => 'jwt'
    ], function() {
        Route::get('user', 'auth\AuthController@getAuthenticatedUser');
        Route::post('logout', 'auth\AuthController@logout');
    });
});


Route::group([
    'middleware' => 'jwt'
], function() {
    // company
    Route::get('company', 'master\CompanyController@viewData');
    Route::get('company/getData', 'master\CompanyController@loadData');
    Route::post('company', 'master\CompanyController@create');
    Route::post('company/delete', 'master\CompanyController@delete');
    Route::put('company/{id}', 'master\CompanyController@update');
    Route::put('company/restore/{id}', 'master\CompanyController@restore');
    
    // area
    Route::get('area', 'master\AreaController@viewData');
    Route::get('area/getData/{id?}', 'master\AreaController@loadData');
    Route::post('area', 'master\AreaController@create');
    Route::post('area/delete', 'master\AreaController@delete');
    Route::put('area/{id}', 'master\AreaController@update');
    Route::put('area/restore/{id}', 'master\AreaController@restore');

    // subarea
    Route::get('subarea', 'master\SubareaController@viewData');    
    Route::post('subarea', 'master\SubareaController@create');
    Route::put('subarea/{id}', 'master\SubareaController@update');
    Route::post('subarea/{id}', 'master\SubareaController@delete');
    Route::put('subarea/restore/{id}', 'master\SubareaController@restore');

    // brand
    Route::get('brand', 'master\BrandController@viewData');    
    Route::post('brand', 'master\BrandController@create');
    Route::get('brand/{id}', 'master\BrandController@getData');    
    Route::put('brand/{id}', 'master\BrandController@update');
    Route::delete('brand/{id}', 'master\BrandController@delete');
});
