import React, { Component } from 'react';
import { ResponsiveBar } from '@nivo/bar';

export default class GameCharts extends Component {
  // for every player create an effect array
  // total the effect on other players (plus life, minus life, kill?)
  // {healing: 0, damage: 0, kill: false}
  // 
  totalDamageData() {
    const players = this.props.gameData.players;
    const turns = this.props.gameData.turns;
    players.forEach((thisPlayer, i) => {
      let thisPlayerNumber = thisPlayer.number;
      thisPlayer.damage = 0;
      thisPlayer.healing = 0;
      thisPlayer.kills = 0;
      turns.forEach((turn, i) => {
        for (let affectedPlayerNumber in turn.damageData) {
          // affectedPlayer is the player who took damage this turn {lifeEffect, player}
          // affectingPlayer is thisPlayer
          let affectedPlayer = turn.damageData[affectedPlayerNumber];
          let affectingPlayer = affectedPlayer.lifeEffect[thisPlayerNumber];
          thisPlayer.healing += affectingPlayer.healing;
          thisPlayer.damage += affectingPlayer.damage;
          thisPlayer.kills = affectingPlayer.kill ? thisPlayer.kills + 1 : thisPlayer.kills;
        }
      });
      return thisPlayer;
     });
    return players;
  }

  healingData() {
    const data = this.props.gameData.players;
    // this.props.gameData.reduce((map, o) => {
    //   map = players;
    // }, {})
    return data;
  }

  render() {
    return (
      <div className="chart-wrap">
        Charts
        {console.log(this.totalDamageData())}
        <ResponsiveBar 
          data={[
            {
              "country": "AD",
              "hot dog": 23,
              "hot dogColor": "hsl(256, 70%, 50%)"
            },
            {
              "country": "AE",
              "hot dog": 184,
              "hot dogColor": "hsl(30, 70%, 50%)"
            },
            {
              "country": "AF",
              "hot dog": 116,
              "hot dogColor": "hsl(355, 70%, 50%)"
            },
            {
              "country": "AG",
              "hot dog": 147,
              "hot dogColor": "hsl(59, 70%, 50%)"
            },
            {
              "country": "AI",
              "hot dog": 76,
              "hot dogColor": "hsl(124, 70%, 50%)"
            },
            {
              "country": "AL",
              "hot dog": 170,
              "hot dogColor": "hsl(313, 70%, 50%)"
            },
            {
              "country": "AM",
              "hot dog": 156,
              "hot dogColor": "hsl(310, 70%, 50%)"
            }
          ]}
          indexBy="country"
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
              "tickRotation": 0,
              "legend": "country",
              "legendPosition": "middle",
              "legendOffset": 32
          }}
          axisLeft={{
              "tickSize": 5,
              "tickPadding": 5,
              "tickRotation": 0,
              "legend": "food",
              "legendPosition": "middle",
              "legendOffset": -40
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor="inherit:darker(1.6)"
          animate={false}
          keys={["hot dog"]}
        />
      </div>
    );
  }
}
