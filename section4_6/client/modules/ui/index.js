
// Init State
export const getInitialState = () => ({
  cursor: {
    offsetX: null,
    offsetY: null,
    isLeaving: true,
  },
  button: {
    color: 'red',
  }
});



/**
 * Constants
 */
export const MOVE_CURSOR = 'UI/MOVE_CURSOR';
export const CHANGE_COLOR = 'UI/CHANGE_COLOR';
export const SET_UI_STATE = 'SET_UI_STATE';



// Reducer
export default (state = getInitialState(), action = {}) => {
  switch (action.type) {
    case MOVE_CURSOR:
      return {
        ...state,
        cursor: {
          ...state.cursor,
          ...action.cursor,
        },
      };
    case CHANGE_COLOR:
      return {
        ...state,
        button: {
          color: action.color,
        }
      }
    case SET_UI_STATE:
      return {
        ...action.payload
      };
    default:
      return state;
  }
};

// Action Creators
export const moveCursor = (cursor) => ({
    type: MOVE_CURSOR,
    cursor,
});

export const changeColor = (color) => ({
  type: CHANGE_COLOR,
  color,
});

export const setUIState = (payload) => ({
  type: SET_UI_STATE,
  payload,
})
