import React, { Component } from 'react';
import { ResponsiveBar } from '@nivo/bar';

export default class GameCharts extends Component {
  chartOneData() {

  }

  render() {
    return (
      <div className="chart-wrap">
        Charts
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
          motionStiffness={90}
          motionDamping={15}
          legends={[
              {
                  "dataFrom": "keys",
                  "anchor": "bottom-right",
                  "direction": "column",
                  "justify": false,
                  "translateX": 120,
                  "translateY": 0,
                  "itemsSpacing": 2,
                  "itemWidth": 100,
                  "itemHeight": 20,
                  "itemDirection": "left-to-right",
                  "itemOpacity": 0.85,
                  "symbolSize": 20,
                  "effects": [
                      {
                          "on": "hover",
                          "style": {
                              "itemOpacity": 1
                          }
                      }
                  ]
              }
          ]}
        />
      </div>
    );
  }
}
