let display = document.getElementById('display');
let currentInput = '';
let operator = '';
let firstOperand = null;
let waitingForSecondOperand = false;

function adicionar(valor) {
  if (waitingForSecondOperand) {
    currentInput = valor;
    waitingForSecondOperand = false;
  } else {
    currentInput += valor;
  }
  display.value = currentInput;
}

function limpar() {
  currentInput = '';
  operator = '';
  firstOperand = null;
  waitingForSecondOperand = false;
  display.value = '';
}

function apagar() {
  currentInput = currentInput.slice(0, -1);
  display.value = currentInput;
}

function calcular() {
  if (currentInput === '' && operator !== '') {
    // Permite calcular o mesmo valor com o operador anterior se nada for digitado
    currentInput = firstOperand;
  }
  
  if (currentInput === '' || operator === '') {
    return; // Não faz nada se não houver números ou operador
  }

  const secondOperand = parseFloat(currentInput);
  let resultado;

  switch (operator) {
    case '+':
      resultado = firstOperand + secondOperand;
      break;
    case '-':
      resultado = firstOperand - secondOperand;
      break;
    case '*':
      resultado = firstOperand * secondOperand;
      break;
    case '/':
      if (secondOperand === 0) {
        alert("Divisão por zero não é permitida!");
        limpar();
        return;
      }
      resultado = firstOperand / secondOperand;
      break;
    case '^': // Operador para potência
      resultado = Math.pow(firstOperand, secondOperand);
      break;
    default:
      return;
  }

  display.value = resultado;
  currentInput = resultado.toString();
  firstOperand = resultado;
  operator = ''; // Reseta o operador após o cálculo
  waitingForSecondOperand = true; // Prepara para um novo cálculo ou continuação
}

function handleOperator(nextOperator) {
  const inputValue = parseFloat(currentInput);

  if (firstOperand === null) {
    firstOperand = inputValue;
  } else if (operator) { // Se já tem um operador, calcula o anterior
    calcular();
    firstOperand = parseFloat(display.value); // Atualiza firstOperand com o resultado
  }

  waitingForSecondOperand = true;
  operator = nextOperator;
}


// --- Novas Funções de Raiz e Potência ---

function raizQuadrada() {
  const valor = parseFloat(currentInput);
  if (isNaN(valor) || valor < 0) {
    display.value = 'Erro';
    currentInput = '';
    return;
  }
  const resultado = Math.sqrt(valor);
  display.value = resultado;
  currentInput = resultado.toString();
  firstOperand = resultado;
  waitingForSecondOperand = true;
}

function potencia() {

  handleOperator('^'); 
  display.value = currentInput + '^'; 
}

function voltar() {
  window.history.back();
}


// Event listener para permitir input do teclado (opcional, mas bom para UX)
document.addEventListener('keydown', function(event) {
  const key = event.key;

  if (/[0-9]/.test(key)) { // Números
    adicionar(key);
  } else if (key === '.') { // Ponto decimal
    adicionar('.');
  } else if (key === '+' || key === '-' || key === '*' || key === '/') { // Operadores
 
    adicionar(key);
  } else if (key === 'Enter') { // Enter para calcular
    calcular();
  } else if (key === 'Backspace') { // Backspace para apagar
    apagar();
  } else if (key === 'Escape') { // Esc para limpar
    limpar();
  }
});
