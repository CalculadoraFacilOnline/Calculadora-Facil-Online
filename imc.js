function calcularIMC() {
  const pesoStr = document.getElementById('peso').value;
  const alturaStr = document.getElementById('altura').value;

  const peso = parseFloat(pesoStr.replace(",", ".").trim());
  const altura = parseFloat(alturaStr.replace(",", ".").trim());

  if (peso > 0 && altura > 0) {
    const imc = peso / (altura * altura);
    let classificacao = '';

    if (imc < 18.5) classificacao = 'Abaixo do peso';
    else if (imc < 24.9) classificacao = 'Peso normal';
    else if (imc < 29.9) classificacao = 'Sobrepeso';
    else if (imc < 34.9) classificacao = 'Obesidade Grau I';
    else if (imc < 39.9) classificacao = 'Obesidade Grau II';
    else classificacao = 'Obesidade Grau III';

    document.getElementById('resultado').innerHTML = 
      `Seu IMC é <strong>${imc.toFixed(2)}</strong> (${classificacao}).`;
  } else {
    document.getElementById('resultado').innerHTML = 
      'Por favor, preencha peso e altura corretamente.';
  }
}

function voltar() {
  window.history.back();
}