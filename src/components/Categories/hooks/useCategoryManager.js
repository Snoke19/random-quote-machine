import { useState, useCallback } from "react";
import fetchCategoriesByName from "../../../services/CategoryService";
import useNotification from "../../Notification/hooks/useNotification";

export default function useCategoryManager() {
  const [categoryState, setCategoryState] = useState({
    categories: ["love"],
    categoryInput: "",
  });

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
      removeLastCategory();
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
        setCategoryState((prevState) => ({
          categories: [...prevState.categories, sanitizedCategory],
          categoryInput: "",
        }));
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

  const removeLastCategory = () => {
    setCategoryState((prevState) => ({
      ...prevState,
      categories: removeLastElement(
        prevState.categories,
        categoryState.categories.length - 1
      ),
    }));
  };

  return {
    categoryState,
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

const removeLastElement = (values, elementIndex) => {
  return values.filter((_, index) => index !== elementIndex);
};
