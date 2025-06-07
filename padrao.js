let displayValue = '0';
let currentEquation = '';
let operator = null;
let firstOperand = null;
let waitingForSecondOperand = false;

function adicionar(num) {
    if (waitingForSecondOperand) {
        displayValue = num;
        waitingForSecondOperand = false;
    } else {
        if (num === '.' && displayValue.includes('.')) {
            return;
        }
        if (displayValue === '0' && num !== '.') {
            displayValue = num;
        } else {
            displayValue += num;
        }
    }
    updateDisplay();
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        if (currentEquation.length > 0) {
            currentEquation = currentEquation.slice(0, currentEquation.lastIndexOf(' ')) + ' ' + nextOperator + ' ';
        } else {
             currentEquation = firstOperand + ' ' + nextOperator + ' ';
        }
    } else if (firstOperand === null) {
        firstOperand = inputValue;
        operator = nextOperator;
        currentEquation = displayValue + ' ' + nextOperator + ' ';
    } else {
        const result = executarCalculo(firstOperand, inputValue, operator);
        displayValue = String(result);
        firstOperand = result;
        operator = nextOperator;
        currentEquation += inputValue + ' ' + nextOperator + ' ';
    }

    waitingForSecondOperand = true;
    updateDisplay();
}

function calcular() {
    if (operator === null || waitingForSecondOperand || firstOperand === null) {
        return;
    }

    const secondOperand = parseFloat(displayValue);
    let result;

    if (operator === 'potencia') {
        result = Math.pow(firstOperand, secondOperand);
        currentEquation += secondOperand + ' =';
    } else {
        result = executarCalculo(firstOperand, secondOperand, operator);
        currentEquation += displayValue + ' =';
    }

    displayValue = String(result);

    firstOperand = null;
    operator = null;
    waitingForSecondOperand = true;
    
    updateDisplay(); 
}

function executarCalculo(first, second, op) {
    switch (op) {
        case '+':
            return first + second;
        case '-':
            return first - second;
        case '*':
            return first * second;
        case '/':
            return second === 0 ? 'Erro' : first / second;
        default:
            return second;
    }
}

function limpar() {
    displayValue = '0';
    currentEquation = '';
    operator = null;
    firstOperand = null;
    waitingForSecondOperand = false;
    updateDisplay();
}

function apagar() {
    if (displayValue === 'Erro') {
        limpar();
        return;
    }
    
    if (waitingForSecondOperand && operator !== null && firstOperand !== null) {
        if (displayValue === '') {
            return; 
        }
    }

    displayValue = displayValue.slice(0, -1);
    if (displayValue === '' || displayValue === '-') {
        displayValue = '0';
    }
    updateDisplay();
}

function raizQuadrada() {
    const inputValue = parseFloat(displayValue);
    if (isNaN(inputValue) || inputValue < 0) {
        displayValue = 'Erro';
        currentEquation = '';
    } else {
        currentEquation = `√(${inputValue})`;
        displayValue = String(Math.sqrt(inputValue));
    }
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = true;
    updateDisplay();
}

function potencia() {
    const inputValue = parseFloat(displayValue);
    if (firstOperand === null) {
        firstOperand = inputValue;
        operator = 'potencia';
        waitingForSecondOperand = true;
        currentEquation = displayValue + '^';
        displayValue = '';
    } else {
        const result = Math.pow(firstOperand, inputValue);
        currentEquation += inputValue + ' =';
        displayValue = String(result);
        firstOperand = null;
        operator = null;
        waitingForSecondOperand = true;
    }
    updateDisplay();
}

function updateDisplay() {
    const displayElement = document.getElementById('display');
    if (displayElement) {
        let textToDisplay = '';

        if (currentEquation && !currentEquation.endsWith(' =')) {
            textToDisplay = currentEquation + displayValue;
        } else {
            textToDisplay = displayValue;
        }
        
        displayElement.value = textToDisplay;
    }
}

document.addEventListener('DOMContentLoaded', updateDisplay);

function voltar() {
    window.history.back();
}
