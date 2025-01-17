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

Route::get('/projects', function() {
    return view('projects');
});

Route::get('/services', function() {
    return view('services');
});

Route::get('/admin', function() {
    return view('dashboard');
});