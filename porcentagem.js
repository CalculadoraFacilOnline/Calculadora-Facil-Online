function voltar() {
  window.history.back();
}

function calcularPorcentagem() {
  const valor = parseFloat(document.getElementById('valor').value);
  const porcentagem = parseFloat(document.getElementById('porcentagem').value);
  const tipo = document.getElementById('tipo').value;
  let resultado = '';

  if (isNaN(valor) || (tipo !== 'percentual' && isNaN(porcentagem))) {
    resultado = 'Por favor, preencha os campos corretamente.';
  } else {
    switch (tipo) {
      case 'desconto':
        resultado = `Valor com desconto: R$ ${(valor - (valor * porcentagem / 100)).toFixed(2)}`;
        break;
      case 'aumento':
        resultado = `Valor com aumento: R$ ${(valor + (valor * porcentagem / 100)).toFixed(2)}`;
        break;
      case 'percentual':
        // Aqui consideramos que 'valor' é a parte e 'porcentagem' o total
        if (porcentagem === 0) {
          resultado = 'O total não pode ser zero.';
        } else {
          const percentualCalculado = (valor / porcentagem) * 100;
          resultado = `${valor} representa ${percentualCalculado.toFixed(2)}% de ${porcentagem}.`;
        }
        break;
      default:
        resultado = 'Tipo de cálculo inválido.';
    }
  }
  document.getElementById('resultado').innerHTML = resultado;
}