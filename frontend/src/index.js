import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/main.css';
import MainApp from './MainApp';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { store } from './store/store';

ReactDOM.render(
    <Provider store={store}>
      <MainApp/>
    </Provider>,
  document.getElementById('root')
);


serviceWorker.unregister();
