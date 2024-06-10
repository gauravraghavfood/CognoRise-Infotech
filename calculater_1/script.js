document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('btn'));
    let displayValue = '0';
    let operator = null;
    let firstOperand = null;
    let secondOperand = false;

    buttons.map(button => {
        button.addEventListener('click', (e) => {
            const value = e.target.getAttribute('data-value');

            if (value === 'C') {
                displayValue = '0';
                operator = null;
                firstOperand = null;
                secondOperand = false;
                updateDisplay();
                return;
            }

            if (value === '=') {
                if (operator && secondOperand) {
                    displayValue = calculate(firstOperand, operator, parseFloat(displayValue));
                    operator = null;
                    firstOperand = null;
                    secondOperand = false;
                }
                updateDisplay();
                return;
            }

            if (['+', '-', '*', '/'].includes(value)) {
                if (operator && secondOperand) {
                    displayValue = calculate(firstOperand, operator, parseFloat(displayValue));
                    updateDisplay();
                }
                operator = value;
                firstOperand = parseFloat(displayValue);
                secondOperand = true;
                return;
            }

            if (secondOperand) {
                displayValue = value;
                secondOperand = false;
            } else {
                displayValue = displayValue === '0' ? value : displayValue + value;
            }
            updateDisplay();
        });
    });

    function updateDisplay() {
        display.textContent = displayValue;
    }

    function calculate(firstOperand, operator, secondOperand) {
        switch (operator) {
            case '+':
                return firstOperand + secondOperand;
            case '-':
                return firstOperand - secondOperand;
            case '*':
                return firstOperand * secondOperand;
            case '/':
                return firstOperand / secondOperand;
            default:
                return secondOperand;
        }
    }
});
