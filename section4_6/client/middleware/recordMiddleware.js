
let temp = [];
export default ({ getState }) => next => (action) => {
  const state = getState();
  
  if (action.type === 'SWITCH_RECORD') {
    if (action.status) {
      temp = [];
    } else {
      console.log(temp);
    }
  }

  const next_action = next(action);
  const new_state = getState();

  if (new_state.root.isRecording) {
    temp.push([action, new_state.ui])
  }
  
  return next_action;
};
