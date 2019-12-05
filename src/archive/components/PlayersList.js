import React, { Component } from 'react'
import Player from './Player'

export default class PlayerList extends Component {
    renderPlayers() {
        return this.props.players.map((player, i) => {
            return (
                <Player
                    key={player.numb}
                    player={player}
                    controlLife={this.props.controlLife}
                    setName={this.props.setName}
                    setLife={this.props.setLife}
                    setColor={this.props.setColor}
                    setActive={this.props.setActive}
                    showPlayerControls={this.props.showPlayerControls}
                    showLifeControls={this.props.showLifeControls}
                />
            )
        })
    }

    render() {
        return (
            <ul className="flex-container" style={this.props.style}>
                {this.renderPlayers()}
            </ul>
        )
    }
}
