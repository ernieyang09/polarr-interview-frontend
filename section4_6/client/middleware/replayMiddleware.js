
import equal from 'fast-deep-equal';


import {
  setUIState,
  moveCursor,
  changeColor,
  changeFakeColor,
} from '../modules/ui';


// change this to emit fake button click event
const actions = {
  moveCursor,
  // changeColor,
  changeColor: changeFakeColor,
};


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
        const [funcName, args] = r.action;
        dispatch(actions[funcName](...args))
        if (!equal(getState().ui, r.result)) {
          throw i
        }
        await sleep(r.time)
      }
    })().catch((i) => {
      alert(`Oops, something went wrong Record: ${i}`);
    })

    return
  }

  return next(action)
  // return next_action;
};
