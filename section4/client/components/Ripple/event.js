import {
  moveCursor,
} from '../../modules/ui';

let isDrag =false;

let timeout;

const rippleStart = (dispatch) => (evt) => {
  isDrag = true;

  let pageX, pageY;
  if (evt.type.includes('touch')) {
    pageX = evt.targetTouches[0].pageX;
    pageY = evt.targetTouches[0].pageY;
  } else {
    pageX = evt.pageX;
    pageY = evt.pageY;
  }
  dispatch(moveCursor({
    offsetX: pageX,
    offsetY: pageY,
    isLeaving: false,
  }));
}

const rippleMove = (dispatch) => (evt) => {
  if (timeout) {
    window.cancelAnimationFrame(timeout);
  }
  timeout = window.requestAnimationFrame(() => {
    if (isDrag) {
      rippleStart(dispatch)(evt);
    }
  })
}

const rippleEnd = (dispatch) => (evt) => {
  isDrag = false;
  dispatch(moveCursor({
    isLeaving: true,
  }));
}

export default {
  mousedown: rippleStart,
  mousemove: rippleMove,
  mouseup: rippleEnd,
  touchstart: rippleStart,
  touchmove: rippleMove,
  touchend: rippleEnd,
}