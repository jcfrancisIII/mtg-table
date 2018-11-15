import React, { Component } from 'react';
import Player from './Player';

export default class PlayerList extends Component {
  
  renderPlayers() {
    return this.props.players.map((player,i) => {
      return (
        <Player 
          key={player.number} 
          player={player} 
          controlLife={this.props.controlLife} 
          setName={this.props.setName}
          setLife={this.props.setLife}
          setColor={this.props.setColor}
          setActive={this.props.setActive}
          />
      )
    });
  }
  
  render() {
    return (
      <ul className="flex-container">
        {this.renderPlayers()}
      </ul>
    );
  }

}
