import React from 'react';
import { Router, Route, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import logo from './logo.svg';
import './App.css';

import HomePage from './HomePage';
import TopBar from './TopBar';

const history = createBrowserHistory();

const App: React.FC = () => {
  return (
    <div className="App">
      <Router history={history}>
        <TopBar></TopBar>
        <Route path="/" exact component={HomePage}/>
      </Router>
    </div>
  );
}

export default App;
