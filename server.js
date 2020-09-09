const { Gpio } = require('onoff');
const LED = Gpio(4, 'out');

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;

const app = express();
app.use(express.static('build'));

const server = http.createServer(app);

const io = socketIo(server);

let interval;
let state = -1;

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.emit('state', state);
  if (interval) {
    clearInterval(interval);
  }
  
  interval = setInterval(() => getApiAndEmit(socket), 10000);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });

  socket.on("toggle", () => {
    console.log('toggled');
    getApiAndEmit(socket)
  })
});

const getApiAndEmit = (socket) => {
  state *= -1;
  io.emit("state", state);
  LED.writeSync([0, 0, 1][state + 1]); // Enumerate -1, 1 to 0, 1
};

server.listen(port, () => console.log(`Listening on port ${port}`));

process.on('SIGINT', () => {
  LED.writeSync(0);
  LED.unexport();
})