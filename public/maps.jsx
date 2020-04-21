let map;
const sanfrancisco = { lat: 37.755704, lng: -122.437344 };

let activeMarker = [];

initMap();

function getMoviesList(movie) {
  $.ajax("/movies?title=" + movie, {
    dataType: "json",
    timeout: 5000,
    success: function (data, status, xhr) {
      if (movie !== "") {
        displayMarker(data);
      }
    },
    error: function (jqXhr, textStatus, errMsg) {
      console.log("Error: " + errMsg);
    },
  });
}

$("body").on("click", ".search-item", function () {
  const movie = $(this).find("span.item").html();
  getMoviesList(movie);
});

function displayMarker(data) {
  const latlngCenter = new google.maps.LatLng(
    sanfrancisco.lat,
    sanfrancisco.lng
  );

  map.setCenter(latlngCenter);

  for (let i = 0; i < activeMarker.length; i++) {
    activeMarker[i].setMap(null);
    activeMarker.slice(i);
  }

  for (let i = 0; i < data[0].description.length; i++) {
    if (data[0].description[i].lat_lon != undefined) {
      map.setZoom(13);
      const info = data[0].description[i];

      let location = {};

      location = {
        lat: info.lat_lon.split(",")[0],
        lng: info.lat_lon.split(",")[1],
      };

      let latlngPos = new google.maps.LatLng(location.lat, location.lng);

      $("#movie-title").html("<b>Movie Title: </b>" + info.title + "<br/>");

      $("#location").html(info.locations + "<br/>");

      if (info.fun_facts !== undefined) {
        $("#fun-fact").html("<b>Fun Fact: </b>" + info.fun_facts + "<br/>");
      }

      if (info.production_company !== undefined) {
        $("#prod-comp").html(
          "<b>Production Company: </b>" + info.production_company + "<br/>"
        );
      }

      if (info.distributor !== undefined) {
        $("#distributor").html(
          "<b>Distributor: </b>" + info.distributor + "<br/>"
        );
      }

      if (info.director !== undefined) {
        $("#director").html("<b>Director: </b>" + info.director + "<br/>");
      }

      if (info.writer !== undefined) {
        $("#writer").html("<b>Writer: </b>" + info.writer + "<br/>");
      }

      if (info.actor_1 !== undefined) {
        $("#actor-1").html("<b>Actor 1: </b>" + info.actor_1 + "<br/>");
      }

      if (info.actor_1 !== undefined) {
        $("#actor-2").html("<b>Actor 2: </b>" + info.actor_2 + "<br/>");
      }

      if (info.actor_1 !== undefined) {
        $("#actor-3").html("<b>Actor 3: </b>" + info.actor_3 + "<br/>");
      }

      let infowindow = new google.maps.InfoWindow();
      let infowindowContent = $("#infowindow-content")[0];

      infowindow.setContent(infowindowContent);
      let marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29),
      });

      infowindow.close();

      activeMarker.push(marker);

      marker.setVisible(false);
      marker.setTitle(info.locations);
      marker.setPosition(latlngPos);
      marker.setVisible(true);
      marker.addListener("click", function () {
        infowindow.open(map, marker);
      });
      setTimeout(function () {
        map.setZoom(12);
      }, 2000);
    }
  }
}

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: sanfrancisco,
    zoom: 12,
  });

  var card = document.getElementById("search-card");

  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);
}