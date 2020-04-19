import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './modules/App';
import LineLogin from './modules/login/LineLogin'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, HashRouter } from 'react-router-dom';
import Header from './common/components/Header'
ReactDOM.render(
  <HashRouter>
    <Header />
    <Route exact path="/" component={App} />
    <Route path="/login" component={LineLogin} />
  </HashRouter>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
