//
// JavaScript REPL
//

window.repl = {};

/**@type {HTMLTextAreaElement} */
const input = document.getElementById('in');

/**@type {HTMLTextAreaElement} */
const output = document.getElementById('out');

// auto-resize
input.addEventListener('input', function() {
    input.style.height = 'auto';
    input.style.height = input.scrollHeight + 'px';
});

const handler = {
    set: function(target, property, value) {
        if (property !== 'repl') {
            window.repl[property] = value;
        }
        target[property] = value;
        return true;
    }
};

const proxyWindow = new Proxy(window, handler);

input.addEventListener('keydown', function(e) {
    if(e.key !== "Enter" || e.shiftKey || input.value.trim().length === 0) {
        return;
    }

    e.preventDefault();

    let result;
    /** @type {boolean} */
    let error = false;

    try {
        // result = eval(input.value);
        result = (function() {
            return eval(input.value);
        }).call(proxyWindow);
    } catch(e) {
        error = true;
        result = "Unknown Error";

        if(e && typeof e === "object") {
            if(typeof e.message === "string") {
                result = e.message;
            } else if(typeof e.error === "string") {
                result = e.message;
            }
        } else if(typeof e === "string") {
            result = e;
        }
    }

    const div = document.createElement("div");
    div.classList.add('entry');

    const cmdDiv = document.createElement("p");
    cmdDiv.classList.add('cmd');
    cmdDiv.textContent = input.value;

    const resDiv = document.createElement("p");
    resDiv.classList.add('res');
    resDiv.textContent = result;

    if(result === null) {
        resDiv.textContent = "null";
    } else if(result === undefined) {
        resDiv.textContent = "undefined";
    }

    if(error) {
        resDiv.classList.add('err');
    } else if(result !== null) {
        resDiv.classList.add(typeof result);
    } else {
        resDiv.classList.add('null');
    }

    div.appendChild(cmdDiv);
    div.appendChild(resDiv);

    output.appendChild(div);

    input.value = "";
});

window.repl.clear = () => {
    output.innerHTML = "";
}