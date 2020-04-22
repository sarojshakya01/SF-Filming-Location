import React from "react";
import axios from "axios";

class AutoCompleteSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      text: "",
      searchKey: "",
    };
    this.onEscape = this.onEscape.bind(this);
  }

  onEscape(event) {
    if (event.keyCode === 27) {
      // esc key pressed
      this.setState(() => ({
        text: "",
        searchKey: "",
        suggestions: ["empty"],
      }));
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.onEscape, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onEscape, false);
  }

  onBlurInput = (elem) => {
    this.setState(() => ({
      text: "",
      searchKey: "",
      suggestions: ["empty"],
      allMovieList: [],
    }));
  };

  onFocusInput = (elem) => {
    const value = elem.target.value.toLowerCase();
    let suggestions = [];
    let allMovieList = [];
    const that = this;

    axios.get("/movies?title=").then(function (response) {
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

      that.setState(() => ({
        allMovieList: allMovieList,
        suggestions: suggestions,
        text: value,
        searchKey: value,
      }));
    });
  };

  onTextChange = (elem) => {
    const value = elem.target.value.toLowerCase();
    let suggestions = this.state.allMovieList;

    if (value.length > 0) {
      const regex = new RegExp(value);
      suggestions = suggestions
        .sort()
        .filter((v) => regex.test(v.toLowerCase()));
    }

    this.setState(() => ({
      suggestions: suggestions,
      text: value,
      searchKey: value,
    }));
  };

  selectedText = (value) => {
    this.setState(() => ({
      text: value,
      searchKey: "",
      allMovieList: [],
      suggestions: ["empty"],
    }));
  };

  render() {
    const text = this.state.text;
    const suggestions = this.state.suggestions;
    const searchKey = this.state.searchKey;

    renderSuggestions(this, searchKey, suggestions);
    return [
      <div key={0} id="title" onClick={this.onBlurInput}>
        Search Filming Location
      </div>,
      <div key={1} id="search-container">
        <input
          id="search-input"
          type="text"
          placeholder="Enter a movie name"
          onFocus={this.onFocusInput}
          onChange={this.onTextChange}
          value={text}
        />
      </div>,
    ];
  }
}

export default AutoCompleteSearch;

// function to render the suggestions
function renderSuggestions(comp, searchKey, suggestions) {
  let Suggestions;

  if (suggestions.length === 1 && suggestions[0] === "empty") {
    Suggestions = <div></div>;
  } else {
    const inputFieldXY = getPosition(document.getElementById("search-input"));
    const xpos = inputFieldXY.x.toString() + "px";
    const ypos = (inputFieldXY.y + 20).toString() + "px";
    let yposTotRec = (inputFieldXY.y + 20 + 310).toString() + "px";

    if (suggestions.length === 0) {
      yposTotRec = (inputFieldXY.y + 20).toString() + "px";
    } else if (suggestions.length < 10) {
      yposTotRec =
        (inputFieldXY.y + 20 + 31 * suggestions.length).toString() + "px";
    }

    const style = {
      left: xpos,
      top: ypos,
      display: "block",
    };

    const styleTotRecords = { left: xpos, top: yposTotRec };

    Suggestions = (
      <div className="search-container search-logo" style={style}>
        {suggestions.map((item, index) => (
          <div
            key={index}
            className="search-item"
            onClick={() => comp.selectedText(item)}
          >
            <span className="search-icon"></span>
            <span className="search-item-query">
              <span className="search-matched">{searchKey}</span>
            </span>
            {" - "}
            <span className="item">{item}</span>
          </div>
        ))}

        <div
          key={"count"}
          className="search-item total-records"
          style={styleTotRecords}
        >
          <span>Found {suggestions.length} records.</span>
        </div>
      </div>
    );
  }

  if (document.getElementById("suggestion") != null) {
    ReactDOM.render(Suggestions, document.getElementById("suggestion"));
  }
}

// function to get x and y position of element
function getPosition(element) {
  let xPosition = 0;
  let yPosition = 0;

  while (element) {
    xPosition += element.offsetLeft - element.scrollLeft + element.clientLeft;
    yPosition += element.offsetTop - element.scrollTop + element.clientTop;
    element = element.offsetParent;
  }

  return { x: xPosition, y: yPosition };
}
