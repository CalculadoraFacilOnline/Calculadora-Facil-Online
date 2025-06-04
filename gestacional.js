function calcularGestacao() {
  const inputData = document.getElementById('data-ultima-menstruacao').value;
  if (!inputData) {
    document.getElementById('resultado').innerHTML = 'Por favor, informe a data da última menstruação.';
    return;
  }

  const dataUltimaMenstruacao = new Date(inputData);
  const hoje = new Date();

  if (dataUltimaMenstruacao > hoje) {
    document.getElementById('resultado').innerHTML = 'A data não pode ser no futuro.';
    return;
  }

  const diffTempo = hoje - dataUltimaMenstruacao;
  const diffDias = Math.floor(diffTempo / (1000 * 60 * 60 * 24));

  const semanas = Math.floor(diffDias / 7);
  const dias = diffDias % 7;

  // Data provável do parto = 280 dias após última menstruação
  const dataProvavelParto = new Date(dataUltimaMenstruacao);
  dataProvavelParto.setDate(dataProvavelParto.getDate() + 280);

  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const partoFormatado = dataProvavelParto.toLocaleDateString('pt-BR', options);

  document.getElementById('resultado').innerHTML = `
    <strong>Idade Gestacional:</strong> ${semanas} semanas e ${dias} dias<br>
    <strong>Data Provável do Parto:</strong> ${partoFormatado} <br>
    <strong>Pode haver erros!</strong>
  `;
}
function voltar() {
  window.history.back();
}