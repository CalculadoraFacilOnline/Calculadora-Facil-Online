let displayValue = '0'; // O que está visível no display principal
let currentEquation = ''; // A string da equação completa (ex: "5 + 3")
let operator = null; // O operador da operação pendente
let firstOperand = null; // O primeiro número da operação
let awaitingNewInput = false; // Flag para indicar que o próximo número digitado deve limpar o display (após um operador ou resultado)

function adicionar(num) {
    if (awaitingNewInput) {
        displayValue = num; // Inicia um novo número, limpando o display
        awaitingNewInput = false;
    } else {
        // Impede múltiplos pontos decimais
        if (num === '.' && displayValue.includes('.')) {
            return;
        }
        // Impede múltiplos zeros no início, a menos que seja "0."
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

    // Caso 1: Se já temos um primeiro operando e estamos esperando um novo input (após um operador ou resultado)
    // Isso significa que o usuário apertou um operador logo após outro operador ou após um resultado
    if (firstOperand !== null && awaitingNewInput) {
        operator = nextOperator; // Apenas troca o operador
        // Ajusta a currentEquation para refletir a mudança de operador
        if (currentEquation.length > 0) {
            currentEquation = currentEquation.slice(0, currentEquation.lastIndexOf(' ')) + ' ' + nextOperator + ' ';
        }
    } 
    // Caso 2: É o primeiro operando sendo inserido ou um cálculo parcial já foi feito
    else if (firstOperand === null) {
        firstOperand = inputValue;
        operator = nextOperator;
        currentEquation = displayValue + ' ' + nextOperator + ' ';
    } 
    // Caso 3: Temos um primeiro operando e um operador, e um novo número foi digitado (não esperando novo input)
    else {
        const result = executarCalculo(firstOperand, inputValue, operator);
        displayValue = String(result); // Exibe o resultado parcial
        firstOperand = result; // O resultado parcial se torna o novo primeiro operando
        operator = nextOperator; // Define o novo operador
        currentEquation += inputValue + ' ' + nextOperator + ' '; // Adiciona o valor atual e o novo operador à equação
    }

    awaitingNewInput = true; // Prepara para limpar o display no próximo número
    updateDisplay();
}

function calcular() {
    if (operator === null || firstOperand === null) {
        return; // Não faz nada se não há operação pendente
    }

    // Se o cálculo foi feito e displayValue é o resultado, e o usuário apertou "=" novamente, não faz nada
    if (awaitingNewInput && currentEquation.endsWith(' =')) {
        return;
    }

    const secondOperand = parseFloat(displayValue);
    let result;

    if (operator === 'potencia') {
        result = Math.pow(firstOperand, secondOperand);
    } else {
        result = executarCalculo(firstOperand, secondOperand, operator);
    }

    currentEquation += secondOperand + ' ='; // Completa a equação com o segundo operando e '='
    displayValue = String(result); // Mostra o resultado final

    // Reseta para o próximo cálculo, mas mantém o resultado no display e a equação finalizada
    firstOperand = null; // Zera o primeiro operando
    operator = null; // Zera o operador
    awaitingNewInput = true; // Prepara para o próximo número limpar o display
    
    updateDisplay();
}

function executarCalculo(first, second, op) {
    if (isNaN(first) || isNaN(second)) {
        return 'Erro'; // Evita cálculos com Not-a-Number
    }
    switch (op) {
        case '+':
            return first + second;
        case '-':
            return first - second;
        case '*':
            return first * second;
        case '/':
            return second === 0 ? 'Erro' : first / second; // Evita divisão por zero
        default:
            return 'Erro'; // Operador desconhecido
    }
}

function limpar() {
    displayValue = '0';
    currentEquation = ''; // Limpa a equação
    operator = null;
    firstOperand = null;
    awaitingNewInput = false; // Não está esperando novo input
    updateDisplay();
}

function apagar() {
    if (displayValue === 'Erro') {
        limpar(); // Se está em erro, C limpa tudo
        return;
    }
    
    if (awaitingNewInput && operator === null && firstOperand === null) {
        // Se já exibiu um resultado e está esperando novo input (e não tem operação pendente), apagar não faz nada no displayValue
        // Isso impede que displayValue seja apagado antes do próximo número
        return;
    }

    displayValue = displayValue.slice(0, -1); // Remove o último caractere
    if (displayValue === '' || displayValue === '-') { // Se ficar vazio ou apenas um "-"
        displayValue = '0'; // Volta para "0"
    }
    updateDisplay();
}

function raizQuadrada() {
    const inputValue = parseFloat(displayValue);
    if (isNaN(inputValue) || inputValue < 0) {
        displayValue = 'Erro';
        currentEquation = ''; // Limpa equação em caso de erro
    } else {
        currentEquation = `√(${inputValue})`; // Ex: "√(9)"
        displayValue = String(Math.sqrt(inputValue));
    }
    firstOperand = null; // Reseta operando
    operator = null; // Reseta operador
    awaitingNewInput = true; // Próximo número limpa o display
    updateDisplay();
}

function potencia() {
    const inputValue = parseFloat(displayValue);
    if (isNaN(inputValue)) {
        displayValue = 'Erro';
        currentEquation = '';
        updateDisplay();
        return;
    }

    if (firstOperand === null) {
        firstOperand = inputValue;
        operator = 'potencia';
        currentEquation = displayValue + '^'; // Mostra "5^"
        displayValue = ''; // Limpa o display para o expoente
        awaitingNewInput = true; // Prepara para o próximo input ser o expoente
    } else {
        // Isso é chamado quando o usuário insere o expoente e clica em '=' ou outro operador
        // Se a potencia() é chamada sem um '=', o cálculo é feito imediatamente.
        // A lógica de cálculo principal para potencia é no `calcular()`
        const result = Math.pow(firstOperand, inputValue);
        currentEquation += inputValue + ' ='; // Completa a equação
        displayValue = String(result); // Mostra o resultado
        firstOperand = null;
        operator = null;
        awaitingNewInput = true; // Prepara para o próximo número limpar o display
    }
    updateDisplay();
}

function updateDisplay() {
    const displayElement = document.getElementById('display');
    if (displayElement) {
        let textToDisplay = '';

        // Se a equação está em andamento (não finalizada com '=')
        if (currentEquation && !currentEquation.endsWith(' =')) {
            textToDisplay = currentEquation + displayValue;
        } else {
            // Se a equação foi finalizada ou não há equação, mostra apenas o displayValue
            textToDisplay = displayValue;
        }
        
        displayElement.value = textToDisplay;
    }
}

document.addEventListener('DOMContentLoaded', updateDisplay);

function voltar() {
    window.history.back();
}
