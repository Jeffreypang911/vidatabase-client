import React, { Component } from "react";
import "react-inputs-validation/lib/react-inputs-validation.min.css";
import "./styles.css";
import "react-day-picker/lib/style.css";
// import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import firebase from "firebase";
import L from "leaflet";
import MapDisplay from "./Components/MapDisplay";
import ChartDisplay from "./Components/ChartDisplay";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      chartData: {}
    };
  }

  componentWillMount = () => {
    this.getChartData();
  };

  componentDidMount = () => {
    let ref = firebase.database().ref("users/");
    ref.once("value").then(res => {
      // Async request to Firebase
      if (res.val() !== undefined) {
        const UserArry = Object.values(res.val());
        // If response not undefined then load it to 'state'
        this.setState({ userData: UserArry, loading: false });
      }
    });
  };

  getChartData = () => {
    // Ajax calls here
    this.setState({
      chartData: {
        labels: [
          "Boston",
          "Worcester",
          "Springfield",
          "Lowell",
          "Cambridge",
          "New Bedford"
        ],
        datasets: [
          {
            label: "Population",
            data: [617594, 181045, 153060, 106519, 105162, 95072],
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
              "rgba(255, 99, 132, 0.6)"
            ]
          }
        ]
      }
    });
  };

  render() {
    const rowStyle = {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      padding: "2%",
      fontSize: "14px"
    };
    const rowWrapperStyle = {
      display: "table",
      width: "100%"
    };
    const rowContainerStyle = {
      display: "table-cell",
      verticalAlign: "middle",
      borderBottom: "1px solid #e5e5e5"
    };
    return (
      <div
        style={{
          minHeight: "1000px",
          padding: "10px",
          border: "100px solid #e5e5e5"
        }}
      >
        <h1>VI USER MAP</h1>
        <div style={rowWrapperStyle}>
          <div style={rowContainerStyle}>
            <div style={rowStyle}>
              <div style={{ flex: "6 6 0px" }}>
                <link
                  rel="stylesheet"
                  href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css"
                />
                <MapDisplay userData={this.state.userData} />
              </div>
            </div>
          </div>
        </div>
        <div style={rowWrapperStyle}>
          <div style={rowContainerStyle}>
            <div style={rowStyle}>
              <div style={{ flex: "6 6 0px" }}>
                <link
                  rel="stylesheet"
                  href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css"
                />
                <ChartDisplay chartData={this.state.chartData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
