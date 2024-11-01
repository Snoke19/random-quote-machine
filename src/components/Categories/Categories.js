import React, {memo, useCallback, useState} from "react";
import PropTypes from "prop-types";

import "./Categories.css";

import removeSlashes from "../../utils/strValidation";
import fetchCategoriesByName from "../../services/CategoryService";
import {useNotificationContext} from "../Context/NotificationContext";

import SuggestedCategoriesMenu from "./SuggestedCategories/SuggestedCategoriesMenu/SuggestedCategoriesMenu";
import SuggestedCategoriesInput from "./SuggestedCategories/SuggestedCategoriesInput/SuggestedCategoriesInput";
import CategoryList from "./CategoryList/CategoryList";

const ENTER_KEY = "Enter";
const BACKSPACE_KEY = "Backspace";

const Categories = memo(
  function Categories({categoryList, theme, onRemoveCategory, onAddCategory}) {

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

    const handleInputKeyDown = useCallback((e) => {
      if (e.key === ENTER_KEY && categoryInput.trim()) {
        onAddCategory(categoryInput);
        setCategoryInput("");
        setSuggestedCategories([]);
      } else if (e.key === BACKSPACE_KEY && categoryInput === "") {
        onRemoveCategory(e);
      }
    }, [categoryInput, onAddCategory, onRemoveCategory]);

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
            onAddCategory={onAddCategory}/>
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