<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
      crossorigin="anonymous"
    />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <title>Dashboard - @yield('title')</title>
  </head>
  <body>
    <div class="row g-0">
        <div class="col-md-2 d-flex flex-column p-3 text-white bg-dark" style=" height: inherit; min-height: 100vh;">
            <a class="d-flex align-items-center text-white text-decoration-none" href="#">
                <span class="fw-bold fs-4 p-2">BelajarLaravel</span>
            </a>
            <hr>
            <ul class="nav nav-pills flex-column mb-auto">
                <li class="nav-item">
                    <a href="#" class="nav-link text-white active"><i class="bi bi-bank2 me-2"></i>  HOME</a>
                </li>
                <li class="nav-item"></li>
                    <a href="#" class="nav-link text-white"><i class="bi bi-toggles2 me-2"></i>  MASTER PROJECT</a>
                </li>
                <li class="nav-item"></li>
                    <a href="#" class="nav-link text-white"><i class="bi bi-ui-radios me-2"></i>  MASTER SERVICE</a>
                </li>
            </ul>
            <hr>
            <div class="dropdown">
                <a class="nav-item d-flex align-items-center text-decoration-none text-white dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bi bi-person-circle me-2"></i><strong>Admin</strong>
                </a>
                <ul class="dropdown-menu dropdown-menu-dark">
                  <li><a class="dropdown-item" href="#">Profile</a></li>
                  <li><a class="dropdown-item" href="#">Logout</a></li>
                </ul>
            </div>
        </div>
        <div class="col-md-10 bg-white">
            <div class="container-fluid">
                <div class="row p-3">
                    <h2 class="">@yield('content-title')</h2>
                </div>
                <div class="row">
                    @section('content')
                    @show
                    {{-- <div class="col-md-8">
                        <div class="card shadow">
                            <div class="card-header">
                                <h6>Data Project</h6>
                            </div>
                            <div class="card-body table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Title</th>
                                            <th>Date</th>
                                            <th style="width: 30%;">Description</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Company Profile SMKN 1 Surabaya</td>
                                            <td>20 Februari 2023</td>
                                            <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem laudantium quia natus, aspernatur perspiciatis consequuntur impedit harum, fugiat necessitatibus veritatis porro. Sequi libero iste perspiciatis atque, et distinctio nemo omnis.</td>
                                            <td>
                                                <button class="btn btn-sm btn-info" data-bs-toggle="modal" data-bs-target="#detailproject"> <i class="bi bi-eye"></i></button>
                                                <a class="btn btn-sm btn-warning" href=""><i class="bi bi-pencil-square"></i></a>
                                                <a class="btn btn-sm btn-danger" href=""><i class="bi bi-trash-fill"></i></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Company Profile SMKN 12 Surabaya</td>
                                            <td>20 Februari 2023</td>
                                            <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem laudantium quia natus, aspernatur perspiciatis consequuntur impedit harum, fugiat necessitatibus veritatis porro. Sequi libero iste perspiciatis atque, et distinctio nemo omnis.</td>
                                            <td>
                                                <button class="btn btn-sm btn-info" data-bs-toggle="modal" data-bs-target="#detailproject"><i class="bi bi-eye"></i></button>
                                                <a class="btn btn-sm btn-warning" href=""><i class="bi bi-pencil-square"></i></a>
                                                <a class="btn btn-sm btn-danger" href=""><i class="bi bi-trash-fill"></i></a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div class="modal fade" id="detailproject">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                          <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                          </div>
                                          <div class="modal-body">
                                            ...
                                          </div>
                                          <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="button" class="btn btn-primary">Save changes</button>
                                          </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card shadow">
                            <div class="card-header">
                                <h6>Tambah Project</h6>
                            </div>
                            <div class="card-body">
                                <form action="">
                                    <label class="form-label" for="">Service Type</label>
                                    <select class="form-select" name="" id="">
                                        <option value="">Web Design</option>
                                        <option value="">Web Development</option>
                                        <option value="">SEO</option>
                                    </select>
                                    <label class="form-label" for="">Project Name</label>
                                    <input class="form-control" type="text" >
                                    <label class="form-label" for="">Project Date</label>
                                    <input class="form-control" type="date" >
                                    <label class="form-label" for="">Project Picture</label>
                                    <input class="form-control" type="file">
                                    <label class="form-label" for="">Decription</label>
                                    <textarea class="form-control" name="" id=""></textarea>
                                    <label class="form-label" for="">Project Status</label>
                                    <div class="form-check">
                                        <input name="status" class="form-check-input" type="radio" checked>
                                        <label class="form-check-label" for="">Ongoing</label>
                                    </div>
                                    <div class="form-check">
                                        <input name="status" class="form-check-input" type="radio">
                                        <label class="form-check-label" for="">Finished</label>
                                    </div>
                            </div>
                            <div class="card-footer">
                                    <input class="btn btn-success" type="submit" value="Simpan">
                                    <input class="btn btn-danger" type="button" value="Cancel">
                                </form>
                            </div>
                        </div>
                    </div> --}}
                </div>
            </div>
        </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"crossorigin="anonymous"></script>
  </body>
</html>
