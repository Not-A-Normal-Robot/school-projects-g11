<?php
include './connection.php';

function generateUUID() {
    if (function_exists('com_create_guid')) {
        return trim(com_create_guid(), '{}');
    } else {
        return sprintf(
            '%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
            mt_rand(0, 0xffff), mt_rand(0, 0xffff),
            mt_rand(0, 0xffff),
            mt_rand(0, 0x0fff) | 0x4000,
            mt_rand(0, 0x3fff) | 0x8000,
            mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
        );
    }
}

if (!$connection) {
    die("Failed to connect to DB: " . mysqli_connect_error());
}
$idGambar = null;

if (array_key_exists('gambar', $_FILES)) {
    $namaGambar = $_FILES['gambar']['name'];
    $gambar = $_FILES['gambar']['tmp_name'];
    $size = $_FILES['gambar']['size'];
    
    if ($size > 16777215) {
        die(
            "Failed to upload image: image is too large. <br>\
            Image size $size is exceeds limit of 16777215. <br>\
            <a href=\"index.php\">Return</a>"
        );
    }

    $name = generateUUID();
    
    {
        $arr = explode('.', $namaGambar);
        $name .= '.' . strtolower(end($arr));
    }

    move_uploaded_file($_FILES['gambar']['tmp_name'], "../data/img/$name");

    $stmt = $connection->prepare('INSERT INTO `Images` (image) VALUES (?)');
    $success = $stmt->bind_param('s', $name);
    
    if (!$success) {
        die("Failed to bind prepared statement params (/internal/insert.php): $stmt->error");
    }
    
    $success = $stmt->execute();
    
    if (!$success) {
        die("Failed to record image path into table (/internal/insert.php): $stmt->error");
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
