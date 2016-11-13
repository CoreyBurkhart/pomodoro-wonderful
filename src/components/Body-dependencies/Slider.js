import React, { Component } from 'react';
import '../../css/slider.css';

class Slider extends Component {
  constructor() {
    super();
    this.toggleTextInput = this.toggleTextInput.bind(this);
    this.keypressHandler = this.keypressHandler.bind(this);
    this.inputDisplayed = false;
  }

  toggleTextInput(e) {
    if(this.props.passedState.started !== true) {
      if(this.inputDisplayed) {
        console.log('hid input');
        this.refs.text.style.display = 'none';
        this.refs.span.style.display = 'inline';
      }
      else {
        console.log('hid span');
        this.refs.text.style.display = 'inline';
        this.refs.span.style.display = 'none';
        this.refs.text.select();
      }

      try {
        if(e.target.tagName === 'INPUT') {
          console.log('ran textInputHandler');
          this.props.textInputHandler(e);
        }
      } catch(e) {}

      this.inputDisplayed = !this.inputDisplayed;
      console.log(this.inputDisplayed);
    }
  }

  keypressHandler(e) {
    if(e.which === 13) {
      console.log('enter');
      // this.inputDisplayed = !this.inputDisplayed;
      e.target.blur();
      this.props.textInputHandler(e);
    }
  }


  render() {
    return (
      <div className="slider col-xs-12 ">
      <div className={'row ' + this.props.title}>
        <label className='col-xs-2' htmlFor={this.props.title}> {this.props.title} </label>
        <div className="col-xs-2 col-xs-offset-8 range-number">
          <span ref='span' onClick={this.toggleTextInput}>{this.props.value}</span>
          <input type='text' ref='text' className={this.props.title} style={{display: 'none'}} onBlur={this.toggleTextInput} maxLength="3" onKeyPress={this.keypressHandler} disabled={this.props.passedState.started}></input>
        </div>
        </div>
        <input type='range' min={this.props.min} id={this.props.title} max={this.props.max} onInput={this.props.rangeChangeHandler} disabled={this.props.passedState.started} />
      </div>
    )
  }
}

export default Slider;
