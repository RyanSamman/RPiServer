import React, { useState, useEffect, useTransition } from 'react';
import Background from './Background';
import socketIOClient from "socket.io-client";

const ENDPOINT = "https://limitless-brook-22036.herokuapp.com/";

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
    <Background state={state} toggle={toggle}/>
  );
}

export default App;
