<?php
$id = intval($_POST['id']);
$nama = $_POST['nama'];
$kelas = $_POST['kelas'];
$nomor = $_POST['nomor'];

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

include './connection.php';

if (!$connection) {
    die("Failed to connect to DB: " . mysqli_connect_error());
}

$stmt = $connection->prepare('UPDATE `Data` SET nama = ?, kelas = ?, nomor = ? WHERE id = ?');

$success = $stmt->bind_param('ssii', $nama, $kelas, $nomor, $id);

if (!$success) {
    die("Failed to bind prepared statement params (/internal/edit.php): " . mysqli_stmt_error($stmt));
}

$success = $stmt->execute();

if (!$success) {
    die("Failed to insert student into table (/internal/edit.php): " . mysqli_stmt_error($stmt));
}

if (array_key_exists('gambar', $_FILES)) {
    $gambar = $_FILES['gambar'];

    if ($gambar['size'] > 16777215) {
        die(
            "Failed to upload image: image is too large. <br>\
            Image size $size is exceeds limit of 16777215. <br>\
            <a href=\"index.php\">Return</a>"
        );
    }

    $result = $connection->execute_query(
        'SELECT picture FROM `Data` WHERE id = ?',
        [$id]
    );
    
    if (!$result) {
        die("Failed to get student from table (/internal/edit.php): $connection->error");
    }
    
    $picture = $result->fetch_array()[0];
    
    if (isset($picture)) {
        $result = $connection->execute_query(
            'SELECT image FROM `Images` WHERE id = ?',
            [$picture]
        );
    
        if (!$result) {
            die("Failed to get picture from table (/internal/edit.php): $connection->error");
        }
    
        $picturePath = $result->fetch_array()[0];

        $success = unlink("../data/img/$picturePath");

        if (!$success) {
            die("Failed to delete old pfp file (/internal/edit.php)");
        }
    
        $success = move_uploaded_file(
            $gambar['tmp_name'],
            "../data/img/$picturePath"
        );
        
        if (!$success) {
            die("Failed to move uploaded file to update old pfp (/internal/edit.php)");
        }
    } else {
        // TODO: Insert image
        $picturePath = generateUUID();

        {
            $arr = explode('.', $gambar['name']);
            $picturePath .= '.' . strtolower(end($arr));
        }

        move_uploaded_file(
            $gambar['tmp_name'],
            "../data/img/$picturePath"
        );

        $stmt = $connection->prepare('INSERT INTO `Images` (image) VALUES (?)');
        $success = $stmt->bind_param('s', $picturePath);
        
        if (!$success) {
            die("Failed to bind prepared statement params (/internal/edit.php): $stmt->error");
        }
        
        $success = $stmt->execute();
        
        if (!$success) {
            die("Failed to record image path into table (/internal/edit.php): $stmt->error");
        }

        $idGambar = $connection->insert_id;

        $success = $connection->execute_query(
            'UPDATE `Data` SET picture = ? WHERE id = ?',
            [$idGambar, $id]
        );
    }
}

header('Location: /index.php');
echo "Success!";