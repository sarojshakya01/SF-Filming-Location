import React from "react";

class Marker extends React.Component {
  rendorMarker() {
    const {
      map,
      maps,
      infoWindow,
      movieName,
      data,
      collectActiveMarkers,
    } = this.props;

    for (let i = 0; i < 1; i++) {
      if (data.lat_lon === undefined) {
        alert("Location not available.");
        break;
      }

      document.getElementById("info-title").innerHTML = movieName;
      document.getElementById("info-location").innerHTML = data.locations;
      document.getElementById("info-fun-fact").innerHTML =
        data.funfact === undefined ? "" : data.funfact;
      document.getElementById("info-prod-comp").innerHTML =
        data.prodcomp === undefined ? "" : data.prodcomp;
      document.getElementById("info-distributor").innerHTML =
        data.distributor === undefined ? "" : data.distributor;
      document.getElementById("info-director").innerHTML =
        data.director === undefined ? "" : data.director;
      document.getElementById("info-writer").innerHTML =
        data.writer === undefined ? "" : data.writer;
      document.getElementById("info-actor-1").innerHTML =
        data.actor_1 === undefined ? "" : data.actor_1;
      document.getElementById("info-actor-2").innerHTML =
        data.actor_2 === undefined ? "" : data.actor_2;
      document.getElementById("info-actor-3").innerHTML =
        data.actor_3 === undefined ? "" : data.actor_3;

      const infoWindowContent = document.getElementById("infowindow-content");

      let marker = new maps.Marker({
        position: {
          lat: parseFloat(data.lat_lon.split(",")[0]),
          lng: parseFloat(data.lat_lon.split(",")[1]),
        },
        map: map,
        title: data.locations,
        infoWindowContent: infoWindowContent,
      });

      collectActiveMarkers(marker);

      marker.addListener("click", () => {
        infoWindow.setContent(marker.infoWindowContent);
        infoWindow.open(map, marker);
      });
      infoWindow.addListener("closeclick", () => {
        document.getElementById("root").appendChild(marker.infoWindowContent);
      });

      //   document.getElementById("suggestion").addEventListener("click", () => {
      //     marker.setMap(null);
      //   });
    }
  }

  render() {
    return <>{this.rendorMarker()}</>;
  }
}

export default Marker;
