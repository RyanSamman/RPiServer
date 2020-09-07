const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;

const app = express();
app.use(express.static('/build'));

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
    state *= -1;
    socket.emit('state', state);
  })
});

const getApiAndEmit = socket => {
  state *= -1;
  // Emitting a new message. Will be consumed by the client
  io.sockets.emit("state", state);
};

server.listen(port, () => console.log(`Listening on port ${port}`));