const socket = io();

// Quando receber dados do Arduino
socket.on("arduino-data", (data) => {
  console.log("Recebido no front:", data);

  // Exemplo: TEMPO:41;INTERACOES:2;CONSUMO:31
  const partes = data.split(";");
  let tempo = "--", interacoes = "--", consumo = "--";

  partes.forEach(p => {
    const [chave, valor] = p.split(":");
    if (chave === "TEMPO") tempo = valor;
    if (chave === "INTERACOES") interacoes = valor;
    if (chave === "CONSUMO") consumo = valor;
  });

  

  // Atualiza os elementos da página
  document.getElementById("tempo").textContent = tempo;
  document.getElementById("interacoes").textContent = interacoes;
  document.getElementById("consumo").textContent = consumo;
});
