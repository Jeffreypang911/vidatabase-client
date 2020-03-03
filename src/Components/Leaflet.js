import React from "react";
const ReactLeaflet = { Map: LeafletMap, TileLayer, Marker, Popup };

class Map extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: 31.80314,
      lng: 35.212973,
      zoom: 15
    };
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <LeafletMap center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </LeafletMap>
    );
  }
}

export default Map;
