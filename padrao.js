Claro! Aqui está o código JavaScript completo, ajustado e funcional para a sua calculadora padrão, sem comentários:

JavaScript

let displayValue = '';
let operator = null;
let firstOperand = null;
let waitingForSecondOperand = false;

function adicionar(num) {
    if (waitingForSecondOperand) {
        displayValue = num;
        waitingForSecondOperand = false;
    } else {
        displayValue = displayValue === '0' ? num : displayValue + num;
    }
    updateDisplay();
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        return;
    }

    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = executarCalculo(firstOperand, inputValue, operator);
        displayValue = String(result);
        firstOperand = result;
    }

    waitingForSecondOperand = true;
    operator = nextOperator;
    updateDisplay();
}

function calcular() {
    if (operator === null || waitingForSecondOperand) {
        return;
    }

    const secondOperand = parseFloat(displayValue);
    const result = executarCalculo(firstOperand, secondOperand, operator);

    displayValue = String(result);
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
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
    operator = null;
    firstOperand = null;
    waitingForSecondOperand = false;
    updateDisplay();
}

function apagar() {
    displayValue = displayValue.slice(0, -1);
    if (displayValue === '') {
        displayValue = '0';
    }
    updateDisplay();
}

function raizQuadrada() {
    const inputValue = parseFloat(displayValue);
    if (inputValue < 0) {
        displayValue = 'Erro';
    } else {
        displayValue = String(Math.sqrt(inputValue));
    }
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    updateDisplay();
}

function potencia() {
    const inputValue = parseFloat(displayValue);
    if (firstOperand === null) {
        firstOperand = inputValue;
        operator = 'potencia';
        waitingForSecondOperand = true;
        displayValue = ''; 
    } else {
        const result = Math.pow(firstOperand, inputValue);
        displayValue = String(result);
        firstOperand = null;
        operator = null;
        waitingForSecondOperand = false;
    }
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('display').value = displayValue;
}

document.addEventListener('DOMContentLoaded', updateDisplay);

function voltar() {
    window.history.back();
}
