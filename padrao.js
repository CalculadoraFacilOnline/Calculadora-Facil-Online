let displayValue = '0'; // Valor atual exibido no display principal
let currentEquation = ''; // Para armazenar a equação completa (ex: "5 + 3")
let operator = null;
let firstOperand = null;
let waitingForSecondOperand = false; // Flag para saber se estamos esperando o segundo operando

function adicionar(num) {
    if (waitingForSecondOperand) {
        displayValue = num; // Começa um novo número para o segundo operando
        waitingForSecondOperand = false;
    } else {
        // Evita múltiplos zeros no início e ponto decimal duplicado
        if (num === '.' && displayValue.includes('.')) {
            return;
        }
        if (displayValue === '0' && num !== '.') {
            displayValue = num; // Substitui o zero inicial por outro número
        } else {
            displayValue += num;
        }
    }
    updateDisplay();
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null) {
        // Se é o primeiro número e operador
        firstOperand = inputValue;
        currentEquation = displayValue + ' ' + nextOperator + ' ';
    } else if (operator && !waitingForSecondOperand) {
        // Se já tem um primeiro operando e operador, e o display não está vazio (não esperando o segundo)
        const result = executarCalculo(firstOperand, inputValue, operator);
        displayValue = String(result); // Mostra o resultado parcial no display
        firstOperand = result; // O resultado parcial se torna o novo primeiro operando
        currentEquation = displayValue + ' ' + nextOperator + ' '; // Atualiza a equação com o resultado parcial
    } else {
        // Troca de operador antes de digitar o segundo número
        currentEquation = currentEquation.slice(0, -2) + nextOperator + ' '; // Remove o operador antigo e adiciona o novo
    }

    waitingForSecondOperand = true;
    operator = nextOperator;
    updateDisplay(); // Atualiza o display principal
}

function calcular() {
    if (operator === null || waitingForSecondOperand || firstOperand === null) {
        return; // Não faz nada se não houver operação pendente
    }

    const secondOperand = parseFloat(displayValue);
    let result;

    if (operator === 'potencia') {
        result = Math.pow(firstOperand, secondOperand);
    } else {
        result = executarCalculo(firstOperand, secondOperand, operator);
    }

    // Adiciona a parte final da equação antes de mostrar o resultado
    currentEquation += displayValue + ' =';
    displayValue = String(result); // O resultado final vai para o display principal

    // Reseta para o próximo cálculo
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;

    updateDisplay(); // Atualiza o display
    // Poderíamos limpar currentEquation aqui ou usá-la em um display secundário.
    // Por enquanto, ela será resetada na próxima operação ou `limpar()`.
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
            return second; // Caso padrão, retorna o segundo operando (pode ser ajustado)
    }
}

function limpar() {
    displayValue = '0';
    currentEquation = ''; // Limpa a equação também
    operator = null;
    firstOperand = null;
    waitingForSecondOperand = false;
    updateDisplay();
}

function apagar() {
    if (displayValue === 'Erro') { // Se o display mostra "Erro", limpa tudo ao apagar
        limpar();
        return;
    }
    
    // Se o display está mostrando o segundo operando, apaga-o
    if (!waitingForSecondOperand) { 
        displayValue = displayValue.slice(0, -1);
        if (displayValue === '' || displayValue === '-') { // Se ficar vazio ou só um sinal de menos
            displayValue = '0'; // Volta para zero
        }
    }
    // Não apaga a equação em currentEquation, pois ela representa a operação anterior
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
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    updateDisplay();
}

function potencia() {
    const inputValue = parseFloat(displayValue);
    if (firstOperand === null) {
        firstOperand = inputValue;
        operator = 'potencia'; // Define o operador para potência
        waitingForSecondOperand = true;
        currentEquation = displayValue + '^'; // Mostra "5^"
        displayValue = ''; // Limpa o display para o expoente
    } else {
        // Calcula a potência quando o segundo operando (expoente) é inserido e '=' é pressionado
        const result = Math.pow(firstOperand, inputValue);
        currentEquation += inputValue + ' ='; // Completa a equação
        displayValue = String(result);
        firstOperand = null;
        operator = null;
        waitingForSecondOperand = false;
    }
    updateDisplay();
}

function updateDisplay() {
    const displayElement = document.getElementById('display');
    if (displayElement) {

        if (currentEquation && currentEquation.endsWith(' =')) {
             // Se já calculou, mostra só o resultado e o que foi calculado
             displayElement.value = displayValue; // Só o resultado no display principal
        } else if (currentEquation) {
             // Mostra a equação parcial no display (se tiver espaço)
             displayElement.value = currentEquation + displayValue;
        } else {
            // Caso contrário, mostra apenas o valor atual
            displayElement.value = displayValue;
        }
    }
}

document.addEventListener('DOMContentLoaded', updateDisplay);

function voltar() {
    window.history.back();
}
