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
        history = ''; // Limpa histórico ao começar nova entrada após resultado
    }
    current += valor;
    atualizarDisplay();
}

function operar(op) {
    if (current === '' && history === '') return; // nada para operar

    if (resetNext) {
        // Se acabou de calcular, usa resultado como base
        history = current + ' ' + op + ' ';
        current = '';
        resetNext = false;
    } else {
        if (current === '') {
            // Troca operador no histórico se o usuário apertar outro operador direto
            history = history.slice(0, -2) + op + ' ';
        } else {
            history += current + ' ' + op + ' ';
            current = '';
        }
    }
    operator = op;
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
    if (resetNext) {
        // Se está esperando resetar, apagar limpa tudo
        limpar();
        return;
    }
    if (current.length > 0) {
        current = current.slice(0, -1);
        atualizarDisplay();
    }
}

function raizQuadrada() {
    if (current) {
        const num = parseFloat(current);
        if (num >= 0) {
            const resultado = Math.sqrt(num);
            history = `√(${current}) = `;
            current = resultado.toString();
            resetNext = true;
            atualizarDisplay();
        }
    }
}

function potencia() {
    if (resetNext) {
        history = current + '^';
        current = '';
        resetNext = false;
    } else if (current) {
        history += current + '^';
        current = '';
    }
    atualizarDisplay();
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

// Suporte ao teclado (opcional, pode manter se quiser)
document.addEventListener('keydown', function(event) {
    const key = event.key;

    if (!isNaN(key)) {
        inserir(key);
    } else if (key === '.') {
        inserir('.');
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        operar(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calcular();
    } else if (key === 'Backspace') {
        apagar();
    } else if (key.toLowerCase() === 'c') {
        limpar();
    } else if (key === 'r') {
        raizQuadrada();
    } else if (key === '^') {
        potencia();
    }
});
