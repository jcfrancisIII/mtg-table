import React, { Component } from 'react'
import { styled } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'

const MyToolbar = styled(Toolbar)({
    color: '#ffffff'
})

export default class TurnControls extends Component {
    render() {
        return (
            <AppBar
                position="relative"
                color="primary"
                className="turn-controls"
                style={this.props.style}
            >
                <MyToolbar className="turn-controls-container">
                    <Typography variant="h6">
                        Turn {this.props.turnsNumber}
                    </Typography>
                    <Button
                        onClick={this.props.nextTurn.bind(this)}
                        color="inherit"
                    >
                        End Turn
                    </Button>
                    <Button
                        onClick={this.props.endGame.bind(this)}
                        color="inherit"
                    >
                        End Game
                    </Button>
                </MyToolbar>
            </AppBar>
        )
    }
}
