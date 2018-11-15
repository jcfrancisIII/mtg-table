import React, { Component } from 'react';
import Controls from './components/Controls';
import PlayerList from './components/PlayersList';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      players: [],
      currentPlayer: {
        name: '',
        number: 1,
        life: 20,
        color: '#ff5722',
        active: false,
        damage: {
          // playerNumber: {
          //   name: '',
          //   dealt: 0
          // }
        }
      }
    };
    
  }
  
  removePlayer() {
    this.state.players.pop();
    this.setState({
      players: this.state.players,
      currentPlayer: {
        ...this.state.currentPlayer,
        number: this.state.currentPlayer.number >= 1 ? this.state.currentPlayer.number-1 : 0
      }
    });
  }
  
  addPlayer() {
    const players = [...this.state.players, this.state.currentPlayer];
    this.setState({
      players: players,
      currentPlayer: {
        ...this.state.currentPlayer,
        number: this.state.currentPlayer.number+1
      }
    });
  }
  
  controlPlayers(action, playerIndex) {
    switch (action) {
      case 'minus':
        this.removePlayer(playerIndex);
        break;
      case 'plus':
        this.addPlayer(playerIndex);
        break;
      default:
        console.log('Error in' + this.name);
    }
  }
  
  minusLife(i) {
    const newLife = parseInt(this.state.players[i].life) - 1;
    const newPlayer = {
      ...this.state.players[i],
      life: newLife
    }
    const newPlayers = this.state.players;
    newPlayers[i] = newPlayer;
    this.setState({
      players: newPlayers
    });
  }
  
  plusLife(i) {
    const newLife = parseInt(this.state.players[i].life) + 1;
    const newPlayer = {
      ...this.state.players[i],
      life: newLife
    }
    const newPlayers = this.state.players;
    newPlayers[i] = newPlayer;
    this.setState({
      players: newPlayers
    });
  }
  
  controlLife(action, i) {
    switch(action) {
      case 'minus':
        this.minusLife(i);
        break;
      case 'plus':
        this.plusLife(i);
        break;
      default:
        console.log('Error in' + this.name);
    }
  }
  
  setName(newName, i) {
    const newPlayer = {
      ...this.state.players[i],
      name: newName
    }
    const newPlayers = this.state.players;
    newPlayers[i] = newPlayer;
    this.setState({
      players: newPlayers
    });
  }

  setLife(newLife, i) {
    const newPlayer = {
      ...this.state.players[i],
      life: newLife
    }
    const newPlayers = this.state.players;
    newPlayers[i] = newPlayer;
    this.setState({
      players: newPlayers
    });
  }

  setColor(setColor, i) {
    const newPlayer = {
      ...this.state.players[i],
      color: setColor
    }
    const newPlayers = this.state.players;
    newPlayers[i] = newPlayer;
    this.setState({
      players: newPlayers
    });
  }

  setActive(i) {
    const newPlayer = {
      ...this.state.players[i],
      active: this.state.players[i].active ? false : true
    }
    const newPlayers = this.state.players.map(x => {
      return {...x, active: false}
    });
    newPlayers[i] = newPlayer;
    this.setState({
      players: newPlayers
    });
  }
  
  render() {
    return (
      <main className="main-container">
        <Controls 
          controlPlayers={this.controlPlayers.bind(this)} 
        />
        <PlayerList 
          players={this.state.players} 
          controlLife={this.controlLife.bind(this)} 
          setName={this.setName.bind(this)}
          setLife={this.setLife.bind(this)}
          setColor={this.setColor.bind(this)}
          setActive={this.setActive.bind(this)}
        />
      </main>
    );
  }
}
