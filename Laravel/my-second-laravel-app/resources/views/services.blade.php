@extends('layout')

@section('title', 'Services')
@section('content-title', 'Services')

@section('content')
<noscript>
    <h2 class="text-danger fw-bold">This page will not work properly without JavaScript enabled.</h2>
</noscript>

<div class="row row-gap-2 column-gap-3 flex-xl-nowrap mx-2">
    <div class="card flex-grow-10 g-0" style="flex-basis: 0; min-width: 50ch;">
        <div class="card-header d-flex justify-content-between">
            <h4 class="mt-2">Services List</h4>
            <button class="btn btn-success" id="new-service">New service</button>
        </div>
        <div class="card-body position-relative p-0 p-lg-3">
            <div class="w-100 overflow-auto">
                <table class="table" id="services-table">
                    <tr>
                        <td>Loading...</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
    <div class="card flex-grow-1 g-0" style="flex-basis: fit-content;">
        <div class="card-header">
            <h4 class="mt-2" id="service-form-title">Add Service</h4>
        </div>
        <div class="card-body">
            <form id="service-form">
                <div class="mb-3">
                    <label for="inputName" class="form-label">Service Name</label>
                    <input type="text" placeholder="My New Service" class="form-control" name="name" id="inputName" minlength="5" maxlength="255" required>
                </div>
                <input type="hidden" id="service-form-index" name="index">
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