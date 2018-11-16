import React, { Component } from 'react';
import Controls from './components/Controls';
import PlayerList from './components/PlayersList';
import Popup from 'react-popup';
import './App.css';

const initPlayerDmg = { // set to player number in currentTurn.damage
  name: '', 
  lifeEffect: {},
}; // receiving player

const initLifeEffect = { // set to player number in damage[player number].lifeEffect
  plus: 0,
  minus: 0,
  kill: false,
  name: '' 
}; //active player

export default class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      players: [],
      currentPlayer: {
        name: '',
        number: 0,
        life: 20,
        color: '#ff5722',
        active: false
      },
      turns: [],
      currentTurn: {
        damage: {} // damage
      }, // currentTurn
      showControls: true
    };
    
  }

  toggleControls() {
    this.setState((state) => {
      return {
        showControls: state.showControls ? false : true
      }
    });
  }

  removePlayer() {
    // returns a new array
    const newPlayers = this.state.players.slice(0, -1);
    this.setState((state) => {
      return {
        players: newPlayers,
        currentPlayer: {
          ...this.state.currentPlayer,
          number: this.state.currentPlayer.number >= 1 ? this.state.currentPlayer.number-1 : 0
        }
      }
    });
  }
  
  addPlayer() {
    const players = [...this.state.players, this.state.currentPlayer];
    const playersDmg = {};
    const playerDmg = initPlayerDmg;
    // reduce returns result to the next call 
    // {} is initial value
    const playersLA = players.reduce((map, o) => {
      map[o.number] = initLifeEffect;
      return map;
    }, {});

    players.forEach((o) => { 
      playerDmg.name = o.name;
      playerDmg.lifeEffect = playersLA; // players life effect to this player
      // set an object containing the 
      playersDmg[o.number] = playerDmg
    });

    this.setState((state) => {
      return {
        players: players,
        currentPlayer: {
          ...state.currentPlayer,
          number: state.currentPlayer.number+1
        },
        currentTurn: {
          damage: playersDmg 
        }
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
    const newPlayers = {...this.state.players};
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
    const newPlayers = [...this.state.players];
    newPlayers[i] = newPlayer;
    this.setState({
      players: newPlayers
    });
  }
  
  controlLife(action, i) {
    if (this.state.players.every(o => o.active === false)) {
      Popup.alert('You need to choose an active player');
      return;
    }
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
    const newPlayers = [...this.state.players];
    newPlayers[i] = newPlayer;
    this.setState((state) => {
      return {
        players: newPlayers,
        currentTurn: {
          damage: {
            ...state.currentTurn.damage,
            [i]: {
              name: newName,
              lifeEffect: {
                ...state.currentTurn.damage[i].lifeEffect,
                [i]: {
                  ...state.currentTurn.damage[i].lifeEffect[i],
                  name: newName
                }
              }
            }
          }
        }
      }
    });
  }

  setLife(newLife, i) {
    // set player life
    const receivingPlayer = {
      ...this.state.players[i],
      life: parseInt(newLife)
    }
    // wrap to create new obj
    const newPlayers = [...this.state.players];
    // i is receivingPlayer.number
    newPlayers[i] = receivingPlayer;

    // assign lifeEffect to the receiving player and the active player
    const activePlayer = this.findActivePlayer();
    const lifeDiff = this.state.players[i].life - newLife;
    // lifeDiff > 0 they lost life (minus) < 0 they gained life (plus)
    const activeLifeEffect = {...this.state.currentTurn.damage[receivingPlayer.number].lifeEffect[activePlayer.number]};
    lifeDiff > 0 ? activeLifeEffect.minus += Math.abs(lifeDiff) : activeLifeEffect.plus += Math.abs(lifeDiff);
    activeLifeEffect.kill = newLife < 0 ? true : false;
    activeLifeEffect.name = activePlayer.name;

    this.setState((state) => {
      return {
        players: newPlayers,
        currentTurn: {
          damage: {
            ...state.currentTurn.damage,
            [i]: {
              name: receivingPlayer.name,
              lifeEffect: {
                ...state.currentTurn.damage[i].lifeEffect,
                [activePlayer.number]: activeLifeEffect
              }
            }
          }
        }
      }
    });
  }

  setColor(setColor, i) {
    const newPlayer = {
      ...this.state.players[i],
      color: setColor
    }
    const newPlayers = [...this.state.players];
    newPlayers[i] = newPlayer;
    this.setState({
      players: newPlayers
    });
  }

  setActive(i) {
    if (this.state.showControls) {
      Popup.alert('Press start.');
      return;
    }

    const newPlayer = {
      ...this.state.players[i],
      active: this.state.players[i].active ? false : true
    }
    const newPlayers = this.state.players.map(x => {
      return {...x, active: false}
    });
    newPlayers[i] = newPlayer;

    this.setState((state) => {
      return {
        players: newPlayers,
        turns: [
          ...state.turns,
          state.currentTurn
        ],
        currentTurn: {
          damage: state.currentTurn.damage
        }
      }
    });
  }
  
  render() {
    const controlsStyle = {
      display: this.state.showControls ? 'block': 'none'
    };

    return (
      <main className="main-container">
        <Popup />
        <Controls 
          controlPlayers={this.controlPlayers.bind(this)} 
          toggleControls={this.toggleControls.bind(this)} 
          style={controlsStyle}
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

  // utility methods
  findActivePlayer() {
    return this.state.players.find(e => e.active === true)
  }

}
