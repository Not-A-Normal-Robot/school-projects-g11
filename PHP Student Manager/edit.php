<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
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
    <title>Mengubah Biodata <?= $name ?> dari kelas <?= $class ?></title>
</head>
<body>
    <form class="edit inner" action="internal/edit.php" method="post"  enctype="multipart/form-data">
        <h2 class="center-text">Ubah Biodata Siswa</h2>
        <input type="hidden" name="id" value="<?= $id ?>">
        <div class="grid">
            <label for="name">Nama</label>
            <input id="name" name="nama"
                type="text" minlength="1" maxlength="255"
                required placeholder="John Doe"
                value="<?= $name ?>"
            >
            <label for="class">Kelas</label>
            <input id="class" name="kelas"
                type="text" minlength="1" maxlength="255"
                required placeholder="10 AKL 1"
                value="<?= $class ?>"
            >
            <label for="index">Nomor Absen</label>
            <input id="index" name="nomor"
                type="number" min="1" max="999" maxlength="3"
                required placeholder="26"
                value="<?= $index ?>"
            >
            <script>
                function previewImage(event) {
                    if (event.target.files[0].size > 16777215) {
                        event.target.value = "";
                        alert("File is too big! Maximum size is 16 MB");
                        return;
                    }
                    document.getElementById('preview').classList
                        .toggle("hide", event.target.value.trim().length === 0);
                    let reader = new FileReader();
                    reader.onload = function() {
                        document.getElementById('preview')
                            .src = reader.result;
                    }
                    reader.readAsDataURL(event.target.files[0]);
                }
            </script>
            <label for="pfp">Gambar Profil</label>
            <input type="file" name="gambar" id="pfp" value="gambar"
                accept="image/*" onchange="previewImage(event)">
            <div></div>
            <img class="hide" id="preview" src="" alt="Profile picture preview">
        </div>
        <div class="row">
            <button type="submit">Ubah</button>
            <a href="/index.php">
                <button type="button">Batal</button>
            </a>
        </div>
    </form>
</body>
</html>