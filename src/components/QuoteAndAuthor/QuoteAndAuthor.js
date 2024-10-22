import React from "react";
import PropTypes from "prop-types";

import "./QuoteAndAuthor.css";

export default function QuoteAndAuthor({quote, author, color, fadeClass}) {
  return (
    <div
      style={{
        border: `1px dashed ${color}`,
        padding: "20px",
        borderRadius: "20px",
      }}
    >
      <div className={`quote-text ${fadeClass}`} style={{color}}>
        <i className="fa fa-quote-left"></i>
        <span id="text">{quote}</span>
      </div>
      <div className={`quote-author ${fadeClass}`} style={{color}}>
        {author && <span id="author">- {author}</span>}
      </div>
    </div>
  );
}

QuoteAndAuthor.propTypes = {
  quote: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  fadeClass: PropTypes.string.isRequired,
};
