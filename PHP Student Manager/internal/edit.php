<?php
$id = intval($_POST['id']);
$nama = $_POST['nama'];
$kelas = $_POST['kelas'];
$nomor = $_POST['nomor'];

include './connection.php';

if (!$connection) {
    die("Failed to connect to DB: " . mysqli_connect_error());
}

$stmt = $connection->prepare('UPDATE `Data` SET nama = ?, kelas = ?, nomor = ? WHERE id = ?');

$success = $stmt->bind_param('ssii', $nama, $kelas, $nomor, $id);

if (!$success) {
    die("Failed to bind prepared statement params (/internal/insert.php): " . mysqli_stmt_error($stmt));
}

$success = $stmt->execute();

if (!$success) {
    die("Failed to insert student into table (/internal/insert.php): " . mysqli_stmt_error($stmt));
}

header('Location: /index.php');
