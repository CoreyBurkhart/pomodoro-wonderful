import React, {Component} from 'react';
import '../../css/clock.css';

class Clock extends Component {

  constructor() {
    super();
    this.canvasSize = 400;
  }

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

    let offset = this.canvasSize / 2;
    let radiusW = Math.round(this.canvasSize / 2) - 10;

    ctx.strokeStyle = '#3498db';
    ctx.lineWidth = '15';
    ctx.beginPath();
    ctx.arc(offset , offset, radiusW, 0, (numeratorWork / denominator) * 2*Math.PI);
    ctx.stroke();
    ctx.strokeStyle = '#9b59b6';
    ctx.lineWidth = '25';
    ctx.beginPath();
    ctx.arc(offset,offset, radiusW - 15 ,0, (numeratorBreak / denominator) * 2*Math.PI);
    ctx.stroke();
  }


  render() {
    let timer_hours = this.props.passedState.time[0];
    let timer_minutes =  this.props.passedState.time[1];
    let timer_seconds = this.props.passedState.time[2];
    let inline = {display: 'inline-block'};
    let hover = {};
    if(this.props.passedState.started) {
      hover.class = 'pause';
      hover.icon = 'glyphicon glyphicon-pause';
    } else {
      hover.class = 'start';
      hover.icon = 'glyphicon glyphicon-play';
    }

    return (
      <div className="clock-container col-sm-12 col-md-12 text-center">
        <div className="display">
          <h3>{this.props.passedState.isBreak ? 'Break' : 'Work'}</h3>
            <span className="numbers" style={{display: 'inline-block', padding: '0 1.5rem 0 3rem'}}>
              {timer_hours}
              <small>Hours</small>
            </span>
            <span style={inline}>:</span>
            <span className="numbers" style={{display: 'inline-block', padding: '0 1.5rem'}}>
              {timer_minutes}
              <small>Minutes</small>
            </span>
            <span style={inline}>:</span>
            <span className="numbers" style={{display: 'inline-block', padding: '0 1.5rem'}}>
              {timer_seconds}
              <small>Seconds</small>
            </span>
          </div>
        <div onClick={this.props.toggleStart} className={"hover " + hover.class}>
          <span className={hover.icon}></span>
        </div>
        <canvas ref="canvas" width={this.canvasSize} height={this.canvasSize} ></canvas>
      </div>
    )
  }
}

export default Clock;
