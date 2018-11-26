import React, { Component } from 'react';
import { ResponsiveBar } from '@nivo/bar';

export default class GameCharts extends Component {
  // for every player create an effect array
  // total the effect on other players (plus life, minus life, kill?)
  // {healing: 0, damage: 0, kill: false}
  // 
  dmgData() {
    const players = this.props.gameData.players;
    const turns = this.props.gameData.turns;
    players.forEach((thisPlayer, i, arr) => {
      thisPlayer.name = thisPlayer.name === '' ? 'Player ' + thisPlayer.numb: '';
      let thisPlayerNumber = thisPlayer.numb;
      thisPlayer.damage = 0;
      thisPlayer.healing = 0;
      thisPlayer.kills = 0;
      thisPlayer.dmgTo = players.map((obj, i) => { 
        return {
          name: obj['name'],
          numb: obj['numb'],
          color: obj['color'],
          damage: 0,
          healing: 0
        };
      });
      turns.forEach((turn, i) => {
        for (let affectedPlayerNumber in turn.damageData) {
          // affectedPlayer is the player who took damage this turn {lifeEffect, player}
          // affectingPlayer is thisPlayer
          let affectedPlayer = turn.damageData[affectedPlayerNumber];
          let affectingPlayer = affectedPlayer.lifeEffect[thisPlayerNumber];
          thisPlayer.dmgTo[affectedPlayerNumber].healing += affectingPlayer.healing;
          thisPlayer.dmgTo[affectedPlayerNumber].damage += affectingPlayer.damage;

          thisPlayer.healing += affectingPlayer.healing;
          thisPlayer.damage += affectingPlayer.damage;
          thisPlayer.kills = affectingPlayer.kill ? thisPlayer.kills + 1 : thisPlayer.kills;
        }
      });
      return thisPlayer;
     });
    return players;
  }

  render() {
    return (
      <div className="chart-wrap">
        Charts
        {console.log(this.dmgData())}
        <ResponsiveBar 
          data={this.dmgData()}
          indexBy="name"
          margin={{
              "top": 50,
              "right": 130,
              "bottom": 50,
              "left": 60
          }}
          padding={0.3}
          colors="nivo"
          colorBy={(e)=>{return e.data.color}}
            
          borderColor="inherit:darker(1.6)"
          axisTop={null}
          axisRight={null}
          axisBottom={{
              "tickSize": 5,
              "tickPadding": 5,
              "tickRotation": 0
          }}
          axisLeft={{
              "tickSize": 5,
              "tickPadding": 5,
              "tickRotation": 0,
              "legend": "Damage",
              "legendPosition": "middle",
              "legendOffset": -40
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor="inherit:darker(1.6)"
          animate={false}
          keys={["damage"]}
        />
        <ResponsiveBar 
          data={this.dmgData()}
          indexBy="name"
          margin={{
              "top": 50,
              "right": 130,
              "bottom": 50,
              "left": 60
          }}
          padding={0.3}
          colors="nivo"
          colorBy="id"
            
          borderColor="inherit:darker(1.6)"
          axisTop={null}
          axisRight={null}
          axisBottom={{
              "tickSize": 5,
              "tickPadding": 5,
              "tickRotation": 0
          }}
          axisLeft={{
              "tickSize": 5,
              "tickPadding": 5,
              "tickRotation": 0,
              "legend": "Healing",
              "legendPosition": "middle",
              "legendOffset": -40
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor="inherit:darker(1.6)"
          animate={false}
          keys={["healing"]}
        />
      </div>
    );
  }
}
