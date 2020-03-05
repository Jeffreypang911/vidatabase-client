import React, { Component } from "react";
import "react-inputs-validation/lib/react-inputs-validation.min.css";
import "./styles.css";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import firebase from "firebase";
import {
  Textbox,
  Textarea,
  Radiobox,
  Checkbox,
  Select
} from "react-inputs-validation";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

const MyMarker = props => {
  const initMarker = ref => {
    if (ref) {
      ref.leafletElement.openPopup();
    }
  };
  return <Marker ref={initMarker} {...props} />;
};

class MapDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 51.505,
      lng: -0.09,
      zoom: 13,

      firstName: "",
      lastName: "",
      ticketNumber: "",
      carYear: "",
      carMake: "",
      carDescription: "",
      infractionType: "",
      policeOfficer: "",
      policeVehicle: "",
      policeAgression: "",
      isBrakesChecked: false,
      isCouplingDevicesChecked: false,
      isExhaustChecked: false,
      isFuelSystemChecked: false,
      isLightsChecked: false,
      isLoadSecurityChecked: false,
      isSuspensionChecked: false,
      isTiresChecked: false,
      isWheelsRimsChecked: false,
      isWipersChecked: false,
      isOtherChecked: false,
      infractionDate: undefined,
      infractionTime: undefined,
      incidentDescription: "",
      currentPos: "",
      instagramHandle: "",
      hasFirstNameError: true,
      hasLastNameError: true,
      hasTicketNumberError: true,
      hasCarYearError: true,
      hasCarMakeError: true,
      hasInfractionTypeError: true,
      hasPoliceOfficerError: true,
      hasPoliceVehicleError: true,
      hasPoliceAgressionError: true,
      hasMeasuringEquipmentError: true,
      validate: false
    };
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({ currentPos: e.latlng });
  }
  handleDayChange(day) {
    this.setState({ infractionDate: day });
  }

  toggleValidating(validate) {
    this.setState({ validate });
  }

  render() {
    const userData = firebase.database().ref("users/");
    const usersRef = firebase.database().ref("users/");
    console.log("_+_+_+_+__+_+__+_++_+", usersRef.toString());
    usersRef.orderByChild("carYear").on("child_added", function(snap) {
      console.log(snap.val().currentPos);
    });

    const {} = this.state;
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
                <Map
                  center={[49.25, -123.1]}
                  zoom={12}
                  onClick={this.handleClick}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <MyMarker position={[49.25, -123.1]}>
                    {/* <Popup position={this.state.currentPos}>
                        <b>VI Location:</b>
                        <br></br>
                        Latatude:{" "}
                        {JSON.stringify(this.state.currentPos.lat, null, 2)},
                        <br></br>
                        Longitude:{" "}
                        {JSON.stringify(this.state.currentPos.lng, null, 2)}
                      </Popup> */}
                  </MyMarker>
                </Map>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MapDisplay;
