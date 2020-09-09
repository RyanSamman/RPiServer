import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group'

import Background from './Background';
import socketIOClient from "socket.io-client";

console.log(process.env.REACT_APP_DEV);
const ENDPOINT = "http://192.168.1.18:4001"; //"https://limitless-brook-22036.herokuapp.com/";

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
