import React, { Component } from 'react';
import Slider from './Body-dependencies/Slider';
import Clock from './Body-dependencies/Clock';



export default class Body extends Component {

  //state should be here since both the Slider and Clock need to share the value of the imputs
  constructor() {
    super();
    this.rangeChangeHandler = this.rangeChangeHandler.bind(this);
    this.reset = this.reset.bind(this);
    this.textInputHandler = this.textInputHandler.bind(this);
    this.toggleStart = this.toggleStart.bind(this);
    this.rangesMax = {'Work': 120, 'Break': 30};
    this.state = {'started': false,  'isBreak': false, 'isWork': true, 'workVal': this.rangesMax.Work / 2, 'breakVal': this.rangesMax.Break / 2, 'time': this.setTime(this.rangesMax.Work * 60 / 2)};
  }

  //when I click on a slider number, i want it to change to an input
  //when I click off that input it will 'save' the number i put in and set it

// !!!!!!!!EVENT HANDLERS!!!!!!!!

  rangeChangeHandler(event) {
    if(event.target.id === 'Work' && this.state.started === false) {
      this.setState({'workVal': event.target.value, 'time': this.setTime(event.target.value * 60)});
    } else if(event.target.id === 'Break' && this.state.started === false) {
      this.setState({'breakVal': event.target.value});
    }
  }


  setTime(timeInSeconds) {
    let minutes = Math.floor(timeInSeconds / 60);

    let hours = minutes > 60 ? Math.floor(minutes / 60) : 0;
    minutes = minutes <= 60 ? minutes : minutes % 60;
    let seconds = timeInSeconds - (minutes * 60) - (hours * 60 * 60);
    timeInSeconds--;
    return [hours, minutes, seconds, timeInSeconds];
  }


//make a reset button

  toggleStart(e) {
      if(this.state.started === false) {
        this.timerID = setInterval(() => {this.tick()}, 1000);
      } else {
        clearInterval(this.timerID);
      }
    this.setState({'started': !this.state.started})
  }

  textInputHandler(e) {
    //test to see if 3 or less digits
    let re = /\d\d?\d?/g;
    let pass = re.test(e.target.value);

    if(e.target.className === 'Work' && pass) {
      console.log('state set for work timer: ', e.target.value);
      this.setState({'time': this.setTime(e.target.value * 60), 'workVal': e.target.value});
    }
    else if (pass) {
      this.setState({'breakVal': e.target.value});
    }
  }


  tick() {
    if(this.state.isBreak) {
      if(this.state.time[3] === 0) {
        //switch from break to work
        this.setState({'isWork': !this.state.isWork, 'isBreak': !this.state.isBreak, 'time': this.setTime(this.state.workVal * 60) });
      } else {
      this.setState({'time': this.setTime(this.state.time[3]--)});
      }
    } else {
      if(this.state.time[3] === 0) {
        //switch from work to break
        this.setState({'isWork': !this.state.isWork, 'isBreak': !this.state.isBreak, 'time': this.setTime(this.state.breakVal * 60)});
      }
       else {
          this.setState({'time': this.setTime(this.state.time[3]--)});
        }
    }
  }

  reset(e) {
    if(this.state.started === true) {
      this.toggleStart();
    }
    if(this.state.isBreak) {
      this.setState({'isBreak': false});
    }
    this.setState({'time': this.setTime(this.state.workVal * 60)});
  }


  render() {

    return (
      <div className="row sliders">
        <div className='col-md-8 col-md-offset-2'>
          <Slider  title="Work" passedState={this.state}  value={this.state.workVal} rangeChangeHandler={this.rangeChangeHandler} textInputHandler={this.textInputHandler}/>
          <Slider  title="Break" passedState={this.state} value={this.state.breakVal}  textInputHandler={this.textInputHandler} rangeChangeHandler={this.rangeChangeHandler} />
        </div>
        <button className='btn' onClick={this.reset}>Reset</button>
        <Clock  passedState={this.state} toggleStart={this.toggleStart}/>
      </div>
    );
  }

}
