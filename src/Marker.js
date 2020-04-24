import React from "react";

class Marker extends React.Component {
  rendorMarker() {
    const {
      map,
      maps,
      infoWindow,
      movieName,
      data,
      activeMarkers,
      collectActiveMarkers,
      selectLocation,
    } = this.props;

    for (let i = 0; i < activeMarkers.length; i++) {
      activeMarkers[i].setMap(null);
      activeMarkers.splice(i);
    }

    for (let i = 0; i < data.length; i++) {
      if (data[i].lat_lon === undefined) {
        alert("Location not available.");
        break;
      }

      //   selectLocation(data[i]);

      document.getElementById("info-title").innerHTML = movieName;
      document.getElementById("info-location").innerHTML = data[i].locations;
      document.getElementById("info-fun-fact").innerHTML =
        data[i].funfact === undefined ? "" : data[i].funfact;
      document.getElementById("info-prod-comp").innerHTML =
        data[i].prodcomp === undefined ? "" : data[i].prodcomp;
      document.getElementById("info-distributor").innerHTML =
        data[i].distributor === undefined ? "" : data[i].distributor;
      document.getElementById("info-director").innerHTML =
        data[i].director === undefined ? "" : data[i].director;
      document.getElementById("info-writer").innerHTML =
        data[i].writer === undefined ? "" : data[i].writer;
      document.getElementById("info-actor-1").innerHTML =
        data[i].actor_1 === undefined ? "" : data[i].actor_1;
      document.getElementById("info-actor-2").innerHTML =
        data[i].actor_2 === undefined ? "" : data[i].actor_2;
      document.getElementById("info-actor-3").innerHTML =
        data[i].actor_3 === undefined ? "" : data[i].actor_3;

      const infoWindowContent = document.getElementById("infowindow-content");

      let marker = new maps.Marker({
        position: {
          lat: parseFloat(data[i].lat_lon.split(",")[0]),
          lng: parseFloat(data[i].lat_lon.split(",")[1]),
        },
        map: map,
        title: data[i].locations,
        infoWindowContent: infoWindowContent,
      });

      collectActiveMarkers(marker);

      marker.addListener("click", () => {
        infoWindow.setContent(marker.infoWindowContent);
        infoWindow.open(map, marker);
        // document.body.appendChild(infoWindowContent);
      });
    }
  }

  render() {
    return <>{this.rendorMarker()}</>;
  }
}

export default Marker;
