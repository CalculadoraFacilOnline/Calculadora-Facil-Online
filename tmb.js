function calcularTMB() {
  const sexo = document.getElementById('sexo').value;
  const peso = parseFloat(document.getElementById('peso').value);
  const altura = parseFloat(document.getElementById('altura').value); // em cm
  const idade = parseInt(document.getElementById('idade').value);
  const resultadoElement = document.getElementById('resultado');

  if (isNaN(peso) || isNaN(altura) || isNaN(idade) || peso <= 0 || altura <= 0 || idade <= 0) {
    resultadoElement.textContent = "Por favor, preencha todos os campos com valores válidos.";
    resultadoElement.className = "resultado erro";
    return;
  }

  let tmb;

  // Fórmula de Mifflin-St Jeor
  if (sexo === 'masculino') {
    tmb = (10 * peso) + (6.25 * altura) - (5 * idade) + 5;
  } else { // feminino
    tmb = (10 * peso) + (6.25 * altura) - (5 * idade) - 161;
  }

  resultadoElement.textContent = `Sua Taxa Metabólica Basal (TMB) é de aproximadamente ${tmb.toFixed(0)} calorias por dia.`;
  resultadoElement.className = "resultado sucesso";
}

function voltar() {
  window.history.back();
}
