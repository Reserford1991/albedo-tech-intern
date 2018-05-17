<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//main page with registration form
Route::get('/', 'PagesController@index');

//route to show table with members
Route::get('table', 'PagesController@showTable');

//ajax request to save first part of the form
Route::post('/ajax/sendData', 'AjaxController@store');

//ajax request to save second part of the form
Route::post('/ajax/addData', 'AjaxController@updateData');

//ajax request to get current number of members
Route::post('/ajax/getAllNum', 'AjaxController@getAllNum');

Route::post('table/ajax/hideMember', 'AjaxController@hideMember');

Route::post('table/ajax/showMember', 'AjaxController@showMember');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
