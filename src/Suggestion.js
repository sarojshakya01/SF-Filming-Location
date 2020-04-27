import React from "react";

const Suggestion = (props) => {
  const { suggestions, searchKey, selectedText } = props;

  if (
    suggestions === undefined ||
    (suggestions.length === 1 && suggestions[0] === "empty")
  ) {
    return null;
  } else {
    return (
      <div id="suggestion" className="search-container search-logo">
        {suggestions.map((item, index) => (
          <div
            key={index}
            className="search-item"
            onClick={() => {
              selectedText(item);
            }}
          >
            <span className="search-icon"></span>
            <span className="search-item-query">
              <span className="search-matched">{searchKey}</span>
            </span>
            {" - "}
            <span className="item">{item}</span>
          </div>
        ))}

        <div key={"count"} className="search-item total-records">
          <span>Found {suggestions.length} records.</span>
        </div>
      </div>
    );
  }
};

export default Suggestion;
