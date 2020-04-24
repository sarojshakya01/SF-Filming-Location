import React from "react";
import GoogleMap from "./GoogleMap";
import AutoCompleteSearch from "./AutoCompleteSearch";
import InfoWindow from "./InfoWindow";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDataFetched: false,
      movie: [],
      movieInfo: [],
    };
  }

  selectMovie = (data) => {
    this.setState({ movie: data[0].title, movieInfo: data[0].description });
  };

  render() {
    return (
      <>
        <GoogleMap
          movie={this.state.movie}
          data={this.state.movieInfo}
          selectLocation={this.selectLocation}
        />
        <AutoCompleteSearch selectMovie={this.selectMovie} />
        <InfoWindow
          movieName={this.state.movie}
          data={this.state.movieInfo[0]}
        />
      </>
    );
  }
}

export default App;
