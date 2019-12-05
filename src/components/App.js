import React, { Component, PropTypes } from 'react'
import AddPlayerControls from './AddPlayerControls'
import PlayerList from './PlayersList'
import TurnControls from './TurnControls'
import GameCharts from './GameCharts'
import Popup from 'react-popup'
import './App.css'

// store
import reducer from './state/reducers/index'

// SAGAS TEST component
const Counter = ({ value, onIncrement, onDecrement, onIncrementAsync }) => (
    <div>
        <button onClick={onIncrementAsync}>Increment after 1 second</button>{' '}
        <button onClick={onIncrement}>Increment</button>{' '}
        <button onClick={onDecrement}>Decrement</button>
        <hr />
        <div>Clicked: {value} times</div>
    </div>
)
Counter.propTypes = {
    value: PropTypes.number.isRequired,
    onIncrement: PropTypes.func.isRequired,
    onDecrement: PropTypes.func.isRequired
}

export default class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            players: [],
            currentPlayer: {
                name: '',
                numb: 0,
                life: 20,
                color: '#ff5722',
                active: false
            },
            turns: [],
            currentTurn: {
                damageData: {} // damage
            }, // currentTurn
            showPlayerControls: true,
            showTurnControls: false,
            showGameCharts: false
        }
    }

    start() {
        const playersDmg = this.createPlayersDmg(this.state)

        this.setState(state => {
            return {
                currentTurn: {
                    damageData: playersDmg
                },
                showPlayerControls: false,
                showTurnControls: true
            }
        })
    }

    removePlayer() {
        // returns a new array
        const newPlayers = this.state.players.slice(0, -1)
        this.setState(state => {
            return {
                players: newPlayers,
                currentPlayer: {
                    ...this.state.currentPlayer,
                    numb:
                        this.state.currentPlayer.numb >= 1
                            ? this.state.currentPlayer.numb - 1
                            : 0
                }
            }
        })
    }

    addPlayer() {
        this.setState(state => {
            return {
                players: [...state.players, state.currentPlayer],
                currentPlayer: {
                    ...state.currentPlayer,
                    numb: state.currentPlayer.numb + 1
                }
            }
        })
    }

    controlPlayers(action, playerIndex) {
        switch (action) {
            case 'minus':
                this.removePlayer(playerIndex)
                break
            case 'plus':
                this.addPlayer(playerIndex)
                break
            default:
                console.log('Error in' + this.name)
        }
    }

    minusLife(i) {
        const newLife = parseInt(this.state.players[i].life) - 1
        this.setLife(newLife, i)
    }

    plusLife(i) {
        const newLife = parseInt(this.state.players[i].life) + 1
        this.setLife(newLife, i)
    }

    controlLife(action, i) {
        switch (action) {
            case 'minus':
                this.minusLife(i)
                break
            case 'plus':
                this.plusLife(i)
                break
            default:
                console.log('Error in' + this.name)
        }
    }

    setName(newName, i) {
        const newPlayer = {
            ...this.state.players[i],
            name: newName
        }
        const newPlayers = [...this.state.players]
        newPlayers[i] = newPlayer
        this.setState(state => {
            return {
                players: newPlayers
            }
        })
    }

    setLife(newLife, i) {
        // i is receivingPlayer.numb
        // create new players array
        const receivingPlayer = {
            ...this.state.players[i],
            life: parseInt(newLife)
        }
        // wrap to create new obj
        const newPlayers = [...this.state.players]
        newPlayers[i] = receivingPlayer

        // assign new lifeEffect to the receiving player
        const activePlayer = this.findActivePlayer(this.state)
        const lifeDiff = this.state.players[i].life - newLife
        // if lifeDiff > 0 they lost life
        // if lifeDiff < 0 they gained life
        const activeLifeEffect = {
            ...this.state.currentTurn.damageData[receivingPlayer.numb]
                .lifeEffect[activePlayer.numb]
        }
        lifeDiff > 0
            ? (activeLifeEffect.damage += Math.abs(lifeDiff))
            : (activeLifeEffect.healing += Math.abs(lifeDiff))
        activeLifeEffect.kill = newLife <= 0 ? true : false
        activeLifeEffect.player = activePlayer

        // stop life from going up from 0
        // possibly need to stop life from going down past zero
        // depending on how to track lethal damage does it count past the player's remaining life?
        if (
            parseInt(newLife) > this.state.players[i].life &&
            this.state.players[i].life <= 0
        ) {
            Popup.alert("Life can't go up from 0!")
        }

        this.setState(state => {
            return {
                players: newPlayers,
                currentTurn: {
                    damageData: {
                        ...state.currentTurn.damageData,
                        [i]: {
                            player: receivingPlayer,
                            lifeEffect: {
                                ...state.currentTurn.damageData[i].lifeEffect,
                                [activePlayer.numb]: activeLifeEffect
                            }
                        }
                    }
                }
            }
        })
    }

    setColor(setColor, i) {
        const newPlayer = {
            ...this.state.players[i],
            color: setColor
        }
        const newPlayers = [...this.state.players]
        newPlayers[i] = newPlayer
        this.setState({
            players: newPlayers
        })
    }

    setActive(i) {
        const newPlayer = {
            ...this.state.players[i],
            active: this.state.players[i].active ? false : true
        }
        const newPlayers = this.state.players.map(x => {
            return { ...x, active: false }
        })
        newPlayers[i] = newPlayer

        this.setState(state => {
            return {
                players: newPlayers
            }
        })
    }

    nextTurn() {
        const playersDmg = this.createPlayersDmg(this.state)

        this.setState(state => {
            return {
                turns: [...state.turns, state.currentTurn],
                currentTurn: {
                    damageData: playersDmg
                }
            }
        })
    }

    endGame() {
        Popup.create({
            content: 'Are you sure?',
            buttons: {
                left: [
                    {
                        text: 'No',
                        action: () => {
                            Popup.close()
                        }
                    }
                ],
                right: [
                    {
                        text: 'Yes',
                        action: () => {
                            this.setState(state => {
                                return {
                                    turns: [...state.turns, state.currentTurn],
                                    currentTurn: {
                                        damage: {}
                                    },
                                    showGameCharts: true
                                }
                            })
                            Popup.close()
                        }
                    }
                ]
            }
        })
    }

    render() {
        const turnControlsStyle = {
            display:
                this.state.showTurnControls && !this.state.showGameCharts
                    ? 'block'
                    : 'none'
        }
        const playerControlsStyle = {
            display:
                this.state.showPlayerControls && !this.state.showGameCharts
                    ? 'block'
                    : 'none'
        }
        const showLifeControls =
            this.state.showTurnControls &&
            typeof this.findActivePlayer(this.state) === 'object'
                ? true
                : false
        const playerListStyle = {
            display: !this.state.showGameCharts ? 'flex' : 'none'
        }

        return (
            <main className="main-container">
                <Popup />
                <AddPlayerControls
                    controlPlayers={this.controlPlayers.bind(this)}
                    start={this.start.bind(this)}
                    style={playerControlsStyle}
                />
                <TurnControls
                    nextTurn={this.nextTurn.bind(this)}
                    endGame={this.endGame.bind(this)}
                    turnsNumber={this.state.turns.length + 1}
                    style={turnControlsStyle}
                />
                <PlayerList
                    players={this.state.players}
                    controlLife={this.controlLife.bind(this)}
                    setName={this.setName.bind(this)}
                    setLife={this.setLife.bind(this)}
                    setColor={this.setColor.bind(this)}
                    setActive={this.setActive.bind(this)}
                    showPlayerControls={this.state.showPlayerControls}
                    showLifeControls={showLifeControls}
                    style={playerListStyle}
                />
                <Counter
                    value={store.getState()}
                    onIncrement={() => action('INCREMENT')}
                    onDecrement={() => action('DECREMENT')}
                    onIncrementAsync={() => action('INCREMENT_ASYNC')}
                />
                {this.state.showGameCharts && (
                    <GameCharts gameData={this.state} />
                )}
            </main>
        )
    }

    // utility methods
    findActivePlayer(state) {
        return state.players.find(e => e.active === true)
    }

    createPlayersDmg(state) {
        const initPlayerDmg = {
            // set to player number in currentTurn.damage
            player: {},
            lifeEffect: {}
        } // receiving player

        const initLifeEffect = {
            // set to player number in damage[player number].lifeEffect
            healing: 0,
            damage: 0,
            kill: false,
            player: {}
        } //active player

        const players = [...state.players]
        // add damage trackers for each player
        const playersDmg = {}
        const playerDmg = initPlayerDmg
        // create a lifeEffect obj for each player
        // reduce returns result to the next call
        // {} is initial value
        const playersLA = players.reduce((map, o) => {
            map[o.numb] = initLifeEffect
            return map
        }, {})

        // create a damage obj for each player
        players.forEach(o => {
            playerDmg.player = o
            playerDmg.lifeEffect = playersLA // players life effect to this player
            // set an object containing the
            playersDmg[o.numb] = playerDmg
        })

        return playersDmg
    }
}
