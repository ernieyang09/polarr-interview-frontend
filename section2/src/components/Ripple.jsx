import React, { Component } from 'react';
import './style.scss'

class Ripple extends Component {
  state = {
    leave: false,
    show: false,
    offsetX: 0,
    offsetY: 0,
  }
  drag = false


  componentDidMount() {
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

  rippleStart = (evt) => {
    let pageX, pageY;
    const bounds = this.container.getBoundingClientRect();
    if (evt.type.includes('touch')) {
      pageX = evt.targetTouches[0].pageX;
      pageY = evt.targetTouches[0].pageY;
    } else {
      pageX = evt.pageX;
      pageY = evt.pageY;
    }

    // console.log(clientY, bounds.top)
    // const offsetX = pageX - bounds.left;
    // const offsetY = pageY - bounds.top;

    // console.log(offsetY)

    this.setState({ show: true, leave: false, offsetX: pageX - 20, offsetY: pageY - 20});

  }

  rippleEnd = (a) => {
    this.setState({
      leave: true
    })
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
