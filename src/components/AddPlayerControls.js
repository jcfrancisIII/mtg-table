import React, { Component } from 'react';

export default class AddPlayerControls extends Component { 
  start() {
    this.props.start();
  }

  minus() {
    this.props.controlPlayers('minus');
  }
  
  plus() {
    this.props.controlPlayers('plus');
  }
  
  render() {
    return (
      <div className="player-controls" style={this.props.style}>
        <div className="player-controls-container">
          <h4>Set the # of Players</h4>
          <button onClick={this.minus.bind(this)}>
            -
          </button>
          <button onClick={this.plus.bind(this)}>
            +
          </button>
          <button style={{float: 'right'}} onClick={this.start.bind(this)}>
            Start
          </button>
        </div>
      </div>
    );
  }
}
