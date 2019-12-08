import React, { useState } from 'react'
import Popup from 'react-popup'
import { styled } from '@material-ui/core'

import AddPlayerControls from './AddPlayerControls'
import PlayerList from './PlayersList'
import TurnControls from './TurnControls'
import GameCharts from './GameCharts'
import Test from './Test'
import '../styles/App.css'

const StyledAddPlayerControls = styled(AddPlayerControls)`
    color: red;
    margin-bottom: ${props => props.theme.spacing(0, 0, 3)};
`

export default function App(props) {
    const [store, setValues] = useState({
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
    })

    const start = () => {
        const playersDmg = createPlayersDmg(store)

        setValues({
            ...store,
            currentTurn: {
                damageData: playersDmg
            },
            showPlayerControls: false,
            showTurnControls: true
        })
    }

    const removePlayer = () => {
        // returns a new array
        const newPlayers = store.players.slice(0, -1)
        setValues({
            ...store,
            players: newPlayers,
            currentPlayer: {
                ...store.currentPlayer,
                numb:
                    store.currentPlayer.numb >= 1
                        ? store.currentPlayer.numb - 1
                        : 0
            }
        })
    }

    const addPlayer = () => {
        setValues({
            ...store,
            players: [...store.players, store.currentPlayer],
            currentPlayer: {
                ...store.currentPlayer,
                numb: store.currentPlayer.numb + 1
            }
        })
    }

    const controlPlayers = (action, playerIndex) => {
        switch (action) {
            case 'minus':
                removePlayer(playerIndex)
                break
            case 'plus':
                addPlayer(playerIndex)
                break
            default:
                console.log('Error in' + playerIndex)
        }
    }

    const minusLife = i => {
        const newLife = parseInt(store.players[i].life) - 1
        setLife(newLife, i)
    }

    const plusLife = i => {
        const newLife = parseInt(store.players[i].life) + 1
        setLife(newLife, i)
    }

    const controlLife = (action, i) => {
        switch (action) {
            case 'minus':
                minusLife(i)
                break
            case 'plus':
                plusLife(i)
                break
            default:
                console.log('Error in' + i)
        }
    }

    const setName = (newName, i) => {
        const newPlayer = {
            ...store.players[i],
            name: newName
        }
        const newPlayers = [...store.players]
        newPlayers[i] = newPlayer
        setValues({
            ...store,
            players: newPlayers
        })
    }

    const setLife = (newLife, i) => {
        // i is receivingPlayer.numb
        // create new players array
        const receivingPlayer = {
            ...store.players[i],
            life: parseInt(newLife)
        }
        // wrap to create new obj
        const newPlayers = [...store.players]
        newPlayers[i] = receivingPlayer

        // assign new lifeEffect to the receiving player
        const activePlayer = findActivePlayer(store)
        const lifeDiff = store.players[i].life - newLife
        // if lifeDiff > 0 they lost life
        // if lifeDiff < 0 they gained life
        const activeLifeEffect = {
            ...store.currentTurn.damageData[receivingPlayer.numb].lifeEffect[
                activePlayer.numb
            ]
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
            parseInt(newLife) > store.players[i].life &&
            store.players[i].life <= 0
        ) {
            Popup.alert("Life can't go up from 0!")
        }

        setValues({
            ...store,
            players: newPlayers,
            currentTurn: {
                damageData: {
                    ...store.currentTurn.damageData,
                    [i]: {
                        player: receivingPlayer,
                        lifeEffect: {
                            ...store.currentTurn.damageData[i].lifeEffect,
                            [activePlayer.numb]: activeLifeEffect
                        }
                    }
                }
            }
        })
    }

    const setColor = (setColor, i) => {
        const newPlayer = {
            ...store.players[i],
            color: setColor
        }
        const newPlayers = [...store.players]
        newPlayers[i] = newPlayer
        setValues({
            ...store,
            players: newPlayers
        })
    }

    const setActive = i => {
        const newPlayer = {
            ...store.players[i],
            active: store.players[i].active ? false : true
        }
        const newPlayers = store.players.map(x => {
            return { ...x, active: false }
        })
        newPlayers[i] = newPlayer

        setValues({
            ...store,
            players: newPlayers
        })
    }

    const nextTurn = () => {
        const playersDmg = createPlayersDmg(store)

        setValues({
            ...store,
            turns: [...store.turns, store.currentTurn],
            currentTurn: {
                damageData: playersDmg
            }
        })
    }

    const endGame = () => {
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
                            setValues({
                                ...store,
                                turns: [...store.turns, store.currentTurn],
                                currentTurn: {
                                    damage: {}
                                },
                                showGameCharts: true
                            })
                            Popup.close()
                        }
                    }
                ]
            }
        })
    }

    // utility methods
    const findActivePlayer = store => {
        return store.players
            ? store.players.find(e => e.active === true)
            : false
    }

    const createPlayersDmg = store => {
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

        const players = [...store.players]
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
    // end utility methods

    const turnControlsStyle = {
        display:
            store.showTurnControls && !store.showGameCharts ? 'block' : 'none'
    }
    let playerControlsStyle = {
        display:
            store.showPlayerControls && !store.showGameCharts ? 'block' : 'none'
    }
    const showLifeControls =
        store.showTurnControls && typeof findActivePlayer(store) === 'object'
            ? true
            : false
    const playerListStyle = {
        display: !store.showGameCharts ? 'flex' : 'none'
    }

    return (
        <main>
            <Popup />
            <StyledAddPlayerControls
                controlPlayers={controlPlayers.bind(this)}
                start={start.bind(this)}
                style={playerControlsStyle}
            />
            <TurnControls
                nextTurn={nextTurn.bind(this)}
                endGame={endGame.bind(this)}
                turnsNumber={store.turns && store.turns.length + 1}
                style={turnControlsStyle}
            />
            <PlayerList
                players={store.players}
                controlLife={controlLife.bind(this)}
                setName={setName.bind(this)}
                setLife={setLife.bind(this)}
                setColor={setColor.bind(this)}
                setActive={setActive.bind(this)}
                showPlayerControls={store.showPlayerControls}
                showLifeControls={showLifeControls}
                style={playerListStyle}
            />
            <Test />
            {store.showGameCharts && <GameCharts gameData={store} />}
        </main>
    )
}
