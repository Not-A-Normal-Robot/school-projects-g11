<?php
include './connection.php';

if (!$connection) {
    die("Failed to connect to DB: " . mysqli_connect_error());
}

$idGambar = null;

if (array_key_exists('gambar', $_FILES)) {
    $gambar = $_FILES['gambar']['tmp_name'];
    $size = $_FILES['gambar']['size'];
    
    if ($size > 16777215) {
        die(
            "Failed to upload image: image is too large. <br>\
            Image size $size is exceeds limit of 16777215. <br>\
            <a href=\"index.php\">Return</a>"
        );
    }
    
    $dataGambar = file_get_contents($gambar);

    $stmt = $connection->prepare('INSERT INTO `Images` (image) VALUES (?)');
    $success = $stmt->bind_param('b', $dataGambar);
    
    if (!$success) {
        die("Failed to bind prepared statement params (/internal/insert.php): " . mysqli_stmt_error($stmt));
    }

    $success = $stmt->execute();

    if (!$success) {
        die("Failed to insert image into table (/internal/insert.php): " . mysqli_stmt_error($stmt));
    }

    $idGambar = $connection->insert_id;
}

$nama = $_POST['nama'];
$kelas = $_POST['kelas'];
$nomor = $_POST['nomor'];

$stmt = $connection->prepare('INSERT INTO `Data` (nama, kelas, nomor, picture) VALUES (?, ?, ?, ?)');

$success = $stmt->bind_param('ssii', $nama, $kelas, $nomor, $idGambar);

if (!$success) {
    die("Failed to bind prepared statement params (/internal/insert.php): " . mysqli_stmt_error($stmt));
}

$success = $stmt->execute();

if (!$success) {
    die("Failed to insert student into table (/internal/insert.php): " . mysqli_stmt_error($stmt));
}

header('Location: /index.php');
echo 'Success!';
