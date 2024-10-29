import React, {memo, useCallback, useEffect, useId, useRef, useState} from "react";

import "./Categories.css";

import PropTypes from "prop-types";
import fetchCategoriesByName from "../../services/CategoryService";
import removeSlashes from "../../utils/strValidation";
import {useNotificationContext} from "../Context/NotificationContext";

const ENTER_KEY = "Enter";
const BACKSPACE_KEY = "Backspace";

const Category = memo(
  function Category({category, index, onRemoveCategory, styleTheme}) {
    return (
      <div className="category" style={{backgroundColor: styleTheme.color}}>
        <span>{category}</span>
        <button
          className="remove-category"
          onClick={() => onRemoveCategory(index)}
          aria-label={`Remove category ${category}`}
        >
          &times;
        </button>
      </div>
    );
  }
);

const Categories = memo(
  function Categories({categories, styleTheme, onRemoveCategory, addCategory}) {
    const inputRef = useRef(null);
    const categoryId = useId();
    const suggestedCategoryId = useId();

    const {displayNotification} = useNotificationContext();
    const [categoryInput, setCategoryInput] = useState("");
    const [suggestedCategories, setSuggestedCategories] = useState([]);

    const handleCategoryInputChange = useCallback(
      async (e) => {
        const inputValue = e.target.value;
        setCategoryInput(inputValue);

        if (inputValue.trim().length >= 1) {
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
        addCategory(categoryInput);
        setCategoryInput("");
        setSuggestedCategories([]);
      } else if (e.key === BACKSPACE_KEY && categoryInput === "") {
        onRemoveCategory(e);
      }
    }, [categoryInput, addCategory, onRemoveCategory]);

    useEffect(() => {
      inputRef.current?.focus();
    }, []);

    return (
      <div className="categories-input-container">
        {categories.map((category, index) => (
          <Category
            key={`${categoryId}-${index}`}
            category={category}
            index={index}
            onRemoveCategory={onRemoveCategory}
            styleTheme={styleTheme}
          />
        ))}
        <input
          list="suggestedCategories"
          id="category"
          name="category"
          autoComplete="off"
          type="text"
          ref={inputRef}
          value={categoryInput}
          onChange={handleCategoryInputChange}
          onKeyDown={onKeyDown}
          placeholder="Enter category"
          className="categories-input"
        />
        <datalist id="suggestedCategories">
          {suggestedCategories.map((item) => {
            return (
              <option key={`${item.name}-${suggestedCategoryId}`} value={item.name}/>
            );
          })}
        </datalist>
      </div>
    );
  }
);

Category.propTypes = {
  category: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onRemoveCategory: PropTypes.func.isRequired,
  styleTheme: PropTypes.object.isRequired,
};

Categories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  styleTheme: PropTypes.object.isRequired,
  onRemoveCategory: PropTypes.func.isRequired,
  addCategory: PropTypes.func.isRequired
};

export default Categories;