<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/home', function() {
    return view('home');
});

Route::get('/profile/{name}', function($name) {
    $formattedName = ucwords(str_replace('-', ' ', $name));
    return "This is the story of a person named $formattedName. Lorem ipsum dolor sit amet.";
});

Route::get('/master-project', function() {
    return view('m-project');
});