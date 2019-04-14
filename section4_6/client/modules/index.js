import { combineReducers } from 'redux';
import uiReducer from './ui'

const root = (state = { isRecording: false, mode: 'edit' }, action = {}) => {
  switch (action.type) {
    case 'SWITCH_RECORD':
      return {
        ...state,
        isRecording: action.status,
      };
    case 'SWITCH_MODE':
      return {
        ...state,
        mode: action.mode,
      };
    default:
      return state;
  }
};

export default combineReducers({
  root: root,
  ui: uiReducer,
});
