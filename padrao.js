let displayValue = '0'; // Valor atual exibido no display principal
let currentEquation = ''; // A string da equação completa no histórico
let operator = null; // O operador da operação pendente
let firstOperand = null; // O primeiro número da operação
let awaitingNewInput = false; // Flag: true se o próximo número digitado deve limpar o display (após operador ou resultado)

// Função para atualizar os dois displays
function updateDisplay() {
    document.getElementById('history-display').value = currentEquation;
    document.getElementById('main-display').value = displayValue;
}

function adicionar(num) {
    // Se estamos esperando um novo input (após um operador ou um cálculo)
    if (awaitingNewInput) {
        displayValue = num; // O novo número substitui o conteúdo do display
        awaitingNewInput = false; // Não espera mais novo input
    } else {
        // Prevenir múltiplos pontos decimais
        if (num === '.' && displayValue.includes('.')) {
            return;
        }
        // Prevenir múltiplos zeros no início (a menos que seja "0.")
        if (displayValue === '0' && num !== '.') {
            displayValue = num; // Substitui o '0' inicial pelo número
        } else {
            displayValue += num; // Concatena o número
        }
    }
    updateDisplay();
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);

    // Se já temos um primeiro operando e o usuário está trocando o operador
    if (firstOperand !== null && awaitingNewInput) {
        operator = nextOperator; // Apenas troca o operador
        // Atualiza a currentEquation para refletir a mudança de operador
        if (currentEquation.length > 0) {
            // Remove o último operador e adiciona o novo
            currentEquation = currentEquation.slice(0, currentEquation.lastIndexOf(' ')) + ' ' + nextOperator + ' ';
        }
    } 
    // Se este é o primeiro operando sendo inserido
    else if (firstOperand === null) {
        firstOperand = inputValue;
        operator = nextOperator;
        currentEquation = displayValue + ' ' + nextOperator + ' ';
    } 
    // Se já temos um primeiro operando e operador, e um novo número foi digitado
    else {
        // Calcula o resultado parcial
        const result = executarCalculo(firstOperand, inputValue, operator);
        displayValue = String(result); // Mostra o resultado parcial no display principal
        firstOperand = result; // O resultado parcial se torna o novo firstOperand
        operator = nextOperator; // Define o novo operador
        currentEquation += inputValue + ' ' + nextOperator + ' '; // Adiciona o valor atual e o novo operador ao histórico
    }

    awaitingNewInput = true; // Prepara para limpar o display principal no próximo número
    updateDisplay();
}

function calcular() {
    // Não faz nada se não há operador, ou se já exibiu um resultado e está esperando novo input
    if (operator === null || firstOperand === null || awaitingNewInput && currentEquation.endsWith(' =')) {
        return;
    }

    const secondOperand = parseFloat(displayValue);
    let result;

    if (operator === 'potencia') {
        result = Math.pow(firstOperand, secondOperand);
    } else {
        result = executarCalculo(firstOperand, secondOperand, operator);
    }

    // Completa a equação no histórico com o segundo operando e '='
    currentEquation += secondOperand + ' ='; 
    displayValue = String(result); // Mostra o resultado final no display principal

    // Reseta para o próximo cálculo, mas mantém o resultado e a equação finalizada visíveis
    firstOperand = null; 
    operator = null; 
    awaitingNewInput = true; // Prepara para o próximo número limpar o display principal
    
    updateDisplay();
}

function executarCalculo(first, second, op) {
    if (isNaN(first) || isNaN(second)) {
        return 'Erro'; 
    }
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
            return 'Erro';
    }
}

function limpar() {
    displayValue = '0';
    currentEquation = ''; // Limpa o histórico
    operator = null;
    firstOperand = null;
    awaitingNewInput = false;
    updateDisplay();
}

function apagar() {
    if (displayValue === 'Erro') {
        limpar();
        return;
    }
    
    // Se o display principal mostra um resultado e está esperando novo input, apagar não faz nada
    if (awaitingNewInput && currentEquation.endsWith(' =')) {
        return;
    }

    // Se o display principal é "0", apagar não faz nada (a menos que seja "0." e remova o ponto)
    if (displayValue === '0' && !displayValue.includes('.')) {
        return;
    }

    displayValue = displayValue.slice(0, -1); // Remove o último caractere
    if (displayValue === '' || displayValue === '-') { 
        displayValue = '0'; // Se ficar vazio ou só um "-", volta para "0"
    }
    updateDisplay();
}

function raizQuadrada() {
    const inputValue = parseFloat(displayValue);
    if (isNaN(inputValue) || inputValue < 0) {
        displayValue = 'Erro';
        currentEquation = ''; 
    } else {
        currentEquation = `√(${inputValue})`; // Ex: "√(9)" no histórico
        displayValue = String(Math.sqrt(inputValue)); // Resultado no display principal
    }
    firstOperand = null; 
    operator = null; 
    awaitingNewInput = true; // Prepara para o próximo número limpar o display principal
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
        currentEquation = displayValue + '^'; // Ex: "5^" no histórico
        displayValue = ''; // Limpa o display principal para o expoente
        awaitingNewInput = true;
    } else {
        const result = Math.pow(firstOperand, inputValue);
        currentEquation += inputValue + ' ='; // Ex: "5^3 =" no histórico
        displayValue = String(result); // Resultado no display principal
        firstOperand = null;
        operator = null;
        awaitingNewInput = true;
    }
    updateDisplay();
}

// Inicializa o display ao carregar a página
document.addEventListener('DOMContentLoaded', updateDisplay);

function voltar() {
    window.history.back();
}
