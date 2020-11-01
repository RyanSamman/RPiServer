import React, { useState, useEffect } from 'react'

import Background from './Background'
import socketIOClient from 'socket.io-client'

// Window location
const ENDPOINT = window.location.href
const socket = socketIOClient(ENDPOINT)

// Toggle function
const toggle = () => socket.emit('toggle', true)

function App() {
  const [state, setState] = useState(-1)

  useEffect(() => {
    socket.on('state', (newState) => setState(newState))

    // Callback upon component unmount
    return () => socket.disconnect()
  }, [])

  return <Background state={state} toggle={toggle} />
}

export default App;
