import React, { useState, useEffect } from 'react';
import { useDispatch } from "redux-react-hook";




const Event = (props) => {

  const dispatch = useDispatch();
  const container = props.canvas;

  useEffect(()=> {
    Object.entries(props.event).forEach(([event, func]) => {
      container.current.addEventListener(event, func(dispatch));
    })
  }, () => {
    Object.keys(props.event).forEach((event) => {
      container.current.addEventListener(event);
    });
  }, [container.current])

  return (
    <></>
  )
}

export default Event;