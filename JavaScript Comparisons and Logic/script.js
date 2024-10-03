"use strict";

/** @type {HTMLInputElement} */
const input = document.getElementById('input');
/** @type {HTMLOutputElement} */
const output = document.getElementById('output');

/** @param {string} message, @param {number} number */
function errWrapper(message, number) {
    console.error(number, ":", message);
    output.textContent = message;
    output.classList.add('error');
}

/** @param {string} message, @param {number} number */
function logWrapper(message, number) {
    console.log(number, ":", message);
    output.textContent = message;
    output.classList.remove('error');
}

/** @param {number} value */
function calculate(value) {
    if(value < 2) {
        logWrapper("Tidak, bilangan ini bukan bilangan prima.", value);
        return;
    }

    const maxCheckedFactor = Math.sqrt(value);
    for(let factor = 2; factor <= maxCheckedFactor; factor++) {
        if(value % factor === 0) {
            logWrapper(`Tidak, bilangan ini dapat dibagi menjadi ${factor}.`, value);
            return;
        }
    }

    logWrapper("Iya, bilangan tersebut merupakan bilangan prima.", value);
}

input.addEventListener('input', function() {
    const value = parseInt(input.value, 10);

    if(isNaN(value)) {
        errWrapper("Bilangan tersebut tidak valid.", NaN);
        return;
    }

    if(value > Number.MAX_SAFE_INTEGER) {
        errWrapper(`Bilangan terlalu besar, maksimal ${Number.MAX_SAFE_INTEGER}.`, value);
        return;
    }

    calculate(value);
});