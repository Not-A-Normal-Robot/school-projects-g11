<?php
$raw_id = $_GET['id'];

include './connection.php';

if (!$connection) {
    die("Failed to connect to DB: " . mysqli_connect_error());
}

$stmt = $connection->prepare('DELETE FROM `Data` WHERE id = ?');

$success = $stmt->bind_param('i', $raw_id);

if (!$success) {
    die("Failed to bind prepared statement params (/internal/delete.php): " . mysqli_stmt_error($stmt));
}

$success = $stmt->execute();

if (!$success) {
    die("Failed to insert student into table (/internal/delete.php): " . mysqli_stmt_error($stmt));
}

header('Location: /index.php');
