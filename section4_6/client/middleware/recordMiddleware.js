

let arr;
export default ({ getState }) => next => (action) => {
  const state = getState();
  
  if (action.type === 'SWITCH_RECORD' && action.status) {
    arr = action.arr;
  }

  const next_action = next(action);
  const new_state = getState();

  if (new_state.root.isRecording) {
    arr.push([new Date().getTime(), action.record, new_state.ui])
  }
  
  return next_action;
};
