import React, { Component } from 'react'
import { CirclePicker } from 'react-color'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

export default class Player extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isEditingName: false,
            isEditingLife: false,
            isEditingColor: false
        }

        this.playerName = React.createRef()
    }

    minus(e) {
        const i = this.props.player.numb
        this.props.controlLife('minus', i)
    }

    plus(e) {
        const i = this.props.player.numb
        this.props.controlLife('plus', i)
    }

    setEditName(isEditingName, e) {
        this.setState({
            isEditingName
        })
    }

    setName(e) {
        this.props.setName(e.target.value, this.props.player.numb)
    }

    renderName() {
        const name = this.props.player.name
            ? this.props.player.name
            : 'Player ' + (this.props.player.numb + 1)

        if (this.state.isEditingName && this.props.showPlayerControls) {
            return (
                <input
                    className="player-name"
                    type="text"
                    onChange={this.setName.bind(this)}
                    onBlur={this.setEditName.bind(this, false)}
                    autoFocus
                />
            )
        }

        return (
            <h4
                onClick={this.setEditName.bind(this, true)}
                className="player-name"
            >
                {name}
            </h4>
        )
    }

    setEditLife(isEditingLife, e) {
        this.setState({
            isEditingLife
        })
    }

    setLife(e) {
        this.setEditLife(false, e)
        this.props.setLife(e.target.value, this.props.player.numb)
    }

    renderLife() {
        if (this.state.isEditingLife && this.props.showLifeControls) {
            return (
                <input
                    className="player-life"
                    defaultValue={this.props.player.life}
                    type="number"
                    onBlur={this.setLife.bind(this)}
                    //onKeyPress={this.enterLife.bind(this)}
                    //onBlur={this.setEditLife.bind(this, false)}
                    autoFocus
                />
            )
        }

        return (
            <h1
                onClick={this.setEditLife.bind(this, true)}
                className="player-life"
            >
                {this.props.player.life}
            </h1>
        )
    }

    setEditColor(isEditingColor, e) {
        this.setState({
            isEditingColor
        })
    }

    setColor(color, e) {
        this.props.setColor(color.hex, this.props.player.numb)
        this.setEditColor(false, e)
    }

    renderColor() {
        // this.props.showPlayerControls makes color picker only visible before start
        if (this.state.isEditingColor && this.props.showPlayerControls) {
            return (
                <CirclePicker
                    className="player-color"
                    width="100%"
                    circleSize={18}
                    circleSpacing={7}
                    colors={[
                        '#f44336',
                        '#e91e63',
                        '#9c27b0',
                        '#673ab7',
                        '#3f51b5',
                        '#2196f3',
                        '#03a9f4',
                        '#00bcd4',
                        '#009688',
                        '#4caf50',
                        '#8bc34a',
                        '#ffc107',
                        '#ff9800',
                        '#ff5722',
                        '#795548',
                        '#607d8b'
                    ]}
                    color={this.props.color}
                    onChangeComplete={this.setColor.bind(this)}
                />
            )
        } else if (this.props.showPlayerControls) {
            return (
                <button
                    className="player-color"
                    onClick={this.setEditColor.bind(this, true)}
                    style={this.props.playerControlsStyle}
                >
                    &#x22ee;
                </button>
            )
        }
    }

    setActive() {
        this.props.setActive(this.props.player.numb)
    }

    render() {
        const playerStyle = {
            background: this.props.player.color,
            border: this.props.player.active
                ? '2px solid #000'
                : '0px solid #000'
        }
        const lifeControlsStyle = {
            display: this.props.showLifeControls ? 'block' : 'none'
        }
        const activeControlsStyle = {
            display:
                this.props.showPlayerControls || this.props.player.active
                    ? 'none'
                    : 'block'
        }
        return (
            <li className="flex-item" style={playerStyle}>
                {this.renderName()}
                {this.renderLife()}
                {this.renderColor()}
                <Button
                    style={lifeControlsStyle}
                    onClick={this.minus.bind(this)}
                >
                    -
                </Button>
                <Button
                    style={lifeControlsStyle}
                    onClick={this.plus.bind(this)}
                >
                    +
                </Button>
                <Button
                    style={activeControlsStyle}
                    onClick={this.setActive.bind(this)}
                >
                    Active
                </Button>
            </li>
        )
    }
}
