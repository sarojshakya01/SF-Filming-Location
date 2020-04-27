import React from "react";

const InfoWindow = (props) => {
  const movieName = props.movieName === undefined ? "" : props.movieName;

  const info =
    props.data === undefined
      ? {
          locations: "",
          funfact: "",
          prodcomp: "",
          distributor: "",
          director: "",
          writer: "",
          actor_1: "",
          actor_2: "",
          actor_3: "",
        }
      : props.data;

  return (
    <div id="infowindow-content">
      <img
        id="place-icon"
        src="/img/map.png"
        alt="place"
        width="16"
        height="16"
      />
      <span id="location" className="title">
        <span id="info-location">{info.locations}</span>
      </span>
      <br />
      <span id="movie-title">
        Movie Title:{" "}
        <span id="info-title" className="title">
          {movieName}
        </span>
      </span>
      <br />
      <span id="fun-fact">
        Fun Fact: <span id="info-fun-fact">{info.funfact}</span>
      </span>
      <br />
      <span id="prod-comp">
        Production Company: <span id="info-prod-comp">{info.prodcomp}</span>
      </span>
      <br />
      <span id="distributor">
        Distributor: <span id="info-distributor">{info.distributor}</span>
      </span>
      <br />
      <span id="director">
        Director: <span id="info-director">{info.director}</span>
      </span>
      <br />
      <span id="writer">
        Writer: <span id="info-writer">{info.writer}</span>
      </span>
      <br />
      <span id="actor-1">
        Actor 1: <span id="info-actor-1">{info.actor_1}</span>
      </span>
      <br />
      <span id="actor-2">
        Actor 2: <span id="info-actor-2">{info.actor_2}</span>
      </span>
      <br />
      <span id="actor-3">
        Actor 3: <span id="info-actor-3">{info.actor_3}</span>
      </span>
      <br />
    </div>
  );
};

export default InfoWindow;
