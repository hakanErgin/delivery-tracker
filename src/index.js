import React from 'react';
import { render } from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';

import App from './App';
import rootReducer from './reducers/index';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunk))
);
export const persistor = persistStore(store);

render(
  <Provider store={store}>
    <App persistor={persistor} />
  </Provider>,
  document.getElementById('root')
);
