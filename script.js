
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
    if (b === 0) {
        alert("You can't divide by zero LOL");
        resetCalculator();
        return;
    }
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
    display.textContent = convertNumberToEmoji(digit);
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

function convertNumberToEmoji(number) {
    const emojiMap = {
        '0': '0️⃣',
        '1': '1️⃣',
        '2': '2️⃣',
        '3': '3️⃣',
        '4': '4️⃣',
        '5': '5️⃣',
        '6': '6️⃣',
        '7': '7️⃣',
        '8': '8️⃣',
        '9': '9️⃣',
        '.': '●' // For the decimal point
    };

    // Convert the number to a string and map each character to its emoji
    return number.toString().split('').map(digit => emojiMap[digit] || digit).join('');
}

let number1 = '';
let number2 = '';
let operator = '';
let result = null;
let is_reset = true;

function resetCalculator() {
    updateDisplay(0);
    number1 = '';
    number2 = '';
    operator = '';
    result = null;
    is_reset = true;
}

let display = document.getElementsByClassName('display')[0];
updateDisplay(0);

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        console.log(button.classList);
        if (button.classList.contains('number')) {
            if (operator) {
                number2 += button.classList[1];
                updateDisplay(number2);
            } else {
                if (!is_reset) {
                    // if not reset and clicked number, start new calculation
                    number1 = '';
                    is_reset = true;
                }
                number1 += button.classList[1];
                console.log(number1);
                updateDisplay(number1);
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
                number2 = '';
                operator = '';
                is_reset = false;
            } else if (!number1) {
                alert('Please enter a number first LOL');
            } else if (!operator) {
                alert('Please select an operator LOL');
            } else if (!number2) {
                alert('Please enter a second number LOL');
            }
        }

        if (button.classList.contains('decimal')) {
            if (operator) {
                // Allow decimal in the second number
                if (!number2.includes('.')) {
                    number2 += '.';
                    updateDisplay(number2);
                }
            } else {
                // Allow decimal in the first number
                if (!number1.includes('.')) {
                    number1 += '.';
                    updateDisplay(number1);
                }
            }
        }

        if (button.classList.contains('reset')) {
            resetCalculator();
        }
        if (button.classList.contains('delete')) {
            if (number2) {
                number2 = number2.slice(0, -1);
                //number2Display = number2Display.slice(0, -3);
                updateDisplay(number2 || '0');
            } else if (operator) {
                operator = '';
            } else if (number1) {
                number1 = number1.slice(0, -1);
                //number1Display = number1Display.slice(0, -3);
                updateDisplay(number1 || '0');
            }
        }
    });
});

