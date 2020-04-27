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
    this.KEY = "<GOOGLE_MAP_API_KEY>";
    this.center = SanFrancisco;
    this.zoom = 12;
    this.activeMarkers = [];
  }

  componentDidMount = () => {
    // this.zoom = 13;
  };

  onGoogleApiLoaded = ({ map, maps }) => {
    this.map = map;
    this.maps = maps;
    this.infoWindow = new maps.InfoWindow();
  };

  collectActiveMarkers = (data) => {
    this.activeMarkers.push(data);
  };

  removeMarkers() {
    for (let i = 0; i < this.activeMarkers.length; i++) {
      this.activeMarkers[i].setMap(null);
      this.activeMarkers.splice(i);
    }
  }

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
            {this.props.movie[0] === undefined
              ? null
              : this.props.data[0].lat_lon === undefined
              ? null
              : this.props.data.map((data, index) => (
                  <Marker
                    key={index}
                    map={this.map}
                    maps={this.maps}
                    infoWindow={this.infoWindow}
                    movieName={this.props.movie}
                    data={data}
                    collectActiveMarkers={this.collectActiveMarkers}
                  />
                ))}
          </div>
        </div>
      </>
    );
  }
}

export default GoogleMap;
