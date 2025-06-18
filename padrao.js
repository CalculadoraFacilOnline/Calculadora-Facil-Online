let history = '';
let current = '';
let operator = '';
let resetNext = false;

const display = document.getElementById('display');

function atualizarDisplay() {
    display.value = history + current || '0';
}

function inserir(valor) {
    if (resetNext) {
        current = '';
        resetNext = false;
    }
    current += valor;
    atualizarDisplay();
}

function operar(op) {
    if (current === '') return;

    if (history && !resetNext) {
        history += current + ' ' + op + ' ';
    } else if (!history) {
        history = current + ' ' + op + ' ';
    } else {
        history = history.slice(0, -2) + op + ' ';
    }

    operator = op;
    resetNext = true;
    atualizarDisplay();
}

function limpar() {
    history = '';
    current = '';
    operator = '';
    resetNext = false;
    atualizarDisplay();
}

function apagar() {
    if (!resetNext && current.length > 0) {
        current = current.slice(0, -1);
        atualizarDisplay();
    }
}

function raizQuadrada() {
    if (current) {
        const resultado = Math.sqrt(parseFloat(current));
        history += `√(${current}) `;
        current = resultado.toString();
        resetNext = true;
        atualizarDisplay();
    }
}

function potencia() {
    if (current) {
        history += current + '^';
        current = '';
        resetNext = false;
        atualizarDisplay();
    }
}

function calcular() {
    try {
        let expressao = history + current;
        expressao = expressao.replace(/\^/g, '**');
        const resultado = eval(expressao);
        history += current + ' = ';
        current = resultado.toString();
        resetNext = true;
        atualizarDisplay();
    } catch (e) {
        current = 'Erro';
        resetNext = true;
        atualizarDisplay();
    }
}

function voltar() {
    window.history.back();
}
document.addEventListener('keydown', function(event) {
    const key = event.key;

    if (!isNaN(key)) {
        // Tecla numérica (0–9)
        inserir(key);
    } else if (key === '.') {
        inserir('.');
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        operar(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault(); // Evita o som do Enter
        calcular();
    } else if (key === 'Backspace') {
        apagar();
    } else if (key.toLowerCase() === 'c') {
        limpar();
    } else if (key === 'r') {
        // "r" para raiz quadrada
        raizQuadrada();
    } else if (key === '^') {
        potencia();
    }
});
