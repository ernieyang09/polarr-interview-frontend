import React , { Component } from 'react';
import {
  Ripple,
} from './components';


class App extends Component {

  container = React.createRef();

  state = {
    record: false,
  }


  render() {
    return (
      <div>
        <Ripple container={this.container}>
          <div style={{height: '1000px', paddingTop: '30px', marginTop: '40px'}} ref={this.container}>
            {
              (() => {
                
                return [...Array(10)].map(()=>[<div>Hello World!!</div>, <div>Hello World!!</div>])
              })()
            }
            <div>
              <input type="button" value="test" onClick={()=> {
                console.log(1)
              }}></input>
            </div>
          </div>
        </Ripple>
      </div>
    )
  }
}

export default App;
