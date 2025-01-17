@extends('layout')

@section('title', 'Dashboard')
@section('content-title', 'Dashboard')

@section('content')
<noscript>
    <h2 class="text-danger fw-bold">This page will not work properly without JavaScript enabled.</h2>
</noscript>

<div class="card my-4">
    <div class="card-header">
        <h4 class="my-2">Services List</h4>
    </div>
    <div class="card-body position-relative">
        <div class="w-100 overflow-auto">
            <table class="table table-responsive dashboard" id="services-table">
                <tr>
                    <td>Loading...</td>
                </tr>
            </table>
        </div>
    </div>
</div>

<div class="card my-4">
    <div class="card-header">
        <h4 class="my-2">Project List</h4>
    </div>

    <div class="card-body position-relative">
        <div class="w-100 overflow-auto">
            <table class="table table-responsive dashboard" id="projects-table">
                <tr>
                    <td>Loading...</td>
                </tr>
            </table>
        </div>
    </div>
</div>
@endsection