
// Init State
export const getInitialState = () => ({
  cursor: {
    offsetX: null,
    offsetY: null,
  },
});



/**
 * Constants
 */
export const MOVE_CURSOR = `UI/MOVE_CURSOR`;



// Reducer
export default (state = getInitialState(), action = {}) => {
  switch (action.type) {
    case MOVE_CURSOR:
      
      return {
        ...state,
        cursor: action.cursor,
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
