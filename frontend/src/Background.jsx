import './App.css';
import React from 'react'
import logo from './logo.svg';
import moon from './Moon.gif';

export default function Background({ state, toggle }) {
	return (
		<header className={`App-header ${state === 1 ? 'moonbg' : ''}`} onClick={toggle}>
			{state === 1
			 ? <img src={moon} className="moon" alt="logo" />
			 : <img src={logo} className="App-logo" alt="moon" />
			 }
		</header>
	);
};
