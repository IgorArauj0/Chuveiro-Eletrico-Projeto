// Importa as bibliotecas necessárias para criar o servidor web, estabelecer comunicação em tempo real e acessar a porta serial.
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { SerialPort, ReadlineParser } = require("serialport");

// Cria a aplicação Express para servir páginas e arquivos estáticos.
const app = express();
// Cria o servidor HTTP que será utilizado pelo Socket.IO.
const server = http.createServer(app);
// Inicializa o Socket.IO para comunicação bidirecional com o navegador.
const io = new Server(server);

// Permite que o servidor receba dados em formato JSON.
app.use(express.json());
// Serve os arquivos da pasta "public" para o cliente.
app.use(express.static("public"));

// Endpoint usado pelo simulador para enviar dados falsos do Arduino.
app.post("/simular-arduino", (req, res) => {
  const data = req.body?.data;

  if (data) {
    console.log("Simulação recebida:", data);
    io.emit("arduino-data", data);
  }

  res.json({ ok: true });
});

// Configura a porta serial do Arduino.
// Ajuste o valor "COM3" para a porta correta do seu dispositivo.
const portPath = process.env.ARDUINO_PORT || "COM3";
let port = null;
let parser = null;

try {
  port = new SerialPort({ path: portPath, baudRate: 9600 });
  parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

  // Quando dados chegam da porta serial, eles são enviados para todos os clientes conectados.
  parser.on("data", (data) => {
    console.log("Dados recebidos:", data);
    io.emit("arduino-data", data);
  });

  port.on("error", (error) => {
    console.error("Erro na porta serial:", error.message);
  });
} catch (error) {
  console.error("Não foi possível abrir a porta serial:", error.message);
}

// Inicia o servidor na porta 3000.
server.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
