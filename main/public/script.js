// Conecta o navegador ao servidor Socket.IO.
const socket = io();

// Escuta os dados enviados pelo servidor a partir do Arduino.
socket.on("arduino-data", (data) => {
  console.log("Recebido no front:", data);

  // Formato esperado da mensagem: TEMPO:41;INTERACOES:2;CONSUMO:31
  const partes = data.split(";");
  let tempo = "--", interacoes = "--", consumo = "--";

  // Divide cada trecho em chave e valor para identificar as métricas.
  partes.forEach((p) => {
    const [chave, valor] = p.split(":");
    if (chave === "TEMPO") tempo = valor;
    if (chave === "INTERACOES") interacoes = valor;
    if (chave === "CONSUMO") consumo = valor;
  });

  // Atualiza os elementos HTML com os dados recebidos.
  document.getElementById("tempo").textContent = tempo;
  document.getElementById("interacoes").textContent = interacoes;
  document.getElementById("consumo").textContent = consumo;
});
