// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import * as utils from './utils';

import { Provider } from 'react-redux';
import configureStore from './configure_store';

ReactDOM.render(
  <Provider store={configureStore()}>
    <App
      addAccountToLocalStorage={utils.addAccountToLocalStorage}
      getAccountFromLocalStorage={utils.getAccountFromLocalStorage}
      removeAccountFromLocalStorage={utils.removeAccountFromLocalStorage}
    />
  </Provider>,
  document.getElementById('root')
);
