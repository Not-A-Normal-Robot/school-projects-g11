"use strict";

/** @type {HTMLOptionElement} */
const operatorSelect = document.getElementById('operator');

/** @type {HTMLTableElement} */
const table = document.getElementById('table');

const ROWS = 12;
const COLS = 12;

/**
 * @type {"add" | "sub" | "mul" | "div"}
 */
let curOperator = operatorSelect.value;

/**
 * @param {number} lhs 
 * @param {number} rhs 
 * @returns {number}
 */
function operate(lhs, rhs) {
    switch(curOperator) {
        case "add":
            return lhs + rhs;
        case "sub":
            return lhs - rhs;
        case "mul":
            return lhs * rhs;
        case "div":
            return lhs / rhs;
        default:
            return lhs;
    }
}

/** @returns {string} */
function getOperatorSymbol() {
    // switch(curOperator) {
    //     case "add": return "+";
    //     case "sub": return "-";
    //     case "mul": return "×";
    //     case "div": return "÷";
    //     default:    return "?";
    // }
    const map = new Map([
        ["add", "+"],
        ["sub", "-"],
        ["mul", "×"],
        ["div", "÷"]
    ]);

    return map.get(curOperator) ?? "?";
}

function updateTable() {
    const thead = document.createElement('thead');

    {
        const headrow = document.createElement('tr');

        for(let i = 0; i < COLS; i++) {
            const td = document.createElement('td');
            td.classList.add('bold');
            
            if(i === 0) {
                td.textContent = getOperatorSymbol();
            } else {
                td.textContent = (i - 1).toFixed(0);
            }

            headrow.appendChild(td);
        }

        thead.appendChild(headrow);
    }

    const tbody = document.createElement('tbody');

    for(let y = 0; y < ROWS - 1; y++) {
        const row = document.createElement('tr');

        const calcY = y;

        for(let x = 0; x < COLS; x++) {
            const td = document.createElement('td');

            const calcX = x - 1;

            if(x === 0) {
                td.classList.add('bold');
                td.textContent = calcY.toFixed(0);
            } else {
                const result = operate(calcX, calcY).toPrecision(3)
                td.textContent = result;
            }

            row.appendChild(td);
        }

        tbody.appendChild(row);
    }

    table.innerHTML = "";

    table.appendChild(thead);
    table.appendChild(tbody);
}


operatorSelect.addEventListener('input', function() {
    curOperator = operatorSelect.value;
    updateTable();
});

operatorSelect.dispatchEvent(new Event('input'));