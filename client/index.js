import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { BrowserRouter, Route } from 'react-router-dom';

import jquery from 'jquery';
import bootstrap from 'bootstrap';

import { createBrowserHistory } from 'history';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'

//import history from './history/history'
import reducer from './reducer';
import XbeiApp from './containers/XbeiApp';

//Enable debug feature for immutable
import immutableDevtools from 'immutable-devtools';
import immutable from 'immutable';
immutableDevtools(immutable);

const browserHistory = createBrowserHistory();
const routermw = routerMiddleware(browserHistory);
const loggerMiddleware = createLogger();

const store = createStore(reducer, applyMiddleware(routermw, thunk, loggerMiddleware));
//const store = createStore(reducer, applyMiddleware(thunk, loggerMiddleware));
//const h = history(store, browserHistory);
console.info('test');

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={browserHistory}>
      <XbeiApp />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('main')
);
