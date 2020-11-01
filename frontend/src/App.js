import React, { useState, useEffect } from 'react';

import Background from './Background';
import socketIOClient from "socket.io-client";

// Don't hard-code the URL
const ENDPOINT = "https://ryans-socket.herokuapp.com/";

const socket = socketIOClient(ENDPOINT);

const toggle = () => {
  socket.emit('toggle', true)
}

function App() {
  const [state, setState] = useState(-1);

  useEffect(() => {
    socket.on('state', (newState) => setState(newState));
    return () => socket.disconnect();
  }, []);

  return (
    <Background state={state} toggle={toggle} />
  );
}

export default App;
