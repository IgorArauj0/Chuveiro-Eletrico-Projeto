const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { SerialPort, ReadlineParser } = require("serialport");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Servindo arquivos da pasta "public"
app.use(express.static("public"));

// Configura a porta serial (ajuste COM3 para a porta do seu Arduino)
const port = new SerialPort({ path: "COM3", baudRate: 9600 });
const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

// Quando receber dados do Arduino, envia ao navegador
parser.on("data", (data) => {
  console.log("Dados recebidos:", data);
  io.emit("arduino-data", data);
});

// Inicia servidor
server.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
