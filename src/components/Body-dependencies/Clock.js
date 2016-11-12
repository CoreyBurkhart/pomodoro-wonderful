import React, {Component} from 'react';
import '../../css/clock.css';

class Clock extends Component {

  componentDidMount() {
    this.updateCanvas(this.props);
  }

  componentWillReceiveProps(nextprops) {
    this.updateCanvas(nextprops);
  }

  updateCanvas(props) {
    let ctx = this.refs.canvas.getContext('2d');
    let denominator, numeratorWork, numeratorBreak;

    ctx.clearRect(0, 0, 500, 500);
    if (props.passedState.isBreak) {
      denominator = props.passedState.breakVal * 60;
      numeratorWork = 0;
      // +1 because seconds start at 59
      numeratorBreak = props.passedState.time[3] + 1;
    } else {
      denominator = props.passedState.workVal * 60;
      numeratorWork = props.passedState.time[3] + 1;
      numeratorBreak = denominator;
    }

    ctx.strokeStyle = 'orange';
    ctx.lineWidth = '25';
    ctx.beginPath();
    ctx.arc(250,250,225,0, (numeratorWork / denominator) * 2*Math.PI);
    ctx.stroke();
    ctx.strokeStyle = 'green';
    ctx.lineWidth = '35';
    ctx.beginPath();
    ctx.arc(250,250,195,0, (numeratorBreak / denominator) * 2*Math.PI);
    ctx.stroke();
  }


  render() {
    let timer_hours = this.props.passedState.time[0];
    let timer_minutes =  this.props.passedState.time[1];
    let timer_seconds = this.props.passedState.time[2];
    let inline = {display: 'inline-block'};
    let size = 500;

    return (
      <div onClick={this.props.toggleStart} className="col-sm-12 col-md-12 text-center">
        <div className="display">
          <h3>{this.props.passedState.isBreak ? 'Break' : 'Work'}</h3>
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
          </div>
        <canvas ref="canvas" className='absolute' width={size} height={size} ></canvas>
      </div>
    )
  }
}

export default Clock;
