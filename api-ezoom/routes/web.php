<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NewsController;

Route::get('/noticias', 'App\Http\Controllers\NewsController@index');
