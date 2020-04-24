import React from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";

const mapStyle = {
  width: "100%",
  height: "100%",
};

const SanFrancisco = { lat: 37.755704, lng: -122.437344 };

class GoogleMap extends React.Component {
  constructor(props) {
    super(props);
    // this.KEY = "mykey";
    this.KEY = "AIzaSyBrX6PgieG65DkgD9G0CYPYcG7Uk2YK4nM";
    this.center = SanFrancisco;
    this.zoom = 12;
    this.activeMarkers = [];
    this.state = {
      activeMarkers: [],
      movieLocationInfo: [],
    };
  }

  onGoogleApiLoaded = ({ map, maps }) => {
    this.map = map;
    this.maps = maps;
    this.infoWindow = new maps.InfoWindow();
  };

  collectActiveMarkers = (data) => {
    this.activeMarkers.push(data);
  };

  selectLocation = (data) => {
    this.setState({ movieLocationInfo: data });
  };

  render() {
    return (
      <>
        <div id="map">
          <div style={mapStyle}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: this.KEY, libraries: "places" }}
              onGoogleApiLoaded={this.onGoogleApiLoaded}
              defaultCenter={this.center}
              defaultZoom={this.zoom}
            />
            {this.props.movie[0] === undefined ? null : (
              <>
                <Marker
                  key={0}
                  map={this.map}
                  maps={this.maps}
                  infoWindow={this.infoWindow}
                  movieName={this.props.movie}
                  data={this.props.data}
                  activeMarkers={this.activeMarkers}
                  collectActiveMarkers={this.collectActiveMarkers}
                  //   selectLocation={this.selectLocation}
                />
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default GoogleMap;
