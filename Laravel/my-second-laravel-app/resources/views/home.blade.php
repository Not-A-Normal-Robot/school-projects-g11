<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
    <link rel="stylesheet" href="{{ asset("/css/app.css") }}">
</head>
<body>
    <section>
        <img src="/img/profile.jpg" alt="A photo of NileGreen">
        <p style="font-size: 1.1em">Yo yo yo! It's ya boi <strong>NileGreen</strong> again!</p>
        <p>
            I love doing chemical experiments, especially the more extreme ones involving
            cryogenics!
        </p>
    </section>

    <div class="row">
        <a href="/experiments/copper-nitric-acid">
            <div class="card">
                <h1>Dissolving copper in nitric acid</h1>
                <p>
                    Check out this rad experiment where we dissolve copper in nitric acid!
                </p>
            </div>
        </a>
        <a href="/experiments/freezing-nitrogen">
            <div class="card">
                <h1>Making solid nitrogen by using liquid helium</h1>
                <p>
                    Liquid helium is way colder than liquid nitrogen. So, we can use it to make solid nitrogen!
                </p>
            </div>
        </a>
        <a href="/experiments/fluorine-super-oxidizer">
            <div class="card">
                <h1>Fluorine: an even better oxidizer than oxygen</h1>
                <p>
                    Fluorine is a super strong oxidizer. It can oxidize things that oxygen can't!
                </p>
            </div>
        </a>
        <a href="/experiments/piranha-solution">
            <div class="card">
                <h1>Piranha solution: a very angry acid</h1>
                <p>
                    Piranha solution is a mixture of sulfuric acid and hydrogen peroxide. It's super dangerous!
                </p>
            </div>
        </a>
        <a href="/experiments/strong-bases">
            <div class="card">
                <h1>Strong bases: extremely high pH is also dangerous</h1>
                <p>
                    It's not just strong acids that are dangerous. Strong bases also like to react violently!
                </p>
            </div>
        </a>
    </div>

    <footer>
        <p>
            &copy; 2020 NileGreen. All rights reserved.
        </p>
        <div class="row">
            <a href="https://youtube.com/@nilegreen">
                <img src="/img/youtube.svg" alt="YouTube">
            </a>
        </div>
    </footer>
</body>
</html