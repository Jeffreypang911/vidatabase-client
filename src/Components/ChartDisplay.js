import React, { Component } from "react";
import { Bar, Line, Pie, HorizontalBar } from "react-chartjs-2";

const rowWrapperStyle = {
  display: "table",
  width: "100%"
};
const rowContainerStyle = {
  display: "table-cell",
  verticalAlign: "middle",
  borderBottom: "1px solid #e5e5e5"
};
const rowStyle = {
  alignItems: "center",
  justifyContent: "space-between",
  padding: "2%",
  fontSize: "14px"
};
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
        <div style={rowWrapperStyle}>
          <div style={rowContainerStyle}>
            <div style={rowStyle}>
              <div>
                <Bar
                  width={"1000"}
                  height={"400"}
                  data={this.props.policeOfficersData}
                  options={{
                    scales: {
                      yAxes: [
                        {
                          ticks: {
                            min: 0,
                            stepSize: 1
                          }
                        }
                      ]
                    },
                    title: {
                      display: this.props.displayTitle,
                      text: "Officer who gives out the most VI tickets",
                      fontSize: 25
                    },
                    options: { maintainAspectRatio: false }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div style={rowWrapperStyle}>
          <div style={rowContainerStyle}>
            <div style={rowStyle}>
              <div>
                <Line
                  width={"1050"}
                  height={"400"}
                  data={this.props.hoursTicketedData}
                  options={{
                    scales: {
                      yAxes: [
                        {
                          ticks: {
                            min: 0,
                            stepSize: 1
                          }
                        }
                      ]
                    },
                    title: {
                      display: this.props.displayTitle,
                      text: "Time of day to most likely get a VI",
                      fontSize: 25
                    }
                  }}
                />{" "}
              </div>
            </div>
          </div>
        </div>
        <div style={rowWrapperStyle}>
          <div style={rowContainerStyle}>
            <div
              style={{
                alignItems: "flex-start",
                justifyContent: "space-between",
                padding: "2%",
                fontSize: "14px"
              }}
            >
              <div>
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
                />{" "}
              </div>
            </div>
          </div>
        </div>
        <div style={rowWrapperStyle}>
          <div style={rowContainerStyle}>
            <div style={rowStyle}>
              <div>
                <HorizontalBar
                  width={"1000"}
                  height={"400"}
                  data={this.props.violationTypes}
                  options={{
                    scales: {
                      xAxes: [
                        {
                          ticks: {
                            min: 0,
                            stepSize: 1
                          }
                        }
                      ]
                    },
                    title: {
                      display: this.props.displayTitle,
                      text: "Most Common Reasons for VI",
                      fontSize: 25
                    },
                    options: { maintainAspectRatio: false }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChartDisplay;
