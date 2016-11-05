import React, { Component } from 'react';
import Slider from './Body-dependencies/Slider';

class Body extends Component {
  render() {
    return (
      <div className="row sliders">
        <div className='col-md-8 col-md-offset-2'>
          <Slider  min='0' max='120' title="Work"/>
          <Slider  min='0' max='30' title="Break"/>
        </div>
      </div>
    );
  }
}

export default Body;
