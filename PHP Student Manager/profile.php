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
    die("Invalid ID provided.");
}

include './internal/connection.php';

if (!$connection) {
    die("Failed to connect to DB: " . mysqli_connect_error());
}

$stmt = $connection->prepare('SELECT nama, kelas, nomor, picture FROM `Data` WHERE id = ?');

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
$photoId = $student[3];
$photoUrl = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgZmlsbD0iY3VycmVudENvbG9yIiBjbGFzcz0iYmkgYmktcGVyc29uLWNpcmNsZSIgdmlld0JveD0iMCAwIDE2IDE2Ij4KICA8cGF0aCBkPSJNMTEgNmEzIDMgMCAxIDEtNiAwIDMgMyAwIDAgMSA2IDAiLz4KICA8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0wIDhhOCA4IDAgMSAxIDE2IDBBOCA4IDAgMCAxIDAgOG04LTdhNyA3IDAgMCAwLTUuNDY4IDExLjM3QzMuMjQyIDExLjIyNiA0LjgwNSAxMCA4IDEwczQuNzU3IDEuMjI1IDUuNDY4IDIuMzdBNyA3IDAgMCAwIDggMSIvPgo8L3N2Zz4=';

if (isset($photoId)) {
    $imgResult = $connection->execute_query(
        "SELECT image FROM `Images` WHERE id = ?",
        [$photoId]
    );

    $rawPhotoUrl = $imgResult->fetch_array()[0];
    $safe = true;
    
    // check photo url
    if (strpos($photoUrl, '"') !== false) {
        $safe = false;
    }

    if (strpos($photoUrl, "'") !== false) {
        $safe = false;
    }

    if (strpos($photoUrl, '\\') !== false) {
        $safe = false;
    }

    if (strpos($photoUrl, '>') !== false) {
        $safe = false;
    }

    if (strpos($photoUrl, '<') !== false) {
        $safe = false;
    }

    if ($safe) {
        $photoUrl = "/data/img/$rawPhotoUrl";
    }
}
?>
    <title>Melihat Biodata <?= $name ?></title>
</head>
<body>
    <div class="inner profile">
        <h2 class="center-text">Profil Siswa</h2>
        <div class="row">
            <img class="pfp" src="<?= $photoUrl ?>" alt="Profile photo">
            <ul>
                <li>
                    Nama: <?= $name ?>
                </li>
                <li>
                    Kelas: <?= $class ?>
                </li>
                <li>
                    Nomor Absen: <?= $index ?>
                </li>
            </ul>
        </div>
        <a class="back" href="/index.php">
            <button type="button">
                Kembali
            </button>
        </a>
    </di>
</body>
</html>