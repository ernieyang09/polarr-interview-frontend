import React, { useState, useEffect } from 'react';
import { useDispatch } from "redux-react-hook";
import {
  moveCursor,
} from '../../modules/ui';



// rippleEnd = ({pageX, pageY, timeStamp}) => {
//   if (this.props.record) {
//     if (this.timeout) {
//       window.cancelAnimationFrame(this.timeout);
//     }
//     this.timeout = window.requestAnimationFrame(() => {

//           // Run our scroll functions
//       console.log( 'debounced' );
//       this.records.push([pageX, pageY, timeStamp, true])

//     });
//   }
//   this.setState({
//     leave: true
//   })
// }

let isDrag = false;

const Event = (props) => {

  const dispatch = useDispatch();
  const container = props.canvas;

  const rippleStart = (evt, container) => {
    // console.log(evt)
    
    let pageX, pageY;
    const bounds = container.getBoundingClientRect();
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
    }));
  }

  useEffect(()=> {

    container.current.addEventListener('mousedown', (evt) => {
      isDrag = true;
      rippleStart(evt, container.current);
    });
    container.current.addEventListener('mouseup', (evt) => {
      isDrag = false;
    })
    // container.addEventListener('mousedown', (evt) => {
    //   console.log(evt)
    // })
  }, () => {
    container.current.removeListener('mousedown');
    container.current.removeListener('mouseup');
  }, [container.current])
  console.log(props)
  return (
    <div>
      {
        props.children
      }
    </div>
  )
}

export default Event;