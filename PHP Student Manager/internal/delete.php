<?php
$raw_id = $_GET['id'];

include './connection.php';

if (!$connection) {
    die("Failed to connect to DB: " . mysqli_connect_error());
}
{

    $result = $connection->execute_query(
        'SELECT picture FROM `Data` WHERE id = ?',
        [$raw_id]
    );

    if (!$result) {
        die("Failed to get student from table (/internal/delete.php): $connection->error");
    }

    $picture = $result->fetch_array()[0];

    if (isset($picture)) {
        $result = $connection->execute_query(
            'SELECT image FROM `Images` WHERE id = ?',
            [$picture]
        );

        if (!$result) {
            die("Failed to get picture from table (/internal/delete.php): $connection->error");
        }

        $picture = $result->fetch_array()[0];

        $success = unlink("../data/img/$picture");

        if (!$success) {
            die("Failed to delete file at $picture");
        }
    }
}
{
    $stmt = $connection->prepare('DELETE FROM `Data` WHERE id = ?');

    $success = $stmt->bind_param('i', $raw_id);

    if (!$success) {
        die("Failed to bind prepared statement params for DELETE (/internal/delete.php): $stmt->error");
    }

    $success = $stmt->execute();

    if (!$success) {
        die("Failed to delete student from table (/internal/delete.php): $stmt->error");
    }
}
header('Location: /index.php');
