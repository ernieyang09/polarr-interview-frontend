import React from 'react';
import styled from 'styled-components';



const NullCanvas = React.forwardRef((props, ref) => (
  <StyledNullCanvas ref={ref}>
    {
      [...Array(15)].map((v, i)=> [<div key="i">test content</div>])
    }
  </StyledNullCanvas>
))

const StyledNullCanvas = styled.div`
  background: #e8f1e2;

  div {
    margin: 5px 0;
  }
`;

export default NullCanvas;