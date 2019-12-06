import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

export default class AddPlayerControls extends Component {
    start() {
        this.props.start()
    }

    minus() {
        this.props.controlPlayers('minus')
    }

    plus() {
        this.props.controlPlayers('plus')
    }

    render() {
        return (
            <AppBar className="player-controls" style={this.props.style}>
                <Toolbar className="player-controls-container">
                    <Typography variant="h3" component="h3">
                        Set the # of Players
                    </Typography>
                    <Button onClick={this.minus.bind(this)}>-</Button>
                    <Button onClick={this.plus.bind(this)}>+</Button>
                    <Button
                        style={{ float: 'right' }}
                        onClick={this.start.bind(this)}
                    >
                        Start
                    </Button>
                </Toolbar>
            </AppBar>
        )
    }
}
