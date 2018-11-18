import React, { Component } from 'react';

export default class TurnControls extends Component {
  
  nextTurn() {
    this.props.nextTurn();
  }
  
  render() {
    return (
      <div className="turn-controls" style={this.props.style}>
        <button onClick={this.nextTurn.bind(this)}>
          End Turn
        </button>
      </div>
    );
  }
}
