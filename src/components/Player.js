import React, { Component } from 'react';
import { CirclePicker } from 'react-color';

export default class Player extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isEditingName: false,
      isEditingLife: false,
      isEditingColor: false
    };

    this.playerName = React.createRef();
  }
  
  minus(e) {
    e.stopPropagation();

    const i = this.props.player.number-1;
    this.props.controlLife('minus', i);
  }
  
  plus(e) {
    e.stopPropagation();
    
    const i = this.props.player.number-1;
    this.props.controlLife('plus', i);
  }
  
  setEditName(isEditingName, e)  {
    e.stopPropagation();

    this.setState({
      isEditingName
    });
  }
  
  setName(e) {
    this.props.setName(e.target.value, this.props.player.number-1);
  }
  
  renderName() {
    const name = this.props.player.name ? this.props.player.name : 'Player ' + this.props.player.number;
    
    if (this.state.isEditingName) {
      return (
        <input className="playerName" defaultValue={name} type="text" onChange={this.setName.bind(this)} onBlur={this.setEditName.bind(this, false)} autoFocus />
      )
    }

    return (
      <h4 onClick={this.setEditName.bind(this, true)} className="playerName">{name}</h4>
    )
    
  }

  setEditLife(isEditingLife, e) {
    e.stopPropagation();

    this.setState({
      isEditingLife
    });
  }

  setLife(e) {
    this.props.setLife(e.target.value, this.props.player.number-1);
  }
  
  renderLife() {    
    if (this.state.isEditingLife) {
      return (
        <input 
          className="playerLife" 
          defaultValue={this.props.player.life} 
          type="number" 
          onChange={this.setLife.bind(this)} 
          //onKeyPress={this.enterLife.bind(this)} 
          onBlur={this.setEditLife.bind(this, false)} 
          autoFocus 
        />
      )
    }

    return (
      <h1 onClick={this.setEditLife.bind(this, true)} className="playerLife">{this.props.player.life}</h1>
    )
    
  }

  setEditColor(isEditingColor, e) {
    e.stopPropagation();

    this.setState({
      isEditingColor
    });
  }

  setColor(color, e) {
    e.stopPropagation();

    this.props.setColor(color.hex, this.props.player.number-1);
    this.setEditColor(false, e);
  }

  renderColor() {
    if (this.state.isEditingColor) {
      return (
        <CirclePicker
          className="playerColor"
          width="100%"
          circleSize={18}
          circleSpacing={7}
          colors={["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b"]}
          color={ this.props.color }
          onChangeComplete={ this.setColor.bind(this) }
        />
      )
    }
    
    return (
      <button className="playerColor" onClick={this.setEditColor.bind(this, true)}>&#x22ee;</button>
    )
  }

  setActive() {
    this.props.setActive(this.props.player.number-1);
  }

  render() {
    const playerStyle = {
      background: this.props.player.color,
      border: this.props.player.active ? '2px solid #000': '0px solid #000'
    };

    return (
      <li className="flex-item" style={playerStyle} onClick={this.setActive.bind(this)}>
        {this.renderName()}
        {this.renderLife()}
        {this.renderColor()}
        <button onClick={this.minus.bind(this)}>
          -
        </button>
        <button onClick={this.plus.bind(this)}>
          +
        </button>
      </li>
    );
  }
}
