<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Intro to PHP</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <?php
    include "./internal/connection.php";
    if (!$connection) {
        die("Failed to connect to DB: " . mysqli_connect_error());
    }

    $result = $connection->execute_query('SELECT * FROM `Data`');

    if (!$result) {
        die("Querying failed");
    }
    ?>
    <div class="inner">
        <h1>List siswa</h1>
        <table class="students">
            <caption class="visually-hidden">List siswa</caption>
            <thead>
                <tr>
                    <th scope="col">Nama</th>
                    <th scope="col">Kelas</th>
                    <th scope="col">No. Absen</th>
                    <th scope="col" colspan="999">Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php if ($result->num_rows == 0): ?>
                    <tr>
                        <td colspan="99999" style="text-align: center;">
                            <em>
                                Tidak ada siswa ditemukan.
                            </em>
                        </td>
                    </tr>
                <?php endif; ?>
                <?php while ($row = $result->fetch_row()): ?>
                    <tr>
                        <td><?= $row[1] ?></td>
                        <td><?= $row[2] ?></td>
                        <td><?= $row[3] ?></td>
                        <td>
                            <a href="/edit.php?id=<?= $row[0] ?>">
                                <button class="edit" type="button" title="Ubah">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                    </svg>
                                </button>
                            </a>
                        </td>
                        <td>
                            <a href="/delete.php?id=<?= $row[0] ?>">
                                <button class="delete" type="button" title="Hapus">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                                    </svg>
                                </button>
                            </a>
                        </td>
                    </tr>
                <?php endwhile; ?>
            </tbody>
        </table>
        <br>
        <form class="add" action="internal/insert.php" method="post">
            <h3 class="center-text">Tambah Siswa Baru</h3>
            <div class="grid">
                <label for="name">Nama</label>
                <input id="name" name="nama" type="text" minlength="1" maxlength="255" required placeholder="John Doe">
                <label for="class">Kelas</label>
                <input id="class" name="kelas" type="text" minlength="1" maxlength="255" required placeholder="10 AKL 1">
                <label for="index">Nomor Absen</label>
                <input id="index" name="nomor" type="number" min="1" max="999" maxlength="3" required placeholder="42">
            </div>
            <button class="stretch-x" type="submit">Tambah</button>
        </form>
    </div>
</body>

</html>