import React, { Component } from 'react';

export default class Controls extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      show: true
    }
  }

  toggle() {
    this.setState({
      show: this.state.show ? false : true
    })
  }

  minus() {
    this.props.controlPlayers('minus');
  }
  
  plus() {
    this.props.controlPlayers('plus');
  }
  
  render() {
    const controlsStyle = {
      display: this.state.show ? 'block': 'none'
    };

    return (
      <div className="controls" style={controlsStyle}>
        <div className="controls-container">
          <h4>Number of Players</h4>
          <button onClick={this.minus.bind(this)}>
            -
          </button>
          <button onClick={this.plus.bind(this)}>
            +
          </button>
          <button style={{float: 'right'}} onClick={this.toggle.bind(this)}>
            &times;
          </button>
        </div>
      </div>
    );
  }
}
