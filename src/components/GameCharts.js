import React, { Component } from 'react';
import { ResponsiveBar } from '@nivo/bar';

export default class GameCharts extends Component {
  // constructor(props) {
  //   super(props);
    
  //   this.state = {
  //   };
  // }
  
  render() {
    return (
      <div className="chart-wrap">
        Charts
        <ResponsiveBar 
          data={[
            {
              "country": "AD",
              "hot dog": 23,
              "hot dogColor": "hsl(256, 70%, 50%)",
              "burger": 131,
              "burgerColor": "hsl(69, 70%, 50%)",
              "sandwich": 169,
              "sandwichColor": "hsl(167, 70%, 50%)",
              "kebab": 70,
              "kebabColor": "hsl(168, 70%, 50%)",
              "fries": 84,
              "friesColor": "hsl(179, 70%, 50%)",
              "donut": 181,
              "donutColor": "hsl(359, 70%, 50%)"
            },
            {
              "country": "AE",
              "hot dog": 184,
              "hot dogColor": "hsl(30, 70%, 50%)",
              "burger": 168,
              "burgerColor": "hsl(163, 70%, 50%)",
              "sandwich": 116,
              "sandwichColor": "hsl(191, 70%, 50%)",
              "kebab": 7,
              "kebabColor": "hsl(16, 70%, 50%)",
              "fries": 27,
              "friesColor": "hsl(232, 70%, 50%)",
              "donut": 112,
              "donutColor": "hsl(329, 70%, 50%)"
            },
            {
              "country": "AF",
              "hot dog": 116,
              "hot dogColor": "hsl(355, 70%, 50%)",
              "burger": 115,
              "burgerColor": "hsl(185, 70%, 50%)",
              "sandwich": 19,
              "sandwichColor": "hsl(142, 70%, 50%)",
              "kebab": 101,
              "kebabColor": "hsl(51, 70%, 50%)",
              "fries": 168,
              "friesColor": "hsl(52, 70%, 50%)",
              "donut": 180,
              "donutColor": "hsl(50, 70%, 50%)"
            },
            {
              "country": "AG",
              "hot dog": 147,
              "hot dogColor": "hsl(59, 70%, 50%)",
              "burger": 46,
              "burgerColor": "hsl(348, 70%, 50%)",
              "sandwich": 28,
              "sandwichColor": "hsl(87, 70%, 50%)",
              "kebab": 127,
              "kebabColor": "hsl(34, 70%, 50%)",
              "fries": 7,
              "friesColor": "hsl(88, 70%, 50%)",
              "donut": 183,
              "donutColor": "hsl(6, 70%, 50%)"
            },
            {
              "country": "AI",
              "hot dog": 76,
              "hot dogColor": "hsl(124, 70%, 50%)",
              "burger": 190,
              "burgerColor": "hsl(283, 70%, 50%)",
              "sandwich": 198,
              "sandwichColor": "hsl(4, 70%, 50%)",
              "kebab": 81,
              "kebabColor": "hsl(111, 70%, 50%)",
              "fries": 93,
              "friesColor": "hsl(167, 70%, 50%)",
              "donut": 86,
              "donutColor": "hsl(25, 70%, 50%)"
            },
            {
              "country": "AL",
              "hot dog": 170,
              "hot dogColor": "hsl(313, 70%, 50%)",
              "burger": 42,
              "burgerColor": "hsl(110, 70%, 50%)",
              "sandwich": 84,
              "sandwichColor": "hsl(130, 70%, 50%)",
              "kebab": 11,
              "kebabColor": "hsl(89, 70%, 50%)",
              "fries": 171,
              "friesColor": "hsl(27, 70%, 50%)",
              "donut": 32,
              "donutColor": "hsl(139, 70%, 50%)"
            },
            {
              "country": "AM",
              "hot dog": 156,
              "hot dogColor": "hsl(310, 70%, 50%)",
              "burger": 103,
              "burgerColor": "hsl(218, 70%, 50%)",
              "sandwich": 200,
              "sandwichColor": "hsl(48, 70%, 50%)",
              "kebab": 127,
              "kebabColor": "hsl(47, 70%, 50%)",
              "fries": 99,
              "friesColor": "hsl(2, 70%, 50%)",
              "donut": 168,
              "donutColor": "hsl(89, 70%, 50%)"
            }
          ]}
          keys={[
              "hot dog",
              "burger",
              "sandwich",
              "kebab",
              "fries",
              "donut"
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
        defs={[
            {
                "id": "dots",
                "type": "patternDots",
                "background": "inherit",
                "color": "#38bcb2",
                "size": 4,
                "padding": 1,
                "stagger": true
            },
            {
                "id": "lines",
                "type": "patternLines",
                "background": "inherit",
                "color": "#eed312",
                "rotation": -45,
                "lineWidth": 6,
                "spacing": 10
            }
        ]}
        fill={[
            {
                "match": {
                    "id": "fries"
                },
                "id": "dots"
            },
            {
                "match": {
                    "id": "sandwich"
                },
                "id": "lines"
            }
        ]}
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
