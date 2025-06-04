const display = document.getElementById('display');
const operadores = ['+', '-', '×', '÷'];
let emErro = false;

display.addEventListener('keydown', function(event) {
  const tecla = event.key;

  if (emErro) {
    if (tecla !== 'Enter' && tecla !== 'Backspace' && tecla !== 'Delete') {
      limpar();
      emErro = false;
    }
    if (tecla === 'Backspace' || tecla === 'Delete') {
      event.preventDefault();
      return;
    }
  }

  const teclasPermitidas = ['0','1','2','3','4','5','6','7','8','9',
                            '+','-','*','/','.','Backspace','Delete','ArrowLeft','ArrowRight','Enter'];

  if (tecla === 'Enter') {
    event.preventDefault();
    calcular();
    return;
  }

  if (tecla === '*') {
    event.preventDefault();
    adicionar('×');
    return;
  }

  if (tecla === '/') {
    event.preventDefault();
    adicionar('÷');
    return;
  }

  if (!teclasPermitidas.includes(tecla)) {
    event.preventDefault();
  }
});

function adicionar(valor) {
  if (emErro) {
    limpar();
    emErro = false;
  }

  const ultimoChar = display.value.slice(-1);

  if (operadores.includes(valor) && display.value === '') return;

  if (operadores.includes(valor) && operadores.includes(ultimoChar)) {
    display.value = display.value.slice(0, -1) + valor;
  } else {
    display.value += valor;
  }
}

function limpar() {
  display.value = '';
  emErro = false;
}

function apagar() {
  if (emErro) return;
  display.value = display.value.slice(0, -1);
}

function calcular() {
  try {
    const ultimoChar = display.value.slice(-1);
    if (operadores.includes(ultimoChar)) {
      display.value = 'Erro';
      emErro = true;
      return;
    }
    let expressao = display.value.replace(/×/g, '*').replace(/÷/g, '/');
    display.value = eval(expressao);
    emErro = false;
  } catch {
    display.value = 'Erro';
    emErro = true;
  }
}
function voltar() {
  window.history.back();
}