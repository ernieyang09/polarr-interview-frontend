import React, { useCallback } from 'react';
import { useDispatch, useMappedState } from "redux-react-hook";
import styled from 'styled-components';

import {
  changeColor
} from '../../modules/ui';



const ColorButton = () => {
  const dispatch = useDispatch();
  const matState = useCallback(state => state.ui.button, []);
  const { color } = useMappedState(matState);

  return (
    <StyledButton
      color={color}
      onClick={()=> {
        const next = {
          'red': 'blue',
          'blue': 'yellow',
          'yellow': 'red',
        }[color];
        dispatch(changeColor(next));

      }}
    >
      click
    </StyledButton>
  )
}

const StyledButton = styled.div.attrs(({ color })=> {
  const backgroundColor = {
    'red': '#ffbaba',
    'blue': '#99e7ff',
    'yellow': '#ffff9f',
  }[color]
  return {
    style: {
      'backgroundColor': backgroundColor,
    }
  }
})`
  border: 1px solid #888888;
  border-radius: 3px;
  display: inline-block;
  padding: 2px 8px;
  cursor: pointer;

`

export default ColorButton;