import React from "react";
import ReactDOM from "react-dom";
import AutoCompleteSearch from "./AutoCompleteSearch";
import InfoWindow from "./InfoWindow";

ReactDOM.render(<AutoCompleteSearch />, document.getElementById("search-card"));
ReactDOM.render(<InfoWindow />, document.getElementById("infowindow-content"));
