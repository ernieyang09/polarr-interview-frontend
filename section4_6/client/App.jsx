import React , { useState, useEffect } from 'react';
import { useDispatch } from 'redux-react-hook';

import { 
  Ripple,
  NullCanvas,
  Event,
  ColorButton,
  RecordPanel,
} from './components';

import events from './components/Ripple/event';






const App = () => {

  const dispatch = useDispatch();

  useEffect(()=> {
    console.log('update');
  },[])

  const ref = React.createRef();

  return (
    <>
      <Event
        canvas={ref}
        event={events}
      />
      <RecordPanel />
      <Ripple />
      <NullCanvas ref={ref}/>
      <ColorButton />
    </>

  )
}

export default App;
