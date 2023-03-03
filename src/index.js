import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import {authService} from "fbase"
import { HashRouter } from "react-router-dom";
import "./style.css";
// console.log({authService});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <HashRouter base="/">
    <App />
  </HashRouter>

);