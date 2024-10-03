/** @type {HTMLInputElement} */
const lhsNumElement = document.getElementById('lhs-num');
/** @type {HTMLSelectElement} */
const lhsUnitElement = document.getElementById('lhs-unit');

/** @type {HTMLInputElement} */
const rhsNumElement = document.getElementById('rhs-num');
/** @type {HTMLSelectElement} */
const rhsUnitElement = document.getElementById('rhs-unit');

/** @type {HTMLButtonElement} */
const swapButton = document.getElementById('swap');

const unitInMeters = new Map([
    ["m", 1], ["cm", 0.01], ["mm", 0.001], ["km", 1000],
    ["in", 0.0254], ["mi", 1609.34]
]);

/**
 * @param {string} from
 * @param {string} to
 * @returns {number}
 */
function getConversionFactor(from, to) {
    return (unitInMeters.get(from) ?? NaN) /
        (unitInMeters.get(to) ?? NaN);
}

/**
 * @param {number} fromVal 
 * @param {string} fromUnit 
 * @param {string} toUnit 
 */
function convert(fromVal, fromUnit, toUnit) {
    return fromVal * getConversionFactor(fromUnit, toUnit);
}

/**
 * Updates one of the sides, keeping the other side unchanged.
 * @param {"lhs" | "rhs"} mode 
 */
function update(mode = "rhs") {
    // unchanged side
    const [fromEl, fromUnit] =
        mode === "rhs" ?
        [lhsNumElement, lhsUnitElement.value] :
        [rhsNumElement, rhsUnitElement.value];
    
    const fromVal = parseFloat(fromEl.value);

    if(isNaN(fromVal)) {
        fromEl.classList.add('invalid');
        return;
    } else {
        fromEl.classList.remove('invalid');
    }
    
    // changed side
    const [toEl, toUnit] =
        mode === "rhs" ?
        [rhsNumElement, rhsUnitElement.value] :
        [lhsNumElement, lhsUnitElement.value];
    
    const newVal = convert(fromVal, fromUnit, toUnit);

    toEl.value = newVal.toPrecision(12);
}

lhsNumElement.addEventListener('input', () => update("rhs"));
lhsUnitElement.addEventListener('change', () => update("rhs"));

rhsNumElement.addEventListener('input', () => update("lhs"));
rhsUnitElement.addEventListener('change', () => update("lhs"));

swapButton.addEventListener('click', function() {
    [lhsUnitElement.value, rhsUnitElement.value] =
        [rhsUnitElement.value, lhsUnitElement.value];
    
    update();
});