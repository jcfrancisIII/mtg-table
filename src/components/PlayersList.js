import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'

import Player from './Player'

export default class PlayerList extends Component {
    renderPlayers() {
        return this.props.players.map((player, i) => {
            return (
                <Grid item>
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
                </Grid>
            )
        })
    }

    render() {
        return (
            <Grid container spacing={2}>
                {this.renderPlayers()}
            </Grid>
        )
    }
}
