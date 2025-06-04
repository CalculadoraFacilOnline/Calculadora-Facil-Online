function voltar() {
  window.history.back();
}

function calcularJuros() {
  const capital = parseFloat(document.getElementById('capital').value.replace(",", ".").trim());
  const taxa = parseFloat(document.getElementById('taxa').value.replace(",", ".").trim()) / 100;
  const periodo = parseInt(document.getElementById('periodo').value);
  const aporteInput = document.getElementById('aporte').value;
  const aporte = aporteInput ? parseFloat(aporteInput.replace(",", ".").trim()) : 0;

  if (!isNaN(capital) && !isNaN(taxa) && !isNaN(periodo) && capital >= 0 && taxa >= 0 && periodo > 0) {
    let montante = capital;
    let totalAportes = aporte * periodo;

    for (let i = 0; i < periodo; i++) {
      montante = montante * (1 + taxa) + aporte;
    }

    const rendimento = montante - capital - totalAportes;

    document.getElementById('resultado').innerHTML = `
      <strong>Resultado:</strong><br>
      Valor Final: <strong>R$ ${montante.toFixed(2)}</strong><br>
      Total Investido: <strong>R$ ${(capital + totalAportes).toFixed(2)}</strong><br>
      Rendimento: <strong>R$ ${rendimento.toFixed(2)}</strong>
    `;
  } else {
    document.getElementById('resultado').innerHTML = 
      'Por favor, preencha os campos corretamente.';
  }
}