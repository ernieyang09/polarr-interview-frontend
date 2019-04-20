
import equal from 'fast-deep-equal';
import io from 'socket.io-client';

import {
  setUIState,
  moveCursor,
  changeColor,
  changeFakeColor,
} from '../modules/ui';


// change this to emit fake button click event
const actions = {
  moveCursor,
  changeColor,
  // changeColor: changeFakeColor,
};


const sleep = (time) => {
  return new Promise((resolve)=> {
    setTimeout((
    )=> {  resolve(); }, time)
  })
}

const socket = io('http://localhost:3000');

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
          throw [i, r.result, funcName]
        }
        await sleep(r.time)
      }
      socket.emit('test_result', [new Date().getTime(), id, true]);
    })().catch(([i , result, funcName]) => {
      alert(`Oops, something went wrong Record: ${i}`);
      socket.emit('test_result', [new Date().getTime(), id, false, {
        record: i,
        action: funcName,
        expected: result,
        received: getState().ui,
      }]);
    })

    return
  }

  return next(action)
  // return next_action;
};
