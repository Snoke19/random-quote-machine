import { useState, useCallback, useEffect } from "react";
import fetchCategoriesByName from "../../../services/CategoryService";
import useNotification from "../../Notification/hooks/useNotification";
import {
  getLocalCategories,
  saveCategoriesLocally,
  removeLastLocalCategory,
  removeLocalCategory,
} from "../../../utils/localStorageUtils";

export default function useCategoryManager() {
  const [categoryState, setCategoryState] = useState({
    categories: [],
    categoryInput: "",
  });
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const [isCategoriesReady, setIsCategoriesReady] = useState(false);

  const {
    notification: categoryNotification,
    displayNotification: displayCategoryNotification,
  } = useNotification();

  const [suggestedCategories, setSuggestedCategories] = useState([]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addCategory(e);
    }

    if (e.key === "Backspace") {
      removeLastCategory(e);
    }
  };

  const addCategory = useCallback(
    (e) => {
      if (e.key !== "Enter") return;

      const inputValue = e.target.value.trim();
      const validation = validateCategory(inputValue);

      if (!validation.isValid) {
        displayCategoryNotification(validation.message);
        return;
      }

      if (!categoryState.categories.includes(inputValue)) {
        const sanitizedCategory = removeSlashes(inputValue);
        setCategoryState((prevState) => {
          const updatedCategories = [
            ...prevState.categories,
            sanitizedCategory,
          ];
          saveCategoriesLocally(updatedCategories);
          return {
            categories: updatedCategories,
            categoryInput: "",
          };
        });

        setSuggestedCategories([]);
      }
    },
    [categoryState.categories, displayCategoryNotification]
  );

  const handleCategoryInputChange = useCallback(
    async (e) => {
      const inputValue = e.target.value;
      setCategoryState((prevState) => ({
        ...prevState,
        categoryInput: inputValue,
      }));

      if (inputValue.length >= 1) {
        try {
          const sanitizedInput = removeSlashes(inputValue);
          const categorySuggestions = await fetchCategoriesByName(
            sanitizedInput
          );
          setSuggestedCategories(categorySuggestions);
        } catch (error) {
          displayCategoryNotification(error.message);
        }
      }
    },
    [displayCategoryNotification]
  );

  const removeLastCategory = (e) => {
    const inputValue = e.target?.value.trim();

    if (!inputValue) {
      if (!isNaN(e)) {
        removeLocalCategory(e);
        setUpdateTrigger((prevState) => !prevState);
      } else {
        removeLastLocalCategory();
        setUpdateTrigger((prevState) => !prevState);
      }
    }
  };

  useEffect(() => {
    const localCategories = getLocalCategories();

    setCategoryState((prev) => ({
      ...prev,
      categories: [...localCategories],
    }));
    setIsCategoriesReady(true);
  }, [updateTrigger]);

  return {
    categoryState,
    isCategoriesReady,
    suggestedCategories,
    categoryNotification,
    handleCategoryInputChange,
    removeLastCategory,
    handleKeyDown,
  };
}

const validateCategory = (value) => {
  if (!value) return { isValid: false, message: "Category cannot be empty!" };
  if (!isNaN(Number(value)))
    return { isValid: false, message: "Category cannot be numeric only!" };
  return { isValid: true };
};

const removeSlashes = (value) => {
  return [...value].filter((char) => char !== "/" && char !== "\\").join("");
};
