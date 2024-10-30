import React, {memo, useCallback, useEffect, useId, useRef, useState} from "react";

import "./Categories.css";

import PropTypes from "prop-types";
import fetchCategoriesByName from "../../services/CategoryService";
import removeSlashes from "../../utils/strValidation";
import {useNotificationContext} from "../Context/NotificationContext";

const ENTER_KEY = "Enter";
const BACKSPACE_KEY = "Backspace";

const Categories = memo(
  function Categories({categoryList, theme, onRemoveCategory, onAddCategory}) {

    const inputRef = useRef(null);
    const uniqueCategoryId = useId();
    const uniqueSuggestionId = useId();

    const {displayNotification} = useNotificationContext();
    const [categoryInput, setCategoryInput] = useState("");
    const [suggestedCategories, setSuggestedCategories] = useState([]);

    const handleCategoryInputChange = useCallback(
      async (e) => {
        const inputValue = e.target.value;
        setCategoryInput(inputValue);

        if (inputValue.trim()) {
          try {
            const sanitizedInput = removeSlashes(inputValue);
            const categorySuggestions = await fetchCategoriesByName(sanitizedInput);
            setSuggestedCategories(categorySuggestions);
          } catch (error) {
            displayNotification(error.message);
          }
        } else {
          setSuggestedCategories([]);
        }
      }, [displayNotification]);

    const onKeyDown = useCallback((e) => {
      if (e.key === ENTER_KEY && categoryInput.trim()) {
        onAddCategory(categoryInput);
        setCategoryInput("");
        setSuggestedCategories([]);
      } else if (e.key === BACKSPACE_KEY && categoryInput === "") {
        onRemoveCategory(e);
      }
    }, [categoryInput, onAddCategory, onRemoveCategory]);

    useEffect(() => {
      inputRef.current?.focus();
    }, []);

    return (
      <div className="categories-input-container">
        {categoryList.map((category, index) => (
          <CategoryItem
            key={`${uniqueCategoryId}-${index}`}
            name={category}
            index={index}
            onRemove={onRemoveCategory}
            theme={theme}
          />
        ))}
        <input
          list="suggestedCategories"
          ref={inputRef}
          type="text"
          value={categoryInput}
          onChange={handleCategoryInputChange}
          onKeyDown={onKeyDown}
          placeholder="Enter category"
          className="categories-input"
          autoComplete="off"
        />
        <datalist id="suggestedCategories">
          {suggestedCategories.map((suggestion) => {
            return (
              <option key={`${suggestion.name}-${uniqueSuggestionId}`} value={suggestion.name}/>
            );
          })}
        </datalist>
      </div>
    );
  }
);

const CategoryItem = memo(
  function CategoryItem({name, index, onRemove, theme}) {
    return (
      <div className="category" style={{backgroundColor: theme.color}}>
        <span>{name}</span>
        <button
          className="remove-category"
          onClick={() => onRemove(index)}
          aria-label={`Remove category ${name}`}
        >
          &times;
        </button>
      </div>
    );
  }
);

CategoryItem.propTypes = {
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired,
  theme: PropTypes.shape({color: PropTypes.string}).isRequired
};

Categories.propTypes = {
  categoryList: PropTypes.arrayOf(PropTypes.string).isRequired,
  theme: PropTypes.shape({color: PropTypes.string}).isRequired,
  onRemoveCategory: PropTypes.func.isRequired,
  onAddCategory: PropTypes.func.isRequired,
};

export default Categories;