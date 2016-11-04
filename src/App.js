import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Slider />
        <Slider />
      </div>
    );
  }
}

class Slider extends Component {
  constructor(prop) {
    super(prop);
    this.state = {value: '50'};
    this.update = this.update.bind(this);
  }

  update(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div>
        <input type='range'  onInput={this.update} />
        <span>{this.state.value}</span>
      </div>
    )
  }
}

// ReactDOM.render(<div><Slider /> <Slider /></div>, document.getElementById('root'));


export default App;
