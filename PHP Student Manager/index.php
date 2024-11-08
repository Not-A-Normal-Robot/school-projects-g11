<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Intro to PHP</title>
    <style>
        :root {
            color-scheme: dark light;
        }

        body {
            display: flex;
            flex-direction: column;
            width: fit-content;
            margin: auto;
            justify-content: center;
            align-items: center;

            min-height: 100%;
            min-height: 100vh;
            min-height: 100dvh;
        }

        br {
            margin-bottom: 3em;
        }

        table.students th,
        table.students td {
            border: 1px solid white;
            padding: 0.5em 2ch;
        }

        table.students {
            width: fit-content;
            border-collapse: collapse;
            caption-side: bottom;
        }

        .row {
            display: flex;
            flex-direction: row;
        }

        form {
            display: flex;
            flex-direction: column;
            max-width: fit-content;
            gap: 0.5em;
            padding: 1em;
            border: 0.1em solid white;
        }

        form .grid {
            display: grid;
            width: fit-content;
            gap: 0.5em 2ch;
            grid-template-columns: 1fr 2fr;
        }

        .center-text {
            text-align: center;
        }

        h3 {
            margin: 0;
        }

        .visually-hidden {
            visibility: hidden;
            width: 1px;
            height: 1px;
            margin-right: -1px;
            margin-bottom: -1px;
        }
    </style>
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
                            <button class="edit" type="button">Ubah</button>
                        </a>
                    </td>
                    <td>
                        <a href="/delete.php?id=<?= $row[0] ?>">
                            <button class="delete" type="button">Hapus</button>
                        </a>
                    </td>
                </tr>
            <?php endwhile; ?>
        </tbody>
    </table>
    <br>
    <form action="internal/insert.php" method="post">
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
</body>

</html>