import React, {memo, useId, useState} from "react";

import './SuggestedCategoriesMenu.css';
import PropTypes from "prop-types";

const SuggestedCategoriesMenu = memo(
  function SuggestedCategoriesMenu({suggestedCategories, theme, onAddCategory, handleScrollEnd}) {

    const suggestionKeyId = useId();
    const [highlightedSuggestion, setHighlightedSuggestion] = useState(null);

    return (
      suggestedCategories.length > 0 && (
        <div onScroll={handleScrollEnd} className="combo-box-suggested-categories-menu" role="listbox"
             id="combo-box-options">
          {suggestedCategories.map((suggestion, index) =>
            <div role="option"
                 tabIndex={0}
                 className="combo-box-category-item"
                 key={`${suggestion.name}-${index}-${suggestionKeyId}`}
                 aria-selected={suggestion === highlightedSuggestion}
                 style={{
                   backgroundColor: suggestion === highlightedSuggestion ? theme.color : "transparent",
                   color: suggestion === highlightedSuggestion ? "white" : "black",
                 }}
                 onMouseEnter={() => setHighlightedSuggestion(suggestion)}
                 onClick={() => onAddCategory(suggestion.name)}>
              {suggestion.name}
            </div>
          )}
        </div>)
    )
  }
);

SuggestedCategoriesMenu.propTypes = {
  suggestedCategories: PropTypes.array.isRequired,
  theme: PropTypes.shape({color: PropTypes.string}).isRequired,
  onAddCategory: PropTypes.func.isRequired,
  handleScrollEnd: PropTypes.func.isRequired
};

export default SuggestedCategoriesMenu;