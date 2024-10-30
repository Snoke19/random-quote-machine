import React, {memo} from "react";
import PropTypes from "prop-types";

import "./QuoteAndAuthor.css";

const DEFAULT_MESSAGE = "Please add categories to get a random quote!"

const QuoteAndAuthor = memo(
  function QuoteAndAuthor({quote, theme}) {
    const {color, fade} = theme;
    const hasQuote = Boolean(quote?.quote);

    return (
      <div
        className="quote-container"
        style={{
          border: `1px dashed ${color}`,
          padding: "20px",
          borderRadius: "20px",
        }}
      >
        <div className={`quote-text ${fade ? "fade-out" : "fade-in"}`} style={{color: color}}>
          <i className="fa fa-quote-left"></i>
          <span id="text">{hasQuote ? quote.quote : DEFAULT_MESSAGE}</span>
        </div>
        {hasQuote && (
          <div className={`quote-author ${fade ? "fade-out" : "fade-in"}`} style={{color: color}}>
            <span id="author">- {quote.author}</span>
          </div>
        )}
      </div>
    );
  }
);

QuoteAndAuthor.propTypes = {
  quote: PropTypes.shape({
    quote: PropTypes.string,
    author: PropTypes.string,
  }).isRequired,
  theme: PropTypes.shape({
    color: PropTypes.string.isRequired,
    fade: PropTypes.bool.isRequired,
  }).isRequired,
};

export default QuoteAndAuthor;