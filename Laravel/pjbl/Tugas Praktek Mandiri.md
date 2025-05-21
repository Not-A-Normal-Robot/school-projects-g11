1. Jelaskan Konsep MVC pada Pemrograman Web menggunakan PHP!
2. Sebutkan 8 framework PHP
3. Jelaskan alur kerja aplikasi web yang menggunakan konsep MVC



1. MVC: Model, View, Controller
Digunakan untuk separation of concerns
Model: Objek yang me-modelkan baris-baris database
View: Bagian-bagian user interface
Controller: Abstraksi dari API

2.
| No. | Framework               | Kelebihan                               |
|-----|-------------------------|-----------------------------------------|
| 1.  | Laravel                 | Mendukung konsep MVC                    |
| 2.  | Symfony                 | Pembuatan API mudah                     |
| 3.  | Laminas                 | Mempunyai editor drag-and-drop          |
| 4.  | CodeIgniter             | Website memuat sangat cepat             |
| 5.  | CakePHP                 | Mencegah SQL injection                  |
| 6.  | YII                     | Integrasi AJAX & jQuery                 |
| 7.  | Phalcon                 | Ada fitur transaksi (integritas data)   |
| 8.  | FuelPHP                 | Mencegah CSRF dan XSS                   |

3. Model -> Controller -> View
Model memodelkan database dalam bentuk object.
Controller menggunakan model untuk membangun API.
View menggunakan API tersebut untuk membuat komponen-komponen user interface.
