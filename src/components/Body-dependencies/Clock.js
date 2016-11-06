import React, {Component} from 'react';

class Clock extends Component {
  constructor(props) {
    super(props);
    //hours minutes seconds will be in state
    //set the initial state to times locked in
    this.state = {'time': this.setClock(props)};
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillRecieveProps fired')
    this.setState({'time': this.setClock(nextProps)});
    
    //trigger the timer if the button is pressed
    if(nextProps.info.locked) {
      this.timerID = setInterval( () => this.tick(), 1000);
    } else {
      clearInterval(this.timerID);
    }
  }

  setClock(time) {
    time = Number.parseInt(time.info.Work);
    let work_hours = time > 60 ? Math.floor(time / 60) : 0;
    let work_minutes = time <= 60 ? time : time % 60;
    let work_seconds = 0;
    return [work_hours, work_minutes, work_seconds];
  }

  tick() {
    let time = this.state.time;

    if (time[2] === 0 && time[1] !== 0) {
      time[2] = 59;
      time[1]--;
    } else {
      time[2]--;
    }

    if(time[1] === 0 && time[0] !== 0 && time[2] === 0){
      time[0]--;
      time[1] = 59;
    }

    if(time[0] + time[1] + time[2] === 0) {
      //time is up
    }

    this.setState({'time': time});
  }

  render() {
    let timer_hours = this.state.time[0];
    let timer_minutes =  this.state.time[1];
    let timer_seconds = this.state.time[2];

    return (
      <div className="col-sm-12 col-md-12 text-center">
        <h3>Work</h3>
            <span style={{display: 'inline-block', padding: '0 1.5rem 0 3rem'}}>
              {timer_hours}
              <p>Hours</p>
            </span>
            <span style={{display: 'inline-block'}}>:</span>
            <span style={{display: 'inline-block', padding: '0 1.5rem'}}>
              {timer_minutes}
              <p>Minutes</p>
            </span>
            <span style={{display: 'inline-block'}}>:</span>
            <span style={{display: 'inline-block', padding: '0 1.5rem'}}>
              {timer_seconds}
              <p>Seconds</p>
            </span>
      </div>
    )
  }
}

export default Clock;
