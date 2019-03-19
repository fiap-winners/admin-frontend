// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import * as utils from './utils';

ReactDOM.render(
  <App
    addAccountToLocalStorage={utils.addAccountToLocalStorage}
    getAccountFromLocalStorage={utils.getAccountFromLocalStorage}
    removeAccountFromLocalStorage={utils.removeAccountFromLocalStorage}
  />,
  document.getElementById('root')
);
