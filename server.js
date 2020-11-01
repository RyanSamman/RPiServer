// Imports
const http = require('http')
const express = require('express')
const socketIo = require('socket.io')

// Create express server
const app = express()

// Route requests to frontend files
app.use(express.static('build'))

// Create socket server
const server = http.createServer(app)
const io = socketIo(server)

// Website state, -1 by default
let state = -1

// When a client connects to the SocketIO server
io.on('connection', (socket) => {

  console.log('New client connected')

  // Send current state
  socket.emit('state', state)

  // Callback upon disconnect event
  socket.on('disconnect', () => console.log('Client disconnected'))

  // Callback upon toggle event
  socket.on('toggle', getApiAndEmit)
})

const getApiAndEmit = () => {
   // Easiest way to flip state, * -1
  state *= -1
  io.emit('state', state)
}

// Runs callback every 'INTERVAL_TIME' miliseconds
const INTERVAL_TIME = 10000
setInterval(() => getApiAndEmit(), INTERVAL_TIME)

// Allow server to listen to Heroku/.env Port or 4001
const port = process.env.PORT || 4001
server.listen(port, () => console.log(`Listening on port ${port}`))