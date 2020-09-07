import React, { useTransition } from 'react'
import { CSSTransitionGroup } from 'react-transition-group'
import logo from './logo.svg';
import './App.css';

export default function Background ({ state, toggle }) {
	return (
	  <CSSTransitionGroup
		transitionName={state === 1 ? 'example' : 'example'}
		transitionAppear={true}
		transitionAppearTimeout={150}
	  >
		<header className={`App-header ${state === 1 ? 'yellow' : ''}`} onClick={toggle}>
		  <img src={logo} className="App-logo" alt="logo" />
		</header>
	  </CSSTransitionGroup>
	);
  };