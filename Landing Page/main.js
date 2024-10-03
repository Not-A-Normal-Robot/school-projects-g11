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