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

// const MyMarker = props => {
//   const initMarker = ref => {
//     if (ref) {
//       ref.leafletElement.openPopup();
//     }
//   };
//   return <Marker ref={initMarker} {...props} />;
// };

class MapDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      markers: [
        [49.25256306655601, -123.02442545527167],
        [49.24, -123.035],
        [49.23, -123.013]
      ]
    };
  }

  //CARLO where I fetch data from Firebase
  fetchUserData = () => {
    const UserData = [];
    const usersRef = firebase.database().ref("users/");
    usersRef.orderByChild("creationDateUnix").on("child_added", function(snap) {
      UserData.push(snap.val());
    });
    return UserData;
  };
  //CARLO was hoping below I could call set state before component mounts so data is there on time.
  componentWillMount() {
    this.setState({ userData: this.fetchUserData() });
  }
  componentDidUpdate() {
    console.log("YEEHAW");
  }

  createMarkers = () => {
    const userData = this.state.userData;
    console.log(userData);
    //why is this empty????!??!?!?!?
    return (
      this.state.userData &&
      this.state.markers.map((position, idx) => (
        <Marker key={`marker-${idx}`} position={position}>
          <Popup>
            <span>
              A pretty CSS3 popuppp. <br /> Easily customizable.
              {position}
            </span>
          </Popup>
        </Marker>
      ))
    );
  };

  componentWillUpdate() {}

  render() {
    //CARLO this below logs out an empty array then the data will come in after. But it doesn't call a rerender of the new data.
    console.log("rendering...", this.state.userData);

    // const userData = this.state.userData;
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
                  {this.state.userData[0] &&
                    this.state.markers.map((position, idx) => (
                      <Marker key={`marker-${idx}`} position={position}>
                        <Popup>
                          <span>
                            A pretty CSS3 popuppp. <br /> Easily customizable.
                            {position}
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
