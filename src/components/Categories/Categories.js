import React, {memo, useCallback, useEffect, useState} from "react";
import PropTypes from "prop-types";

import "./Categories.css";

import SuggestedCategoriesMenu from "./SuggestedCategories/SuggestedCategoriesMenu/SuggestedCategoriesMenu";
import SuggestedCategoriesInput from "./SuggestedCategories/SuggestedCategoriesInput/SuggestedCategoriesInput";
import CategoryList from "./CategoryList/CategoryList";
import {useNotificationContext} from "../Context/NotificationContext";
import useDebounce from "../Hooks/useDebounce";
import removeSlashes from "../../utils/strValidation";
import fetchCategoriesByName from "../../services/CategoryService";

const ENTER_KEY = "Enter";
const BACKSPACE_KEY = "Backspace";

const Categories = memo(
  function Categories({categoryList, theme, onRemoveCategory, onAddCategory}) {

    const [offset, setOffset] = useState(0);
    const {displayNotification} = useNotificationContext();
    const [categoryInput, setCategoryInput] = useState("");
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

    const fetchSuggestedCategories = useCallback(
      async () => {
        if (debouncedInput.trim()) {
          try {
            const sanitizedInput = removeSlashes(categoryInput);
            const categorySuggestions = await fetchCategoriesByName(sanitizedInput, offset);
            setSuggestedCategories((prevState) => [...prevState, ...categorySuggestions]);
          } catch (error) {
            displayNotification(error.message);
          }
        }
      }, [setSuggestedCategories, debouncedInput, categoryInput, displayNotification, offset]
    );

    const handleScrollEnd = useCallback((e) => {
      const bottomReached = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
      if (bottomReached) {
        setOffset((prevOffset) => prevOffset + 10);
      }
    }, []);

    useEffect(() => {
      if (debouncedInput) {
        if (categoryInput.trim()) {
          fetchSuggestedCategories();
        } else {
          setSuggestedCategories([])
        }
      }
    }, [categoryInput, debouncedInput, fetchSuggestedCategories]);

    const handleOnAddCategory = (category) => {
      onAddCategory(category);
      setCategoryInput("");
      setSuggestedCategories([]);
    }

    return (
      <div className="categories-input-container">
        <CategoryList categories={categoryList} onRemove={onRemoveCategory} theme={theme}/>
        <div className="combo-box-categories">
          <SuggestedCategoriesInput
            inputValue={categoryInput}
            onChange={handleCategoryInputChange}
            onKeyDown={handleInputKeyDown}/>
          <SuggestedCategoriesMenu
            suggestedCategories={suggestedCategories}
            theme={theme}
            onAddCategory={handleOnAddCategory}
            handleScrollEnd={handleScrollEnd}/>
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