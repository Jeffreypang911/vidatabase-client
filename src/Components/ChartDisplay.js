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
    location: "City",
    vehicleBrandData: null,
    policeOfficersData: null,
    hoursTicketedData: null,
    isCarModifiedData: null,
    policeVehicleData: null
  };

  render() {
    return (
      <div className="chart">
        <Bar
          width={"1000"}
          height={"400"}
          data={this.props.policeOfficersData}
          options={{
            title: {
              display: this.props.displayTitle,
              text: "Officer who gives out the most VI tickets",
              fontSize: 25
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition
            },
            options: { maintainAspectRatio: false }
          }}
        />

        <Line
          width={"1000"}
          height={"400"}
          data={this.props.hoursTicketedData}
          options={{
            title: {
              display: this.props.displayTitle,
              text: "Time of day to most likely get a VI",
              fontSize: 25
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition
            }
          }}
        />

        <Pie
          data={this.props.vehicleBrandData}
          options={{
            title: {
              display: this.props.displayTitle,
              text: "Car Brands that are most likely to get VI",
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
