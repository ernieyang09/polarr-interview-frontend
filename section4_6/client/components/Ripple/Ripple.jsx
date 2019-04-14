import React, { useCallback, Component, useEffect, useState } from 'react';
import { useDispatch, useMappedState } from "redux-react-hook";
import styled, { css, keyframes } from 'styled-components';
import {
  moveCursor,
} from '../../modules/ui';

import './style.scss'


const Ripple = (props) => {
  const dispatch = useDispatch();
  const mapState = useCallback(state => state.ui.cursor, []);
  const { offsetX, offsetY, isLeaving } = useMappedState(mapState);
  
  return (
    <>
      {
        offsetX && offsetY && 
          <StyledRipple
            x={offsetX}
            y={offsetY}
            isLeaving={isLeaving}
            onAnimationEnd={() => {
              dispatch(moveCursor({
                offsetX: null,
                offsetY: null,
              }));
            }}
          />
      }
      {props.children}
    </>
  )
}

const StyledRipple = styled.div.attrs(({x, y}) => ({
  style: {
    top: y ? `${y-20}px`: '0px',
    left: x ? `${x-20}px`: '0px',
  }
}))`
  width: 40px;
  height: 40px;
  position: absolute;
  border-radius: 50%;
  background-color: rgba(1,1,1,0.3);
  border: 2px solid rgba(1,1,1,0.4);
  pointer-events: none;
  box-sizing: border-box;

  ${props => props.isLeaving && css`
    animation: ${leaving} 0.2s linear forwards;
  `}

`;

const leaving = keyframes`
  100% {
    opacity: 0;
    transform: scale(1.2);
  }
`

export default Ripple;
