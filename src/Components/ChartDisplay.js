import React, { Component } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";

class ChartDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: this.props.chartData
    };
  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: "right",
    location: "City"
  };

  render() {
    console.log(this.state.chartData);
    return (
      <div className="chart">
        <Bar
          data={this.props.chartData}
          options={{
            title: {
              display: this.props.displayTitle,
              text: "Time of day when VIs are given",
              fontSize: 25
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition
            }
          }}
        />

        <Line
          data={this.props.chartData}
          options={{
            title: {
              display: this.props.displayTitle,
              text: "Officer who gives out the most VI",
              fontSize: 25
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition
            }
          }}
        />

        <Pie
          data={this.props.chartData}
          options={{
            title: {
              display: this.props.displayTitle,
              text: "VI given to Modified Cars VS Stock Cars",
              fontSize: 25
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition
            }
          }}
        />
      </div>
    );
  }
}

export default ChartDisplay;
