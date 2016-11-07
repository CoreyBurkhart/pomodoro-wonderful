import React, {Component} from 'react';
import '../../styles/app.css';

class Clock extends Component {
  constructor(props) {
    super(props);
    //set the initial state with the work time
    this.state = {'time': this.setClock(props, false), 'isBreak': false, 'isStarted': false};
  }

//   Mounting
// These methods are called when an instance of a component is being created and inserted into the DOM:
  // componentWillMount() //invoked immediately before mounting occurs. It is called before render()
    componentWillMount() {
      console.log('componentWillMount');
    }
  // // componentDidMount() // invoked immediately after a component is mounted. Setting state in this method will trigger a re-rendering.
    componentDidMount() {
      console.log('componentDidMount');
      //update the canvas after initial load
      this.updateCanvas(true);
    }

// Updating
  // An update can be caused by changes to props or state. These methods are called when a component is being re-rendered:
  // componentWillReceiveProps() //If you need to update state in response to a prop change.
    componentWillReceiveProps(nextProps) {
      console.log('componentWillReceiveProps');
      //set the state of this Clock component to the state passed by the props from the body comp.
      this.setState({'time': this.setClock(nextProps || this.state)}, function() {
        //create  the timer here
        clearInterval(this.timerID);
        if(this.state.isStarted === false) {
          this.timerID = setInterval( () => this.tick(), 1000);
        }
      });
      console.log('this.state.time: ', this.state.time);
    }
  // shouldComponentUpdate() //is invoked before rendering when new props or state are being received
  shouldComponentUpdate() {
    console.log("shouldComponentUpdate");
    //any situation where I DON'T want the component to update should go here!
    return true;
  }
  // componentWillUpdate() //before rendering when new props or state are being received. opportunity to perform preparation before an update occurs
  componentWillUpdate() {
    console.log('componentWillUpdate');

  }

  // componentDidUpdate() //is invoked immediately after updating occurs (not on initial render)
    componentDidUpdate() {
      console.log('componentDidUpdate');
      return true;
    }
// Unmounting
// This method is called when a component is being removed from the DOM:
  // componentWillUnmount() //is invoked immediately before a component is unmounted
    componentWillUnmount() {
      console.log('componentWillUnmount');
      //doesn't get called in this situation?
    }

  setClock(time, isBreak) {
    try{
      isBreak = this.state['isBreak'];
    } catch(e) {}
  if(isBreak) {
    time = Number.parseInt(this.props.info['Break']);
  } else {
    time = Number.parseInt(this.props.info['Work']);
  }

    let timeInSeconds = time * 60;
    let hours = time > 60 ? Math.floor(time / 60) : 0;
    let minutes = time <= 60 ? time : time % 60;
    let seconds = 0;
    console.log('time set to: ', [hours, minutes, seconds, timeInSeconds]);
    return [hours, minutes, seconds, timeInSeconds];
  }


  updateCanvas(firstRun) {
    const workCTX = this.refs.workCanvas.getContext('2d');
    const breakCTX = this.refs.breakCanvas.getContext('2d');
    try {
      workCTX.clearRect(0, 0, 800, 800);
      breakCTX.clearRect(0, 0, 800, 800);
    } catch(e) {}

    let denominatorBreak = this.props.info['Break'] * 60;
    let denominatorWork = this.props.info['Work'] * 60;

      breakCTX.strokeStyle = 'green';
      breakCTX.lineWidth = 30;
      breakCTX.beginPath();
      let timeBreak = this.state.isBreak ? this.state.time[3] : denominatorBreak;
      let timeWork = this.state.isBreak ? denominatorWork : this.state.time[3];
      breakCTX.arc(250,250,205, 0, (timeBreak / denominatorBreak) * 0.999 * (2 * Math.PI));
      breakCTX.stroke();
      workCTX.strokeStyle = 'cornflowerblue';
      workCTX.lineWidth = 20;
      workCTX.beginPath();
      workCTX.arc(250,250,225, 0, (timeWork / denominatorWork) * 0.999 * (2 * Math.PI));
      workCTX.stroke();
    // console.log('numerator', this.state.time[3], 'denominator', denominator);
  }

  tick() {
    let time = this.state.time;
    console.log('this.state', this.state, 'time var: ', time);
    //time's up! switch to break time! woohoo! party!
    if(time[0] + time[1] + time[2] === 0) {
      clearInterval(this.timerID);
      this.setState({'isBreak': !this.state.isBreak});
      this.componentWillReceiveProps();
      return;
    } else {
      //if out of seconds get more from minutes.
      if (time[2] === 0 && time[1] !== 0) {
        time[2] = 59;
        time[1]--;
      } else {
        time[2]--;
      }

      //if out of minutes get more from hours.
      if(time[1] === 0 && time[0] !== 0 && time[2] === 0){
        time[0]--;
        time[1] = 59;
      }
    }

    time[3]--;
    this.setState({'time': time});
    this.updateCanvas();
  }

  render() {
    let timer_hours = this.state.time[0];
    let timer_minutes =  this.state.time[1];
    let timer_seconds = this.state.time[2];
    let inline = {display: 'inline-block'};

    return (
      <div className="col-sm-12 col-md-12 text-center">
        <h3>{this.state.isBreak ? 'Break' : 'Work'}</h3>
          <span style={{display: 'inline-block', padding: '0 1.5rem 0 3rem'}}>
            {timer_hours}
            <p>Hours</p>
          </span>
          <span style={inline}>:</span>
          <span style={{display: 'inline-block', padding: '0 1.5rem'}}>
            {timer_minutes}
            <p>Minutes</p>
          </span>
          <span style={inline}>:</span>
          <span style={{display: 'inline-block', padding: '0 1.5rem'}}>
            {timer_seconds}
            <p>Seconds</p>
          </span>
            <canvas ref="workCanvas" className='absolute' width={500} height={500} ></canvas>
          <canvas ref="breakCanvas" className='absolute' width={500} height={500} ></canvas>
      </div>
    )
  }
}

export default Clock;
