/** @type {HTMLInputElement} */
const numEntriesInput = document.getElementById('entries');

/** @type {HTMLDivElement} */
const dataInputCol = document.getElementById('datacol');

/** @type {HTMLButtonElement} */
const logButton = document.getElementById('log');

if(!numEntriesInput) {
    throw new Error("Element with id 'entries' not found!");
} else if(!dataInputCol) {
    throw new Error("Element with id 'datacol' not found!");
} else if(!logButton) {
    throw new Error("Element with id 'log' not found!");
}

let numEntries = 1;

/** @type {number[]} */
let data = [];

/** @param {number} num */
function setNumEntries(num) {
    numEntries = num;

    data = new Array(num).fill(0);

    dataInputCol.innerHTML = '';
    for(let i = 1; i <= num; i++) {
        dataInputCol.appendChild(getDataInputElement(i));
    }
}

function getDataInputElement(index = 1) {
    const el = document.createElement('div');
    el.className = 'row';

    const label = document.createElement('label');
    label.for = `data${index}`;
    label.innerText = `#${index}:`;
    el.appendChild(label);

    const input = document.createElement('input');
    input.type = 'number';
    input.min = -273.15;
    input.max = 10000;
    input.step = 0.01;
    input.value = 0;
    input.placeholder = 27;
    input.required = "";
    input.name = `data${index}`;
    input.id = `data${index}`;

    input.addEventListener('change', function() {
        data[index - 1] = parseFloat(input.value);
    });

    el.appendChild(input);

    return el;
}

/**
 * @returns {{
 *   min: number,
 *   mean: number,
 *   max: number,
 *   q1: number,
 *   q2: number,
 *   q3: number,
 *   dev: number
 * }}
 */
function getStats() {
    let min = Infinity, max = -Infinity;

    for(let i = 0; i < data.length; i++) {
        min = Math.min(min, data[i]);
        max = Math.max(max, data[i]);
    }

    let q1 = NaN, q2 = NaN, q3 = NaN;
    {
        const sortedData = data.slice().sort((a, b) => a - b);

        const q1Idx = Math.floor(data.length * 0.25);
        const q2Idx = Math.floor(data.length * 0.5);
        const q3Idx = Math.floor(data.length * 0.75);

        q1 = sortedData[q1Idx];
        q2 = sortedData[q2Idx];
        q3 = sortedData[q3Idx];
    }

    const sum = data.reduce((a, b) => a + b, 0);
    const mean = sum / data.length;
    const dev = Math.sqrt(
        data.reduce((a, b) => a + (b - mean) ** 2, 0)
        / data.length
    );

    return {
        min, mean, max,
        q1, q2, q3,
        dev
    };
}

function logData() {
    const stats = getStats();

    console.table(stats);
    console.table(data);
}

numEntriesInput.addEventListener('change', function() {
    numEntries = parseInt(numEntriesInput.value) || 1;
    setNumEntries(numEntries);
});
numEntriesInput.dispatchEvent(new Event('change'));

logButton.addEventListener('click', logData)