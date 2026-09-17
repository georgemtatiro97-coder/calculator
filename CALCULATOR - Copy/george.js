const display = document.getElementById("display");
let memory = 0;

function appendToDisplay(input) {
    if (display.value === "Error") {
        clearDisplay();
    }
    display.value += input;
}

function clearDisplay() {
    display.value = "";
}

function backspace() {
    if (display.value === "Error") {
        clearDisplay();
        return;
    }
    display.value = display.value.slice(0, -1);
}

function toggleSign() {
    if (!display.value || display.value === "Error") {
        return;
    }
    if (display.value.startsWith("-")) {
        display.value = display.value.slice(1);
    } else {
        display.value = `-${display.value}`;
    }
}

function applyPercentage() {
    if (!display.value || display.value === "Error") {
        return;
    }
    const result = evaluateExpression(display.value);
    display.value = result / 100;
}

function square() {
    if (!display.value || display.value === "Error") {
        return;
    }
    const result = evaluateExpression(display.value);
    display.value = result * result;
}

function sqrtValue() {
    if (!display.value || display.value === "Error") {
        return;
    }
    const result = evaluateExpression(display.value);
    display.value = Math.sqrt(result);
}

function memoryStore() {
    if (!display.value || display.value === "Error") {
        return;
    }
    memory = evaluateExpression(display.value);
}

function memoryRecall() {
    display.value = memory;
}

function memoryClear() {
    memory = 0;
}

function evaluateExpression(expression) {
    const sanitized = expression
        .replace(/[^0-9+\-*/().%^πe]/g, "")
        .replace(/\^/g, "**")
        .replace(/π/g, "Math.PI")
        .replace(/e/g, "Math.E");

    if (!sanitized) {
        return 0;
    }

    return Function(`"use strict"; return (${sanitized});`)();
}

function calculate() {
    try {
        const result = evaluateExpression(display.value);
        if (!Number.isFinite(result)) {
            throw new Error("Invalid expression");
        }
        display.value = result;
    } catch (error) {
        display.value = "Error";
    }
}