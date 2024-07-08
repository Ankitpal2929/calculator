document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    let currentInput = '0';
    let memory = null;
    let operator = null;
    let waitingForSecondOperand = false;

    const updateDisplay = () => {
        display.textContent = currentInput;
    };

    const clear = () => {
        currentInput = '0';
        memory = null;
        operator = null;
        waitingForSecondOperand = false;
        updateDisplay();
    };

    const clearEntry = () => {
        currentInput = '0';
        updateDisplay();
    };

    const appendNumber = (number) => {
        if (currentInput === '0' || waitingForSecondOperand) {
            currentInput = number;
            waitingForSecondOperand = false;
        } else {
            currentInput += number;
        }
        updateDisplay();
    };

    const setDecimal = () => {
        if (waitingForSecondOperand) return;
        if (!currentInput.includes('.')) {
            currentInput += '.';
        }
        updateDisplay();
    };

    const setOperator = (op) => {
        const inputValue = parseFloat(currentInput);
        if (operator && waitingForSecondOperand) {
            operator = op;
            return;
        }
        if (memory === null) {
            memory = inputValue;
        } else if (operator) {
            const result = performCalculation(memory, inputValue, operator);
            currentInput = String(result);
            memory = result;
        }
        waitingForSecondOperand = true;
        operator = op;
        updateDisplay();
    };

    const performCalculation = (num1, num2, op) => {
        switch (op) {
            case '+':
                return num1 + num2;
            case '-':
                return num1 - num2;
            case '*':
                return num1 * num2;
            case '/':
                if (num2 === 0) {
                    return 'Error'; // Handle division by zero
                }
                return num1 / num2;
            default:
                return num2;
        }
    };

    const calculate = () => {
        const inputValue = parseFloat(currentInput);
        if (operator && !waitingForSecondOperand) {
            currentInput = performCalculation(memory, inputValue, operator).toString();
            memory = null;
            operator = null;
            waitingForSecondOperand = true;
        }
        updateDisplay();
    };

    const toggleSign = () => {
        currentInput = String(parseFloat(currentInput) * -1);
        updateDisplay();
    };

    const calculatePercentage = () => {
        currentInput = String(parseFloat(currentInput) / 100);
        updateDisplay();
    };

    const backspace = () => {
        currentInput = currentInput.slice(0, -1);
        if (currentInput === '') {
            currentInput = '0';
        }
        updateDisplay();
    };

    // Event listeners for number buttons
    document.querySelectorAll('.number').forEach(button => {
        button.addEventListener('click', () => {
            appendNumber(button.textContent);
        });
    });

    // Event listeners for operator buttons
    document.querySelectorAll('.operator').forEach(button => {
        button.addEventListener('click', () => {
            setOperator(button.textContent);
        });
    });

    // Event listener for equals button
    document.querySelector('.equal').addEventListener('click', calculate);

    // Event listener for clear button
    document.querySelector('.clear').addEventListener('click', clear);

    // Event listener for clear entry button
    document.querySelector('.clear-entry').addEventListener('click', clearEntry);

    // Event listener for decimal button
    document.querySelector('.decimal').addEventListener('click', setDecimal);

    // Event listener for negate button
    document.querySelector('.negate').addEventListener('click', toggleSign);

    // Event listener for percentage button
    document.querySelector('.percentage').addEventListener('click', calculatePercentage);

    // Event listener for backspace button
    document.querySelector('.backspace').addEventListener('click', backspace);

});

      