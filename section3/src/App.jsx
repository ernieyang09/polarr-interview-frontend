import React , { Component } from 'react';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import styled from 'styled-components';

const SliderWrap = styled.div`
  padding: 12px;
`;

const StyledOl = styled.ol`
  list-style: none;
  padding-left: ${props => `${props.num}px`};

`;


class App extends Component {

  state = {
    num: 12,
  }

  render() {
    return (
      <div>
        <SliderWrap>
          <Slider
            min={0}
            max={100}
            value={this.state.num}
            onChange={(num)=> {
              this.setState({ num })
            }}
          />
        </SliderWrap>
        <StyledOl num={this.state.num}>
          <li>
            1
            <StyledOl num={this.state.num}>
              <li>
                1.1
                <StyledOl num={this.state.num}>
                  <li>1.1.1</li>
                  <li>1.1.2</li>
                  <li>1.1.3</li>
                  <li>1.1.4</li>
                </StyledOl>
              </li>
              <li>
                1.2
              </li>
            </StyledOl>
          </li>
          <li>
            2
          </li>
        </StyledOl>
      </div>
    )
  }
}

export default App;
