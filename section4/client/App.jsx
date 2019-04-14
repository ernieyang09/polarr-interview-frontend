import React , { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import {StoreContext} from 'redux-react-hook';


import modules from './modules';
import { 
  Ripple,
  NullCanvas,
  Event,
} from './components';




const store = createStore(
  modules,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


const App = () => {
  const ref = React.createRef();
  return (
    <StoreContext.Provider value={store}>
      <Event canvas={ref} >
        <Ripple />
        <NullCanvas ref={ref}/>
      </Event>
    </StoreContext.Provider>
  )
}

export default App;
