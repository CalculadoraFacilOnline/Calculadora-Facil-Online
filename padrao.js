let history = '';
let current = '';
let operator = '';
let resetNext = false;

const historyDisplay = document.getElementById('history-display');
const mainDisplay = document.getElementById('main-display');

function atualizarDisplays() {
    historyDisplay.value = history;
    mainDisplay.value = current || '0';
}

function adicionar(valor) {
    if (resetNext) {
        current = '';
        resetNext = false;
    }
    current += valor;
    atualizarDisplays();
}

function handleOperator(op) {
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
    atualizarDisplays();
}

function limpar() {
    history = '';
    current = '';
    operator = '';
    resetNext = false;
    atualizarDisplays();
}

function apagar() {
    if (!resetNext && current.length > 0) {
        current = current.slice(0, -1);
        atualizarDisplays();
    }
}

function raizQuadrada() {
    if (current) {
        const resultado = Math.sqrt(parseFloat(current));
        history += `√(${current}) `;
        current = resultado.toString();
        resetNext = true;
        atualizarDisplays();
    }
}

function potencia() {
    if (current) {
        history += current + '^';
        current = '';
        resetNext = false;
        atualizarDisplays();
    }
}

function calcular() {
    try {
        let expressao = history + current;

        // Substituir `^` por `**` se tiver usado `potencia`
        expressao = expressao.replace(/\^/g, '**');

        const resultado = eval(expressao);
        history += current + ' =';
        current = resultado.toString();
        resetNext = true;
        atualizarDisplays();
    } catch (e) {
        current = 'Erro';
        resetNext = true;
        atualizarDisplays();
    }
}

function voltar() {
    window.history.back();
}
