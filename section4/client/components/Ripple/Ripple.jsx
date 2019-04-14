import React, { useCallback, Component, useEffect } from 'react';
import { useDispatch, useMappedState } from "redux-react-hook";
import styled from 'styled-components';

import './style.scss'




const Ripple = (props) => {
  const mapState = useCallback(state => ({
    offsetX: state.ui.cursor.offsetX,
    offsetY: state.ui.cursor.offsetY,
  }), [])
  const { offsetX, offsetY } = useMappedState(mapState);
  console.log(offsetX, offsetY)
  return (
    <>
      <StyledRipple x={offsetX} y={offsetY} />
      {props.children}
    </>
  )
}

const StyledRipple = styled.div`
  width: 40px;
  height: 40px;
  position: absolute;
  top: ${({y}) => y ? `${y-20}px`: '0px'};
  left: ${({x}) => x ? `${x-20}px`: '0px'};
  border-radius: 50%;
  background-color: rgba(1,1,1,0.3);
  border: 2px solid rgba(1,1,1,0.4);
  pointer-events: none;
  box-sizing: border-box;

  &.is-leaving {
    animation: ripple 0.2s linear forwards;
  }

`;

// @keyframes ripple {
//   100% {
//     opacity: 0;
//     transform: scale(1.2);
//   }
// }

class Ripple2 extends Component {
  state = {
    leave: false,
    show: false,
    offsetX: 0,
    offsetY: 0,
  }
  drag = false


  componentDidMount() {
      
      // const test = this.props.test.map((k, i) => {
      //   // console.log(k)
      //   return [k[0], k[1], k[2]- (this.props.test[i-1] ? this.props.test[i-1][2] : 0)]
      // });
      // console.log(test);
      // this.props.test.forEach((v) => {
      //   setTimeout(()=> {
      //     this.setState({
      //       show: true,
      //       offsetX: v[0],
      //       offsetY: v[1],
      //       leave: v[3],
      //     })
      //   }, v[2]);
      // })
      // console.log(test);
      // (async()=>{
      //   for (let v of test) {
      //     console.log(1)
      //     await new Promise((resolve, reject) => {
      //       this.setState({
      //         show: true,
      //         offsetX: v[0],
      //         offsetY: v[1],
      //       },() => {
      //         setTimeout(()=> {
      //           resolve()
      //         },v[2])
      //       })
      //     })
      //       // await new Promise((resolve, reject) => {
      //       //   setTimeout(() => {
      //       //     console.log(123)
      //       //     resolve()
      //       //   },5)
      //       // })
      //   }
      // })()



    this.container = this.props.container.current;
    this.container.addEventListener('mousedown', (evt) => {
      this.drag = true;
      this.rippleStart(evt);
    })
    this.container.addEventListener('mousemove', (evt)=> {
      if (this.drag) {
        this.rippleStart(evt);
      } 
    })
    this.container.addEventListener('mouseup', (evt) => {
      this.drag = false;
      this.rippleEnd(evt);
    })
    this.container.addEventListener('touchstart', (evt) => {
      this.drag = true;
      this.rippleStart(evt);
    });
    this.container.addEventListener('touchmove', (evt)=> {
      if (this.drag) {
        this.rippleStart(evt);
      } 
    });
    this.container.addEventListener('touchend', (evt) => {
      this.drag = false;
      this.rippleEnd(evt);
    });
  }

  timeout;

  rippleStart = (evt) => {
    console.log(evt)
    window.d = this.container
    let pageX, pageY;
    const bounds = this.container.getBoundingClientRect();
    if (evt.type.includes('touch')) {
      pageX = evt.targetTouches[0].pageX;
      pageY = evt.targetTouches[0].pageY;
    } else {
      pageX = evt.pageX;
      pageY = evt.pageY;
    }

    if (this.props.record) {
      if (this.timeout) {
        window.cancelAnimationFrame(this.timeout);
      }
      this.timeout = window.requestAnimationFrame(() => {

            // Run our scroll functions
        console.log( 'debounced' );
        this.records.push([pageX, pageY, evt.timeStamp, false])

      });
    
      
    }
    

    this.setState({ show: true, leave: false, offsetX: pageX - 20, offsetY: pageY - 20});

  }

  rippleEnd = ({pageX, pageY, timeStamp}) => {
    if (this.props.record) {
      if (this.timeout) {
        window.cancelAnimationFrame(this.timeout);
      }
      this.timeout = window.requestAnimationFrame(() => {

            // Run our scroll functions
        console.log( 'debounced' );
        this.records.push([pageX, pageY, timeStamp, true])

      });
    }
    this.setState({
      leave: true
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.record !== prevProps.record) {
      if (this.props.record) {
        this.records = []
      } else {
        console.log(this.records)
        localStorage.setItem("records", JSON.stringify(this.records));
      }
    }
  }

  componentWillUnmount() {
    this.container.removeListener('mousedown');
    this.container.removeListener('mousemove');
    this.container.removeListener('mouseup');
    this.container.removeListener('touchstart');
    this.container.removeListener('touchmove');
    this.container.removeListener('touchend');
  }


  render() {
    const { offsetX, offsetY } = this.state;
    // console.log(this.props)
    return (
      <>
        { this.state.show && 
          <div
            className={`ripple ${this.state.leave?'is-leaving': ''}`}
            onAnimationEnd={()=> {
              this.setState({
                show: false,
              })
            }}
            style={{
              top: offsetY,
              left: offsetX,
            }}
          />
        }
        
        {this.props.children}
      </>
      
    )
  }
}

export default Ripple;
