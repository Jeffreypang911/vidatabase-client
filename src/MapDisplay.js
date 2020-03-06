import React, { Component } from "react";
import "react-inputs-validation/lib/react-inputs-validation.min.css";
import "./styles.css";
import "react-day-picker/lib/style.css";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import firebase from "firebase";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

class MapDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: []
    };
  }

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
                <Map center={[49.25, -123.1]} zoom={12}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {this.state.userData &&
                    this.state.userData.map((user, idx) => (
                      <Marker key={`marker-${idx}`} position={user.currentPos}>
                        <Popup>
                          <span>
                            <b>Name: </b> {user.firstName} {user.lastName}
                            <br />
                            <b>Vehicle: </b> {user.carYear} {user.carMake}
                            <br />
                            <b>Vehicle Description: </b> {user.carDescription}
                            <br />
                            <b>Violation Type: </b> {user.infractionType}
                            <br />
                            <b>Police Officer: </b> {user.policeOfficer}
                            <br />
                            <b>Incident Description: </b>
                            {user.incidentDescription}
                            <br />
                            <b>Instagram: </b>
                            <a
                              href={
                                "https://www.instagram.com/" +
                                user.instagramHandle
                              }
                            >
                              @{user.instagramHandle}
                            </a>
                          </span>
                        </Popup>
                      </Marker>
                    ))}
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
