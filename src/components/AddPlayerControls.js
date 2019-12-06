import React, { Component } from 'react'
import { styled } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'

const MyToolbar = styled(Toolbar)({
    color: '#ffffff'
})

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
            <AppBar
                position="fixed"
                color="primary"
                className="player-controls"
                style={this.props.style}
            >
                <MyToolbar>
                    <Typography variant="h6" component="h1">
                        Set the # of Players
                    </Typography>
                    <IconButton onClick={this.minus.bind(this)} color="inherit">
                        <Icon>remove</Icon>
                    </IconButton>
                    <IconButton onClick={this.plus.bind(this)} color="inherit">
                        <Icon>add</Icon>
                    </IconButton>
                    <Button
                        style={{ float: 'right' }}
                        onClick={this.start.bind(this)}
                        color="inherit"
                    >
                        Start
                    </Button>
                </MyToolbar>
            </AppBar>
        )
    }
}
