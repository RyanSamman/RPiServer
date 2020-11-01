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

// Current LED / Website state, -1 by default
let state = -1

io.on('connection', (socket) => {
  console.log('New client connected')
  socket.emit('state', state)

  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })

  socket.on('toggle', () => {
    console.log('toggled')
    getApiAndEmit()
  })
})

const getApiAndEmit = () => {
   // Easiest way to flip state, * -1
  state *= -1
  io.emit('state', state)

  // Map state for LED API
  // -1 -> 0
  //  1 -> 1
}

// Runs callback every 'INTERVAL_TIME' miliseconds
const INTERVAL_TIME = 10000
setInterval(() => getApiAndEmit(), INTERVAL_TIME)


const port = process.env.PORT || 4001
server.listen(port, () => console.log(`Listening on port ${port}`))