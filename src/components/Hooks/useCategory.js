import {useCallback, useEffect, useState} from "react";
import {
  getLocalCategories,
  removeLastLocalCategory,
  removeLocalCategory,
  saveCategoriesLocally,
} from "../../utils/localStorageUtils";
import removeSlashes from "../../utils/strValidation";

export default function useCategory() {
  const [categories, setCategories] = useState(() => getLocalCategories());
  const [updateTrigger, setUpdateTrigger] = useState(false);

  const addCategory = useCallback(
    (categoryInput) => {
      const inputValue = categoryInput.trim();
      const {isValid, message} = validateCategory(inputValue);

      if (!isValid) {
        throw Error(message);
      }

      if (!categories.includes(inputValue)) {
        const sanitizedCategory = removeSlashes(inputValue);
        const updatedCategories = [...categories, sanitizedCategory];

        setCategories(updatedCategories);
        saveCategoriesLocally(updatedCategories);
      }
    }, [categories]);

  const removeLastCategoryOrByIndex = useCallback((e) => {
    const inputValue = e?.target?.value?.trim();

    if (!inputValue && !isNaN(e)) {
      const index = parseInt(e);
      removeLocalCategory(index);
    } else {
      removeLastLocalCategory();
    }
    setUpdateTrigger((prevState) => !prevState);
  }, []);

  useEffect(() => {
    const localCategories = getLocalCategories();
    setCategories(localCategories);
  }, [updateTrigger]);

  return [
    categories,
    removeLastCategoryOrByIndex,
    addCategory,
  ];
}

const validateCategory = (value) => {
  if (!value) return {isValid: false, message: "Category cannot be empty!"};
  return {isValid: true};
};
