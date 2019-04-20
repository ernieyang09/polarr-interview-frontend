
import equal from 'fast-deep-equal';

import {
  setUIState,
} from '../modules/ui';

const sleep = (time) => {
  return new Promise((resolve)=> {
    setTimeout((
    )=> {  resolve(); }, time)
  })
}

export default ({ dispatch, getState }) => next => (action) => {
  const state = getState();
  
  if (action.replay) {
    
    const { id, payload } = action;
    const [tail, ...arr] = payload;

    dispatch(setUIState(JSON.parse(tail.result)));

    const new_arr = arr.map((x, i) => ({
      action: JSON.parse(x.action),
      result: JSON.parse(x.result),
      time: (i === 0)? 0 : x.time - arr[i-1].time,
    }));

    (async()=> {
      for (const [i, r] of new_arr.entries()) {
        dispatch(r.action)
        if (!equal(getState().ui, r.result)) {
          throw i
        }
        await sleep(r.time)
      }
    })().catch((e) => {
      alert(`Oops, something went wrong Reord: ${i}`);
    })

    return
  }

  return next(action)
  // return next_action;
};
