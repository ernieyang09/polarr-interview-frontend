import React from 'react';
import { render } from 'react-dom';
import {StoreContext} from 'redux-react-hook';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { createStore, applyMiddleware } from 'redux';


import App from './App';
import modules from './modules';
import recordMiddleware from './middleware/recordMiddleware';

const store = createStore(
  modules,
  composeWithDevTools(
    applyMiddleware(recordMiddleware)
  ),
);

render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>
  ,
  document.getElementById("root"),
);
