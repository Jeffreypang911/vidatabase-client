import React, { Component } from "react";
import "../styles.css";
import "react-day-picker/lib/style.css";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
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
    this.state = {};
  }

  render() {
    return (
      <div>
        <Map center={[49.22733, -123.0573]} zoom={11}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {this.props.userData &&
            this.props.userData.map((user, idx) => (
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
                    {user.instagramHandle && (
                      <div>
                        <b>Instagram: </b>
                        <a
                          href={
                            "https://www.instagram.com/" + user.instagramHandle
                          }
                        >
                          @{user.instagramHandle}
                        </a>
                      </div>
                    )}
                  </span>
                </Popup>
              </Marker>
            ))}
        </Map>
      </div>
    );
  }
}

export default MapDisplay;
