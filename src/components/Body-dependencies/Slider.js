import React, { Component } from 'react';

class Slider extends Component {
  constructor(props) {
    super(props);
    // this.props = props;
    this.state = {value: this.props.max / 2};
    this.update = this.update.bind(this);
  }

  update(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div className="col-md-6">
        <label htmlFor={this.props.title}>{this.props.title}</label>
        <input type='range' min={this.props.min} max={this.props.max} onInput={this.update} />
        <span>{this.state.value}</span>
      </div>
    )
  }
}

export default Slider;
