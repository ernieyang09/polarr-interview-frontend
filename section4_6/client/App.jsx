import React , { useState, useEffect } from 'react';
import { useDispatch } from 'redux-react-hook';
import qs from 'query-string';

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
    const { id } = qs.parse(location.search);
    async function fetchData (id) {
      const res = await fetch(`/api/record/${id}`)
      if (res.status !== 200) {
        dispatch({
          type: 'SWITCH_MODE',
          mode: 'edit',
        })
      }
      const arr = await res.json();
      dispatch({
        replay: true,
        id,
        payload: arr,
      })

    }
    if (id) {
      dispatch({
        type: 'SWITCH_MODE',
        mode: 'view',
      })
      fetchData(id);
    }
    
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
