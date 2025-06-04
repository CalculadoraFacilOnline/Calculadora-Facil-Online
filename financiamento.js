function calcularFinanciamento() {
  const valorStr = document.getElementById('valor').value;
  const taxaStr = document.getElementById('taxa').value;
  const parcelasStr = document.getElementById('parcelas').value;

  const valor = parseFloat(valorStr.replace(",", ".").trim());
  const taxa = parseFloat(taxaStr.replace(",", ".").trim()) / 100;
  const parcelas = parseInt(parcelasStr);

  if (valor > 0 && taxa >= 0 && parcelas > 0) {
    const p = (valor * taxa * Math.pow(1 + taxa, parcelas)) / (Math.pow(1 + taxa, parcelas) - 1);

    document.getElementById('resultado').innerHTML = `
      <strong>Valor da Parcela:</strong> R$ ${p.toFixed(2)}
    `;
  } else {
    document.getElementById('resultado').innerHTML = 'Por favor, preencha os campos corretamente.';
  }
}

function voltar() {
  window.history.back();
}
