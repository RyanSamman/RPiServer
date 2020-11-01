// Imports
const http = require('http')
const { Gpio } = require('onoff')
const express = require('express')
const socketIo = require('socket.io')

// Create LED Object to control GPIO
const LED = Gpio(4, 'out')

process.on('SIGINT', () => {
  LED.writeSync(0)
  LED.unexport()
})

// Create express server
const app = express()

// Route requests to frontend files
app.use(express.static('build'))

// Create socket server
const server = http.createServer(app)
const io = socketIo(server)

// variable to store Interval - Runs callback every 'INTERVAL_TIME' miliseconds
let interval
const INTERVAL_TIME = 10000

// Current LED / Website state, -1 by default
let state = -1

io.on('connection', (socket) => {
  console.log('New client connected')
  socket.emit('state', state)

  if (interval) clearInterval(interval)
  interval = setInterval(() => getApiAndEmit(socket), INTERVAL_TIME)

  socket.on('disconnect', () => {
    console.log('Client disconnected')
    clearInterval(interval)
  })

  socket.on('toggle', () => {
    console.log('toggled')
    getApiAndEmit(socket)
  })
})

const getApiAndEmit = () => {
   // Easiest way to flip state, * -1
  state *= -1
  io.emit('state', state)

  // Map state for LED API
  // -1 -> 0
  //  1 -> 1
  LED.writeSync([0, 0, 1][state + 1]) 
}

const port = process.env.PORT || 4001
server.listen(port, () => console.log(`Listening on port ${port}`))