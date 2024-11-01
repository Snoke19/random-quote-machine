import React, {memo, useId, useState} from "react";

import './SuggestedCategoriesMenu.css';
import PropTypes from "prop-types";

const SuggestedCategoriesMenu = memo(
  function SuggestedCategoriesMenu({suggestedCategories, theme, onAddCategory}) {

    const suggestionKeyId = useId();
    const [highlightedSuggestion, setHighlightedSuggestion] = useState(null);

    return (
      suggestedCategories.length > 0 && (
        <div className="combo-box-suggested-categories-menu" role="listbox" id="combo-box-options">
          {suggestedCategories.map((suggestion) => {
            return (
              <div role="option"
                   tabIndex={0}
                   className="combo-box-category-item"
                   key={`${suggestion.name}-${suggestionKeyId}`}
                   aria-selected={suggestion === highlightedSuggestion}
                   style={{
                     backgroundColor: suggestion === highlightedSuggestion ? theme.color : "transparent",
                     color: suggestion === highlightedSuggestion ? "white" : "black",
                   }}
                   onMouseEnter={() => setHighlightedSuggestion(suggestion)}
                   onClick={() => onAddCategory(suggestion.name)}
              >{suggestion.name}</div>
            );
          })}
        </div>)
    )
  }
);

SuggestedCategoriesMenu.propTypes = {
  suggestedCategories: PropTypes.arrayOf(PropTypes.shape({name: PropTypes.string.isRequired})).isRequired,
  theme: PropTypes.shape({color: PropTypes.string}).isRequired,
  onAddCategory: PropTypes.func.isRequired
};

export default SuggestedCategoriesMenu;