import React, { Component } from 'react';
import Slider from './Body-dependencies/Slider';
// import Clock from './Body-dependencies/Clock';
import Lock from './Body-dependencies/Lock'

class Body extends Component {

  //state should be here since both the Slider and Clock need to share the value of the imputs
  constructor() {
    super();
    this.lockHandler = this.lockHandler.bind(this);
    this.inputHandler = this.inputHandler.bind(this);
    this.state = {'locked': false, 'Work': '', 'Break': ''};
  }

  lockHandler(e) {
    this.setState({'locked': !this.state.locked});
    console.log(this.state.locked);
    if (this.state.locked === true) {
      //send the times to the Clock component
    }
  }

  inputHandler(event) {
    if (event.target.id === 'Work') {
      this.setState({'locked': this.state.locked, 'Work': event.target.value, 'Break': this.state.Break});
    }
    else{
      this.setState({'locked': this.state.locked, 'Work': this.state.Work, 'Break':  event.target.value})

    }
    console.log(this.state);
  }

  render() {
    return (
      <div className="row sliders">
        <div className='col-md-8 col-md-offset-2'>
          <Slider  value={this.state.Work} min='0' max='120' title="Work" disabled={this.state.locked} inputHandler={this.inputHandler}/>
          <Slider  value={this.state.Break} min='0' max='30' title="Break" disabled={this.state.locked} inputHandler={this.inputHandler} />
        </div>
        <Lock click={this.lockHandler}/>
        {/* <Clock /> */}
      </div>
    );
  }
}

export default Body;