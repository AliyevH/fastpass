import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/main.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { store } from './store/store';

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
  document.getElementById('root')
);


serviceWorker.unregister();
