import React, { Component } from 'react';

class Slider extends Component {

  render() {
    return (
      <div className="col-md-6">
        <label htmlFor={this.props.title}> {this.props.title} </label>
        <input type='range' min={this.props.min} id={this.props.title} max={this.props.max} onInput={this.props.inputHandler} disabled={this.props.disabled}/>
        <span>{this.props.value}</span>
      </div>
    )
  }
}

export default Slider;
