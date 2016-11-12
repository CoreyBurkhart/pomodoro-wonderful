import React from 'react';
import ReactDOM from 'react-dom';
import Body from './components/Body';
import Header from './components/Header';
import './css/layout.css';


ReactDOM.render(
  <div>
    <Header />
    <div className="container">
      <Body />
    </div>
  </div>,
  document.getElementById('root')
);
