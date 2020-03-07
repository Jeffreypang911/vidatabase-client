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
      vehicleBrand: [],
      policeOfficers: [],
      hoursTicketed: [],
      isCarModified: [],
      policeVehicle: [],
      chartData: {}
    };
  }

  componentWillMount = () => {};

  componentDidMount = () => {
    let ref = firebase.database().ref("users/");
    ref.once("value").then(res => {
      // Async request to Firebase
      if (res.val() !== undefined) {
        const UserArry = Object.values(res.val());
        // If response not undefined then load it to 'state'
        this.arrayCount(UserArry);
        this.setState({ userData: UserArry, loading: false });
      }
    });
  };

  arrayCount = array => {
    //This function pushes all instances of a value in the Data Object. Then the arraySort function
    //counts how many of each value is and displays it as an object.
    var policeVehicle = [];
    var vehicleBrand = [];
    var policeOfficers = [];
    var hoursTicketed = [];
    var isCarModified = [];

    //userObj.xxxxx is the actual key in the Firebase Database
    array.forEach(userObj => {
      policeVehicle.push(userObj.policeVehicle);
      vehicleBrand.push(userObj.carMake);
      policeOfficers.push(userObj.policeOfficer);
      hoursTicketed.push(userObj.infractionTime);
      isCarModified.push(userObj.isCarModified);
    });

    const policeVehicleList = this.getChartData(this.arraySort(policeVehicle));
    const vehicleBrandList = this.getChartData(this.arraySort(vehicleBrand));
    const policeOfficersList = this.getChartData(
      this.arraySort(policeOfficers)
    );
    const hoursTicketedList = this.getChartData(this.arraySort(hoursTicketed));
    const isCarModifiedList = this.getChartData(this.arraySort(isCarModified));

    this.setState({
      policeVehicle: policeVehicleList,
      vehicleBrand: vehicleBrandList,
      policeOfficers: policeOfficersList,
      hoursTicketed: hoursTicketedList,
      isCarModified: isCarModifiedList
    });
  };

  arraySort = array => {
    var dataArray = [];

    array.sort();

    var current = null;
    var cnt = 0;
    for (var i = 0; i < array.length; i++) {
      if (array[i] != current) {
        if (cnt > 0) {
          dataArray.push({ value: current, count: cnt });
        }
        current = array[i];
        cnt = 1;
      } else {
        cnt++;
      }
    }
    if (cnt > 0) {
      dataArray.push({ value: current, count: cnt });
    }
    return dataArray;
  };

  getChartData = sortedData => {
    //This function creates the necessary data format for charts.js.

    var labels = [];
    var data = [];

    // if (time) {
    //   labels = [
    //     "7:00AM",
    //     "8:00AM",
    //     "9:00AM",
    //     "10:00AM",
    //     "11:00AM",
    //     "12:00PM",
    //     "1:00PM",
    //     "2:00PM",
    //     "3:00PM",
    //     "4:00PM",
    //     "5:00PM",
    //     "6:00PM",
    //     "7:00PM",
    //     "8:00PM",
    //     "9:00PM",
    //     "10:00PM",
    //     "11:00PM",
    //     "12:00AM",
    //     "1:00AM",
    //     "2:00AM",
    //     "3:00AM",
    //     "4:00AM",
    //     "5:00AM",
    //     "6:00AM"
    //   ];
    //   sortedData.forEach(element => {
    //     data.push(element.count);
    //   });
    // }
    sortedData.forEach(element => {
      labels.push(element.value);
      data.push(element.count);
    });
    console.log(labels);

    // Ajax calls here

    var Data = {
      labels: labels,
      datasets: [
        {
          label: "Units",
          data: data,
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
      ],
      options: {
        title: {
          display: false
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: false
              }
            }
          ]
        }
      }
    };
    return Data;
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
                <ChartDisplay
                  vehicleBrandData={this.state.vehicleBrand}
                  policeOfficersData={this.state.policeOfficers}
                  hoursTicketedData={this.state.hoursTicketed}
                  isCarModifiedData={this.state.isCarModified}
                  policeVehicleData={this.state.policeVehicle}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
