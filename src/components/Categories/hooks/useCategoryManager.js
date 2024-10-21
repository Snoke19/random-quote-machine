import {useCallback, useEffect, useState} from "react";
import fetchCategoriesByName from "../../../services/CategoryService";
import useNotification from "../../Notification/hooks/useNotification";
import {
  getLocalCategories,
  removeLastLocalCategory,
  removeLocalCategory,
  saveCategoriesLocally,
} from "../../../utils/localStorageUtils";

const ENTER_KEY = "Enter";
const BACKSPACE_KEY = "Backspace";

export default function useCategoryManager() {

  const [categories, setCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");
  const [isCategoriesReady, setIsCategoriesReady] = useState(false);
  const [suggestedCategories, setSuggestedCategories] = useState([]);

  const [updateTrigger, setUpdateTrigger] = useState(false);

  const {
    notification: categoryNotification,
    displayNotification: displayCategoryNotification,
  } = useNotification();

  const handleKeyDown = (e) => {
    if (e.key === ENTER_KEY) {
      addCategory();
    } else if (e.key === BACKSPACE_KEY) {
      removeLastCategory(e);
    }
  };

  const addCategory = useCallback(() => {

    const inputValue = categoryInput.trim();
    const validation = validateCategory(inputValue);

    if (!validation.isValid) {
      displayCategoryNotification(validation.message);
      return;
    }

    if (!categories.includes(inputValue)) {
      const sanitizedCategory = removeSlashes(inputValue);
      const updatedCategories = [...categories, sanitizedCategory];

      setCategories(updatedCategories);
      saveCategoriesLocally(updatedCategories);
      setCategoryInput("");
      setSuggestedCategories([]);
    }
  }, [categoryInput, categories, displayCategoryNotification]);

  const handleCategoryInputChange = useCallback(async (e) => {
    const inputValue = e.target.value;
    setCategoryInput(inputValue);

    if (inputValue.length >= 1) {
      try {
        const sanitizedInput = removeSlashes(inputValue);
        const categorySuggestions = await fetchCategoriesByName(sanitizedInput);
        setSuggestedCategories(categorySuggestions);
      } catch (error) {
        displayCategoryNotification(error.message);
      }
    }
  }, [displayCategoryNotification]);

  const removeLastCategory = (e) => {
    const inputValue = e.target?.value.trim();

    if (!inputValue) {
      if (!isNaN(e)) {
        const index = parseInt(e);
        removeLocalCategory(index);
      } else {
        removeLastLocalCategory();
      }
      setUpdateTrigger((prevState) => !prevState);
    }
  };

  useEffect(() => {
    const localCategories = getLocalCategories();
    setCategories(localCategories);
    setIsCategoriesReady(true);
  }, [updateTrigger]);

  return {
    categories,
    categoryInput,
    isCategoriesReady,
    suggestedCategories,
    categoryNotification,
    handleCategoryInputChange,
    removeLastCategory,
    handleKeyDown,
  };
}

const validateCategory = (value) => {
  if (!value) return {isValid: false, message: "Category cannot be empty!"};
  if (!isNaN(Number(value)))
    return {isValid: false, message: "Category cannot be numeric only!"};
  return {isValid: true};
};

const removeSlashes = (value) => {
  return value.replace(/[\\/]/g, "");
};
