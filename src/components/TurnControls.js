import React, { Component } from 'react'

export default class TurnControls extends Component {
    render() {
        return (
            <div className="turn-controls" style={this.props.style}>
                <div className="turn-controls-container">
                    <h4>Turn {this.props.turnsNumber}</h4>
                    <button onClick={this.props.nextTurn.bind(this)}>
                        End Turn
                    </button>
                    <button onClick={this.props.endGame.bind(this)}>
                        End Game
                    </button>
                </div>
            </div>
        )
    }
}
