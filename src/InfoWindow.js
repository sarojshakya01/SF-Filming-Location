import React from "react";

function InfoWindow() {
  return [
    <span key={1} id="movie-title" className="title"></span>,
    <img key={2} id="place-icon" src="/img/map.png" width="16" height="16" />,
    <span key={3} id="location" className="title"></span>,
    <span key={4} id="fun-fact"></span>,
    <span key={5} id="prod-comp"></span>,
    <span key={6} id="distributor"></span>,
    <span key={7} id="director"></span>,
    <span key={8} id="writer"></span>,
    <span key={9} id="actor-1"></span>,
    <span key={10} id="actor-2"></span>,
    <span key={11} id="actor-3"></span>,
  ];
}

export default InfoWindow;
