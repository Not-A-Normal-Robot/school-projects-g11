@extends('layout')

@section('title', 'Master Project')
@section('content-title', 'Master Project')

@section('content')
<noscript>
    <h2 class="text-danger fw-bold">This page will not work properly without JavaScript enabled.</h2>
</noscript>

<div class="row row-gap-3 column-gap-3 mx-2">
    <div class="card flex-grow-10 g-0" style="flex-basis: 0; min-width: 50ch;">
        <div class="card-header d-flex justify-content-between">
            <h4 class="mt-2">Project List</h4>
            <button class="btn btn-success" id="new-project">New project</button>
        </div>
        <div class="card-body position-relative p-0 p-lg-3">
            <div class="w-100 overflow-auto">
                <table class="table" id="projects-table">
                    <tr>
                        <td>Loading...</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
    <div class="card flex-grow-1 g-0" style="flex-basis: fit-content;">
        <div class="card-header">
            <h4 class="mt-2" id="project-form-title">Add Project</h4>
        </div>
        <div class="card-body">
            <form id="project-form">
                <div class="mb-3">
                    <label for="inputName" class="form-label">Project Name</label>
                    <input type="text" placeholder="My Cool Project" class="form-control" name="name" id="inputName" minlength="5" maxlength="255" required>
                </div>
                <input type="hidden" id="project-form-index" name="index">
                <div class="mb-3">
                    <label for="inputService" class="form-label">Service Used</label>
                    <select name="serviceUsed" class="form-select" id="service-select"></select>
                </div>
                <div class="mb-3">
                    <label for="inputDesc" class="form-label">Release Date</label>
                    <input type="date" class="form-control" name="releaseDate" required>
                </div>
                <div class="mb-3">
                    <label for="inputDesc" class="form-label">Description</label>
                    <textarea class="form-control" name="description" id="inputDesc" rows="3" maxlength="255"></textarea>
                </div>
                <input type="hidden" name="status" value="Up">
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
</div>
@endsection