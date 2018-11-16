import React, { Component } from 'react';

export default class Controls extends Component { 
  toggle() {
    this.props.toggleControls();
  }

  minus() {
    this.props.controlPlayers('minus');
  }
  
  plus() {
    this.props.controlPlayers('plus');
  }
  
  render() {
    return (
      <div className="controls" style={this.props.style}>
        <div className="controls-container">
          <h4>Set the # of Players</h4>
          <button onClick={this.minus.bind(this)}>
            -
          </button>
          <button onClick={this.plus.bind(this)}>
            +
          </button>
          <button style={{float: 'right'}} onClick={this.toggle.bind(this)}>
            Start
          </button>
        </div>
      </div>
    );
  }
}
