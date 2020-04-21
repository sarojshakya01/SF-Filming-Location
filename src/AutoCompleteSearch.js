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
  }
  onTextChange = (event) => {
    const value = event.target.value.toLowerCase();
    let suggestions = [];
    const that = this;

    axios.get("/movies?title=").then(function (response) {
      // suggestions = response.data;
      for (var i = 0; i < response.data.length; i++) {
        suggestions.push(response.data[i].title);
      }

      if (value === "") {
        suggestions = suggestions;
      }

      if (value.length > 0) {
        const regex = new RegExp(value);
        suggestions = suggestions
          .sort()
          .filter((v) => regex.test(v.toLowerCase()));
      }
      that.setState(() => ({
        suggestions,
        text: value,
        searchKey: value,
      }));
    });
  };

  selectedText = (value) => {
    this.setState(() => ({
      text: value,
      searchKey: "",
      suggestions: ["empty"],
    }));
  };
  render() {
    const text = this.state.text;
    const suggestions = this.state.suggestions;
    const searchKey = this.state.searchKey;

    renderSuggestions(this, searchKey, suggestions);
    return [
      <div key={0} id="title">
        Search Filming Location
      </div>,
      <div key={1} id="search-container">
        <input
          id="search-input"
          type="text"
          placeholder="Enter a movie name"
          onChange={this.onTextChange}
          value={text}
        />
      </div>,
    ];
  }
}

export default AutoCompleteSearch;

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
