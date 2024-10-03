"use strict";
{
    document.getElementById('header-nav-hamburger').addEventListener('click', function() {
        document.getElementById('toggleable-header-nav').classList.toggle('hide-important');
    });
    
    const PHONE_NUMBER = '031-012-3456';
    const COPY_PHONE_NUMBER_BUTTON = document.getElementById('copy-phone-number');
    const COPY_WHATSAPP_NUMBER_BUTTON = document.getElementById('copy-whatsapp-number');
    
    const COPY_TEXT = 'Salin', COPIED_TEXT = 'Tersalin!';
    
    COPY_PHONE_NUMBER_BUTTON.addEventListener('click', function() {
        navigator.clipboard.writeText(PHONE_NUMBER);
        COPY_PHONE_NUMBER_BUTTON.textContent = COPIED_TEXT;
        setTimeout(function() {
            COPY_PHONE_NUMBER_BUTTON.textContent = COPY_TEXT;
        }, 2000);
    });
    
    COPY_WHATSAPP_NUMBER_BUTTON.addEventListener('click', function() {
        navigator.clipboard.writeText(PHONE_NUMBER);
        COPY_WHATSAPP_NUMBER_BUTTON.textContent = COPIED_TEXT;
        setTimeout(function() {
            COPY_WHATSAPP_NUMBER_BUTTON.textContent = COPY_TEXT;
        }, 2000);
    });
}
{
    const skills = document.getElementById('skills-grid');

    const images = Array.from(skills.getElementsByTagName('img'))

    console.log(images);
    images.forEach(function(image) {
        let speed = 0;
        let rotation = 0;
        let oldTime = performance.now();

        function updateRotation(newTime) {
            const dt = newTime - oldTime;
            oldTime = newTime;
            speed *= 1 - dt * 0.001;
            rotation += speed * dt;
            rotation %= 360;

            if(speed < 0.05) {
                image.style.transition = "transform 1s";
                image.style.transform = "rotate(0deg)";
                rotation = 0;
                speed = 0;
            } else {
                image.style.transition = "none";
                image.style.transform = `rotate(${rotation}deg)`;
            }

            requestAnimationFrame(updateRotation);
        }

        updateRotation(oldTime);

        image.addEventListener('click', function() {
            speed += 1;
        });
    });

    const instructions = document.createElement("p");
    instructions.textContent = "Klik gambar-gambarnya untuk memutarnya!";
    skills.parentElement.append(instructions);
}