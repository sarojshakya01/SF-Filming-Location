import React from "react";
import axios from "axios";
import Suggestion from "./Suggestion";

class AutoCompleteSearch extends React.Component {
  constructor(props) {
    super(props);
    this.allMovieList = [];
    this.suggestions = ["empty"];
    this.state = {
      isDataFetched: false,
      text: "",
      searchKey: "",
    };
  }

  componentDidMount = () => {
    let allMovieList = [];
    const that = this;

    axios.get("http://localhost:3001/movies?title=").then(function (response) {
      for (var i = 0; i < response.data.length; i++) {
        allMovieList.push(response.data[i].title);
      }
      that.allMovieList = allMovieList;
      that.suggestions = ["empty"];
      that.setState(() => ({
        isDataFetched: true,
      }));
    });
    document.addEventListener("keydown", this.onEscape, false);
  };

  componentWillUnmount = () => {
    document.removeEventListener("keydown", this.onEscape, false);
  };

  onEscape = (event) => {
    if (event.keyCode === 27) {
      this.suggestions = ["empty"];
      // esc key pressed
      this.setState(() => ({
        text: "",
        searchKey: "",
      }));
    }
  };

  onBlurInput = (elem) => {
    this.suggestions = ["empty"];
    this.setState(() => ({
      text: "",
      searchKey: "",
    }));
  };

  onFocusLoadList = (elem) => {
    const value = elem.target.value.toLowerCase();
    let suggestions = [];

    if (value === "") {
      suggestions = this.allMovieList;
    } else if (value.length > 0) {
      const regex = new RegExp(value);
      suggestions = this.allMovieList
        .sort()
        .filter((v) => regex.test(v.toLowerCase()));
    }

    this.suggestions = suggestions;
    this.setState(() => ({
      text: value,
      searchKey: value,
    }));
  };

  onFocusSendRequestAndLoadList = (elem) => {
    const value = elem.target.value.toLowerCase();
    let suggestions = [];
    let allMovieList = [];
    const that = this;

    axios.get("http://localhost:3001/movies?title=").then(function (response) {
      for (var i = 0; i < response.data.length; i++) {
        allMovieList.push(response.data[i].title);
      }

      if (value === "") {
        suggestions = allMovieList;
      } else if (value.length > 0) {
        const regex = new RegExp(value);
        suggestions = allMovieList
          .sort()
          .filter((v) => regex.test(v.toLowerCase()));
      }

      that.allMovieList = allMovieList;
      that.suggestions = suggestions;
      that.setState(() => ({
        text: value,
        searchKey: value,
      }));
    });
  };

  onTextChange = (elem) => {
    const value = elem.target.value.toLowerCase();
    let suggestions = this.allMovieList;

    if (value.length > 0) {
      const regex = new RegExp(value);
      suggestions = suggestions
        .sort()
        .filter((v) => regex.test(v.toLowerCase()));
    }

    this.suggestions = suggestions;
    this.setState(() => ({
      text: value,
      searchKey: value,
    }));
  };

  selectedText = (value) => {
    this.suggestions = ["empty"];
    this.setState(() => ({
      isDataFetched: false,
      text: value,
      searchKey: "",
    }));

    const that = this;
    axios
      .get("http://localhost:3001/movies?title=" + value)
      .then(function (response) {
        that.props.selectMovie(response.data);
        that.setState(() => ({
          isDataFetched: true,
        }));
      });
  };

  // function to render the suggestions
  renderSuggestions() {
    return (
      <Suggestion
        suggestions={this.suggestions}
        searchKey={this.state.searchKey}
        selectedText={this.selectedText}
      />
    );
  }

  render() {
    const text = this.state.text;

    return this.state.isDataFetched ? (
      <div id="search-card" className="search-card">
        <div key={0} id="title" onClick={this.onBlurInput}>
          Search Filming Location
        </div>
        <div key={1} id="search-container">
          <input
            id="search-input"
            type="text"
            placeholder="Enter a movie name"
            onFocus={this.onFocusLoadList}
            // onFocus={this.onFocusSendRequestAndLoadList}
            onChange={this.onTextChange}
            value={text}
          />
          {this.renderSuggestions()}
        </div>
      </div>
    ) : (
      <div id="loader" className="background">
        <div className="dots container">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }
}

export default AutoCompleteSearch;
