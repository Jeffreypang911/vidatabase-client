import React, { Component } from "react";
import "react-inputs-validation/lib/react-inputs-validation.min.css";
import "./styles.css";
import "react-day-picker/lib/style.css";
// import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import firebase from "firebase";
import L from "leaflet";
import MapDisplay from "./Components/MapDisplay";
import ChartDisplay from "./Components/ChartDisplay";
import { DEFAULT_ZERO, TIME_LIST } from "./consts";

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
      violationTypes: []
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
    var violationTypes = [];
    var violationCount = [
      { value: "isBrakesChecked", count: 0 },
      { value: "isCouplingDevicesChecked", count: 0 },
      { value: "isExhaustChecked", count: 0 },
      { value: "isFuelSystemChecked", count: 0 },
      { value: "isLightsChecked", count: 0 },
      { value: "isLoadSecurityChecked", count: 0 },
      { value: "isLoadSecurityChecked", count: 0 },
      { value: "isLoadSecurityChecked", count: 0 },
      { value: "isLoadSecurityChecked", count: 0 }
    ];
    //userObj.xxxxx is the actual key in the Firebase Database
    array.forEach(userObj => {
      policeVehicle.push(userObj.policeVehicle);
      vehicleBrand.push(userObj.carMake);
      policeOfficers.push(userObj.policeOfficer);
      hoursTicketed.push(userObj.infractionTime);
      isCarModified.push(userObj.isCarModified);
      // console.log(userObj.violations);

      for (const property in userObj.violations) {
        if (userObj.violations[property] === true) {
          // violationCount.forEach(obj => {
          //   if (obj.value === property) {
          console.log("YOOOOdd", property);

          violationTypes.push(property);
          // violationCount[index]
          // obj.count
          //   }
          // });
          // console.log("LOLOL", property);
        }
        // console.log(`${property}: ${userObj.violations[property]}`);
      }
      console.log("violationTypes", violationTypes);
    });

    const policeVehicleList = this.getChartData(this.arraySort(policeVehicle));
    const vehicleBrandList = this.getChartData(this.arraySort(vehicleBrand));
    const policeOfficersList = this.getChartData(
      this.arraySort(policeOfficers)
    );
    const violationTypesList = this.getChartData(
      this.arraySort(violationTypes)
    );
    const hoursTicketedList = this.getChartData(this.arraySort(hoursTicketed));
    const isCarModifiedList = this.getChartData(this.arraySort(isCarModified));

    this.setState({
      policeVehicle: policeVehicleList,
      vehicleBrand: vehicleBrandList,
      policeOfficers: policeOfficersList,
      hoursTicketed: hoursTicketedList,
      isCarModified: isCarModifiedList,
      violationTypes: violationTypesList
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
    //This is confusing but it is so we can display a default value of 0 people for
    //the time of day, since charts.js does not do this automatically. The function checks if
    //it is the time data, then will change 0 count to the data count based on index.
    if (sortedData[1].value.toString().includes(":00")) {
      var labels = TIME_LIST;
      var data = DEFAULT_ZERO;
      sortedData.forEach(arg1 => {
        labels.forEach(arg2 => {
          if (arg1.value === arg2) {
            const index = labels.indexOf(arg2);
            data[index] = arg1.count;
          }
        });
      });
    } else {
      sortedData.forEach(element => {
        labels.push(element.value);
        data.push(element.count);
      });
    }
    console.log(labels);

    // Ajax calls here

    var Data = {
      labels: labels,
      datasets: [
        {
          label: "Ticked People",
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
        <h1>Locations of VI Infractions in Vancouver</h1>
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
                  violationTypes={this.state.violationTypes}
                  violationTypes={this.state.violationTypes}
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
