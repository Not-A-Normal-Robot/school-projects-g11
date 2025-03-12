<?php

use Illuminate\Support\Facades\Route;

// import product controller
use App\Http\Controllers\ProductController;

Route::resource('/products', ProductController::class);

Route::get('/', function () {
    return view('welcome');
});