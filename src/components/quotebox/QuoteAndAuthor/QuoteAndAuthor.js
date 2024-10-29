import React, {memo} from "react";
import PropTypes from "prop-types";

import "./QuoteAndAuthor.css";

const DEFAULT_TEXT_IF_CATEGORIES_NOT_ADDED = "Please add categories for getting random quote!"

const QuoteAndAuthor = memo(
  function QuoteAndAuthor({quote, styleTheme}) {
    const {color, fade} = styleTheme;
    return (
      <div
        style={{
          border: `1px dashed ${color}`,
          padding: "20px",
          borderRadius: "20px",
        }}
      >
        <div className={`quote-text ${fade ? "fade-out" : "fade-in"}`} style={{color: color}}>
          <i className="fa fa-quote-left"></i>
          <span id="text">{quote.quote || DEFAULT_TEXT_IF_CATEGORIES_NOT_ADDED}</span>
        </div>
        <div className={`quote-author ${fade ? "fade-out" : "fade-in"}`} style={{color: color}}>
          {quote.author && <span id="author">- {quote.author}</span>}
        </div>
      </div>
    );
  }
);

QuoteAndAuthor.propTypes = {
  quote: PropTypes.object.isRequired,
  styleTheme: PropTypes.object.isRequired
};

export default QuoteAndAuthor;