<?php
$nama = $_POST['nama'];
$kelas = $_POST['kelas'];
$nomor = $_POST['nomor'];

include './connection.php';

if (!$connection) {
    die("Failed to connect to DB: " . mysqli_connect_error());
}

$stmt = $connection->prepare('INSERT INTO `Data` (nama, kelas, nomor) VALUES (?, ?, ?)');

$success = $stmt->bind_param('ssi', $nama, $kelas, $nomor);

if (!$success) {
    die("Failed to bind prepared statement params (/internal/insert.php): " . mysqli_stmt_error($stmt));
}

$success = $stmt->execute();

if (!$success) {
    die("Failed to insert student into table (/internal/insert.php): " . mysqli_stmt_error($stmt));
}

echo 'Success!';
header('Location: /index.php');
