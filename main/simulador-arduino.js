// Script de simulação do Arduino para testar o projeto sem hardware físico.
// Ele envia dados em formato semelhante ao esperado pelo sistema: TEMPO:xx;INTERACOES:xx;CONSUMO:xx

const http = require("http");

function enviarDadosSimulados() {
  const tempo = Math.floor(Math.random() * 100) + 1;
  const interacoes = Math.floor(Math.random() * 20) + 1;
  const consumo = Math.floor(Math.random() * 50) + 10;

  const payload = {
    data: `TEMPO:${tempo};INTERACOES:${interacoes};CONSUMO:${consumo}`
  };

  const req = http.request(
    {
      hostname: "localhost",
      port: 3000,
      path: "/simular-arduino",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    },
    (res) => {
      res.on("data", () => {});
    }
  );

  req.on("error", (err) => {
    console.error("Erro ao enviar dados simulados:", err.message);
  });

  req.write(JSON.stringify(payload));
  req.end();
}

console.log("Simulador do Arduino iniciado...");
setInterval(enviarDadosSimulados, 2000);
