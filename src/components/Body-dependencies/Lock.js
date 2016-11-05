import React, {Component} from 'react';

class Lock extends Component {


  render() {
    return (
      <div className="col-md-12">
        <button onClick={this.props.click}>Lock</button>
      </div>
    )
  }
}

export default Lock;
