import React, {Component} from 'react';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.session = 'Work';
    this.state = {'time': this.setClock(props), };
  }

  componentDidMount() {
    this.updateCanvas();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({'time': this.setClock(nextProps)});

    //trigger the timer if the button is pressed
    console.log('before if');
    if(nextProps.info.locked) {
      console.log('interval set');
      this.timerID = setInterval( () => this.tick(), 1000);
    } else {
      console.log('else');
      clearInterval(this.timerID);
    }
  }

  setClock(time) {
    time = Number.parseInt(this.props.info[this.session]);
    let timeInSeconds = time * 60;
    let hours = time > 60 ? Math.floor(time / 60) : 0;
    let minutes = time <= 60 ? time : time % 60;
    let seconds = 0;
    return [hours, minutes, seconds, timeInSeconds];
  }

  updateCanvas() {
    console.log(this);
    const ctx = this.refs.canvas.getContext('2d');
    try {
      ctx.clearRect(0, 0, 800, 800);
    } catch(e) {}
    let denominator = this.props.info[this.session] * 60;
    console.log('numerator', this.state.time[3], 'denominator', denominator);
    ctx.strokeStyle = 'cornflowerblue';
    ctx.lineWidth = 20;
    ctx.beginPath();
    ctx.arc(250,250,225, 0, (this.state.time[3] / denominator) * 0.999 * (2 * Math.PI));
    ctx.stroke();
  }

  tick() {
    let time = this.state.time;

    //time's up! switch to break time! woohoo! party!
    if(time[0] + time[1] + time[2] === 0) {
      clearInterval(this.timerID);
      this.session = 'Break';
      this.componentWillReceiveProps(this.props);
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

    this.state.time[3]--;
    this.updateCanvas();
    this.setState({'time': time});
  }

  render() {
    let timer_hours = this.state.time[0];
    let timer_minutes =  this.state.time[1];
    let timer_seconds = this.state.time[2];
    let inline = {display: 'inline-block'};

    return (
      <div className="col-sm-12 col-md-12 text-center">
        <h3>Work</h3>
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
          <canvas ref="canvas" style={{transform: 'rotate(-90deg)'}} width={500} height={500} ></canvas>
      </div>
    )
  }
}

export default Clock;
