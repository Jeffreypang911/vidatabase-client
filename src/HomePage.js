import React, { Component } from "react";
import "react-inputs-validation/lib/react-inputs-validation.min.css";
import "./styles.css";
import "react-day-picker/lib/style.css";
import firebase from "firebase";
import L from "leaflet";
import MapDisplay from "./Components/MapDisplay";
import ChartDisplay from "./Components/ChartDisplay";
import {
  DEFAULT_VALUES_TIME,
  TIME_LIST,
  INFRACTION_TYPE,
  DEFAULT_VALUES_INFRACTION,
  INFRACTION_LABLES
} from "./consts";

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
    //userObj.xxxxx is the actual key in the Firebase Database
    array.forEach(userObj => {
      policeVehicle.push(userObj.policeVehicle);
      vehicleBrand.push(userObj.carMake);
      policeOfficers.push(userObj.policeOfficer);
      hoursTicketed.push(userObj.infractionTime);
      isCarModified.push(userObj.isCarModified);

      for (const property in userObj.violations) {
        if (userObj.violations[property] === true) {
          violationTypes.push(property);
        }
      }
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
    console.log("violationTypesList", violationTypesList);
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
      if (array[i] !== current) {
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
    //the time of day, since charts.js just hides the bar if it has no value. The function checks if
    //it is the time data, then will change 0 count to the data count based on index.
    if (sortedData[1].value.toString().includes(":00")) {
      labels = TIME_LIST;
      data = DEFAULT_VALUES_TIME;
      sortedData.forEach(arg1 => {
        labels.forEach(arg2 => {
          if (arg1.value === arg2) {
            const index = labels.indexOf(arg2);
            data[index] = arg1.count;
          }
        });
      });
    } else if (sortedData[1].value.toString().includes("Checked")) {
      //So this is the same as above but even more complicated because I can use the default key "isBrakesChecked"
      //as the displayed lable so I have to sort through all the infraction types, match them up with the INFRACTION_TYPE
      //array to find the index, then actually reset labels to a INFRACTION_LABLES to get the lables I actually want to
      //display on the screen.
      labels = INFRACTION_TYPE;
      data = DEFAULT_VALUES_INFRACTION;
      sortedData.forEach(arg1 => {
        labels.forEach(arg2 => {
          if (arg1.value === arg2) {
            const index = labels.indexOf(arg2);
            data[index] = arg1.count;
          }
        });
      });
      labels = INFRACTION_LABLES;
    } else {
      sortedData.forEach(element => {
        labels.push(element.value);
        data.push(element.count);
      });
    }
    var Data = {
      labels: labels,
      datasets: [
        {
          label: "Ticked People",
          data: data,
          backgroundColor: [
            // "rgba(255, 99, 132, 0.5)",
            // "rgba(54, 162, 235, 0.5)",
            // "rgba(255, 206, 86, 0.5)",
            // "rgba(75, 192, 192, 0.5)",
            // "rgba(153, 102, 255, 0.5)",
            // "rgba(255, 159, 64, 0.5)",

            // "rgba(226, 150, 146, 0.8)",
            // "rgba(238, 200, 169, 0.8)",
            // "rgba(245, 239, 208, 0.8)",
            // "rgba(158, 219, 193, 0.8)",
            // "rgba(172, 206, 219, 0.8)",
            // "rgba(200, 190, 212, 0.8)",
            // "rgba(209, 209, 209, 0.8)",

            "rgba(221, 236, 203, 0.7)",
            "rgba(180, 221, 204, 0.7)",
            "rgba(141, 205, 206, 0.7)",
            "rgba(102, 190, 209, 0.7)",
            "rgba(75, 171, 204, 0.7)",
            "rgba(66, 146, 188, 0.7)",
            "rgba(57, 120, 172, 0.7)",
            "rgba(48, 96, 156, 0.7)",
            "rgba(38, 70, 140, 0.7)",
            "rgba(29, 46, 125, 0.7)",
            "rgba(23, 35, 100, 0.7)",
            "rgba(17, 35, 74, 0.7)",
            "rgba(9, 15, 49, 0.7)",
            "rgba(0, 0, 0, 0.7)",
            "rgba(9, 15, 49, 0.7)",
            "rgba(17, 35, 74, 0.7)",
            "rgba(23, 35, 100, 0.7)",
            "rgba(29, 46, 125, 0.7)",
            "rgba(38, 70, 140, 0.7)",
            "rgba(48, 96, 156, 0.7)",
            "rgba(57, 120, 172, 0.7)",
            "rgba(66, 146, 188, 0.7)",
            "rgba(75, 171, 204, 0.7)",
            "rgba(102, 190, 209, 0.7)",
            "rgba(141, 205, 206, 0.7)",
            "rgba(180, 221, 204, 0.7)",
            "rgba(221, 236, 203, 0.7)"
          ]
        }
      ],
      options: {}
    };
    return Data;
  };

  render() {
    // const rowStyle = {
    //   display: "flex",
    //   alignItems: "flex-start",
    //   justifyContent: "space-between",
    //   padding: "2%",
    //   fontSize: "14px"
    // };
    // const rowWrapperStyle = {
    //   display: "table",
    //   width: "100%"
    // };
    // const rowContainerStyle = {
    //   display: "table-cell",
    //   verticalAlign: "middle",
    //   borderBottom: "1px solid #e5e5e5"
    // };

    const titleStyle = {
      margin: "1px",
      paddingTop: "40px",
      paddingBottom: "10px",
      fontSize: "25px",
      fontFamily: "Arial, Helvetica, sans-serif",
      fontWeight: "bold",
      color: "#5c5c5c",
      textAlign: "center"
    };

    const forumBackground = {
      backgroundColor: "white",
      padding: "3%"
    };

    return (
      <div className="chartdisplayborder">
        <div style={forumBackground}>
          <h1 style={titleStyle}>Locations of VI Infractions in Vancouver</h1>
          <div style={{}}>
            <link
              rel="stylesheet"
              href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
            />
            <MapDisplay userData={this.state.userData} />
          </div>
          <div style={{}}>
            <ChartDisplay
              vehicleBrandData={this.state.vehicleBrand}
              policeOfficersData={this.state.policeOfficers}
              hoursTicketedData={this.state.hoursTicketed}
              isCarModifiedData={this.state.isCarModified}
              policeVehicleData={this.state.policeVehicle}
              violationTypes={this.state.violationTypes}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
