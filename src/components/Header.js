import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <header className="text-center">
        <h1>A pomodoro clock</h1>
        <sub>Built by Corey Burkhart using React and Bootstrap-3</sub>
      </header>
    )
  }
}

export default Header;
