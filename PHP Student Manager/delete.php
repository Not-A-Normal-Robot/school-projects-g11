<?php
$raw_id = $_GET['id'];

$id = intval($raw_id);


if ($id == 0 && $raw_id !== "0") {
    // header('Location: /index.php');
    die("Invalid ID provided.");
}

include './internal/connection.php';

if (!$connection) {
    die("Failed to connect to DB: " . mysqli_connect_error());
}

$stmt = $connection->prepare('SELECT nama, kelas, nomor FROM `Data` WHERE id = ?');

if (!$stmt) {
    die("Failed to prepare statement: $connection->error");
}

$stmt->bind_param('i', $id);

if (!$stmt->execute()) {
    die("Failed to execute statement: $stmt->error");
}

$result = $stmt->get_result();

if ($result->num_rows === 0) {
    // header('Location: /index.php');
    die("Could not find student with ID $id in the database.");
}

$student = $result->fetch_array();
$name = $student[0];
$class = $student[1];
$index = $student[2];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Konfirmasi Hapus Biodata Siswa</title>
    <style>
        :root {
            color-scheme: dark light;
        }

        body {
            margin: 0;
            display: flex;
            flex-direction: row;
            min-height: 100%;
            min-height: 100vh;
            min-height: 100dvh;
        }

        form {
            display: flex;
            flex-direction: column;
            max-width: fit-content;
            max-height: fit-content;
            margin: auto;
            gap: 0.5em;
            padding: 1em;
            border: 0.1em solid white;
        }

        .center-text {
            text-align: center;
        }

        h3 {
            margin: 0;
        }

        .row {
            display: flex;
            flex-direction: row;
            gap: 1ch;
        }
        .row > * {
            flex-grow: 1;
        }

        a > button {
            width: 100%;
        }

        ul {
            margin-top: 0;
        }
    </style>
</head>
<body>
    <form action="internal/delete.php">
        <h3 class="center-text">Konfirmasi Hapus</h3>
        <p>Apakah Anda yakin ingin menghapus biodata siswa berikut?</p>
        <ul>
            <li>Nama: <?= $name ?></li>
            <li>Kelas: <?= $class ?></li>
            <li>Nomor Absen: <?= $index ?></li>
        </ul>
        <input type="hidden" name="id" value="<?= $id ?>">
        <div class="row">
            <button type="submit">Iya</button>
            <a href="/index.php">
                <button type="button">Batal</button>
            </a>
        </div>
    </form>
</body>
</html>