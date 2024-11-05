import React, {memo, useCallback, useEffect, useId, useState} from "react";
import PropTypes from "prop-types";

import "./Categories.css";

import CategoryList from "./CategoryList/CategoryList";
import {useNotificationContext} from "../Context/NotificationContext";
import useDebounce from "../Hooks/useDebounce";
import removeSlashes from "../../utils/strValidation";
import fetchCategoriesByName from "../../services/CategoryService";
import useClickAway from "../Hooks/useClickAway";

const ENTER_KEY = "Enter";
const BACKSPACE_KEY = "Backspace";

const Categories = memo(
  function Categories({categoryList, theme, onRemoveCategory, onAddCategory}) {

    const suggestionKeyId = useId();

    const {displayNotification} = useNotificationContext();
    const clickAway = useClickAway(() => setSuggestedCategories([]));

    const [offset, setOffset] = useState(0);
    const [categoryInput, setCategoryInput] = useState("");
    const [highlightedSuggestion, setHighlightedSuggestion] = useState(null);
    const [suggestedCategories, setSuggestedCategories] = useState([]);

    const debouncedInput = useDebounce(categoryInput, 500);

    const handleCategoryInputChange = useCallback((e) => {
      const inputValue = e.target.value;
      setCategoryInput(inputValue);
      setOffset(0);
      setSuggestedCategories([]);
    }, []);

    const handleInputKeyDown = useCallback((e) => {
      if (e.key === ENTER_KEY && categoryInput.trim()) {
        onAddCategory(categoryInput);
        setCategoryInput("");
        setSuggestedCategories([]);
      } else if (e.key === BACKSPACE_KEY && categoryInput === "") {
        onRemoveCategory(e);
      }
    }, [categoryInput, onAddCategory, onRemoveCategory]);

    const handleScrollEnd = useCallback((e) => {
      const bottomReached = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
      if (bottomReached) {
        setOffset((prevOffset) => prevOffset + 10);
      }
    }, []);

    const fetchSuggestions = useCallback(async () => {
      if (debouncedInput) {
        try {
          const sanitizedInput = removeSlashes(debouncedInput);
          const categorySuggestions = await fetchCategoriesByName(sanitizedInput, offset);
          setSuggestedCategories((prevState) => [...prevState, ...categorySuggestions]);
        } catch (error) {
          displayNotification(error.message);
        }
      } else {
        setSuggestedCategories([]);
      }
    }, [debouncedInput, displayNotification, offset]);

    const handleSearchInputFocus = useCallback(async () => {
      if (categoryInput.length > 0 && suggestedCategories.length === 0) await fetchSuggestions();
    }, [categoryInput.length, suggestedCategories.length, fetchSuggestions]);

    useEffect(() => {
      fetchSuggestions();
    }, [fetchSuggestions]);

    const handleOnAddCategory = useCallback((category) => {
      onAddCategory(category);
      setCategoryInput("");
      setSuggestedCategories([]);
    }, [onAddCategory, setSuggestedCategories]);

    return (
      <div className="categories-input-container" ref={clickAway}>
        <CategoryList categories={categoryList} onRemove={onRemoveCategory} theme={theme}/>
        <div className="combo-box-categories">
          <input
            autoFocus
            onFocus={handleSearchInputFocus}
            id="combobox-input"
            type="text"
            className="combo-box-categories-input"
            value={categoryInput}
            onChange={handleCategoryInputChange}
            onKeyDown={handleInputKeyDown}
            role="combobox"
            aria-controls="combo-box-options"
            aria-activedescendant=""
            aria-autocomplete="list"
            aria-expanded="false"
            aria-haspopup="listbox"
            placeholder="Enter category"
            autoComplete="off"
          />
          {
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
                       onClick={() => handleOnAddCategory(suggestion.name)}>
                    {suggestion.name}
                  </div>
                )}
              </div>
            )
          }
        </div>
      </div>
    );
  }
);

Categories.propTypes = {
  categoryList: PropTypes.arrayOf(PropTypes.string).isRequired,
  theme: PropTypes.shape({color: PropTypes.string}).isRequired,
  onRemoveCategory: PropTypes.func.isRequired,
  onAddCategory: PropTypes.func.isRequired,
};

export default Categories;