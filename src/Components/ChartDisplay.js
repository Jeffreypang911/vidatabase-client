import React, { Component } from "react";
import { Bar, Line, Pie, HorizontalBar } from "react-chartjs-2";
import "../styles.css";

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
      <div>
        <div className="chartRowWrapper">
          <div className="chart">
            <div className="chartboarder">
              <Line
                width={"100%"}
                height={"70%"}
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
                    fontSize: 16
                  }
                }}
              />{" "}
            </div>
          </div>
          <div className="chart">
            <div className="chartboarder">
              <HorizontalBar
                width={"100%"}
                height={"70%"}
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
                    fontSize: 16
                  },
                  options: { maintainAspectRatio: false }
                }}
              />
            </div>
          </div>
        </div>
        <div className="chartRowWrapper">
          <div className="chart">
            <div className="chartboarder">
              <Pie
                width={"100%"}
                height={"70%"}
                data={this.props.vehicleBrandData}
                options={{
                  title: {
                    display: this.props.displayTitle,
                    text: "Car Brands that are most likely to get VI",
                    fontSize: 16
                  },
                  legend: {
                    display: this.props.displayLegend,
                    position: this.props.legendPosition
                  }
                }}
              />{" "}
            </div>
          </div>
          <div className="chart">
            <div className="chartboarder">
              <Bar
                width={"100%"}
                height={"70%"}
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
                    fontSize: 16
                  },
                  options: { maintainAspectRatio: false }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChartDisplay;
