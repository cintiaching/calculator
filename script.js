
function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b
}

function operate(a, b, operator){
    switch(operator) {
        case 'add':
            return add(a, b);
        case 'subtract':
            return subtract(a, b);
        case 'multiply':
            return multiply(a, b);
        case 'divide':
            return divide(a, b);
        default:
            return null;
    }
}

function updateDisplay(digit) {
    display.textContent = digit;
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

let number1Display = '';
let number2Display = '';
let number1 = '';
let number2 = '';
let operator = '';
let result = null;
is_reset = true;

let display = document.getElementsByClassName('display')[0];
updateDisplay('0');

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        console.log(button.classList);
        if (button.classList.contains('number')) {
            if (operator) {
                number2Display += button.textContent;
                number2 += button.classList[1];
                updateDisplay(number2Display);
            } else {
                if (!is_reset) {
                    // if not reset and clicked number, start new calculation
                    number1Display = '';
                    number1 = '';
                    is_reset = true;
                }
                number1Display += button.textContent;
                number1 += button.classList[1];
                console.log(number1);
                updateDisplay(number1Display);
            }
        }

        if (button.classList.contains('operator')) {
            operator = button.classList[1];
        }

        if (button.classList.contains('equals')) {
            if (number1 && number2 && operator) {
                result = operate(parseFloat(number1), parseFloat(number2), operator);
                updateDisplay(roundResult(result));
                // set number1 to result, clear number2 and operator for next operation
                number1 = result.toString();
                number1Display = result.toString();
                number2 = '';
                number2Display = '';
                operator = '';
                is_reset = false;
            }
        }

        if (button.classList.contains('reset')) {
            updateDisplay('0');
            number1Display = '';
            number2Display = '';
            number1 = '';
            number2 = '';
            operator = '';
            result = null;
            is_reset = true;
        }
        if (button.classList.contains('delete')) {
            if (number2) {
                number2 = number2.slice(0, -1);
                number2Display = number2Display.slice(0, -3);
                updateDisplay(number2Display || '0');
            } else if (operator) {
                operator = '';
            } else if (number1) {
                number1 = number1.slice(0, -1);
                number1Display = number1Display.slice(0, -3);
                updateDisplay(number1Display || '0');
            }
        }
    });
});

