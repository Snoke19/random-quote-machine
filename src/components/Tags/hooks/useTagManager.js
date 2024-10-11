import { useState, useCallback } from "react";
import fetchCategoriesByName from "../../../services/CategoryService";
import useNotification from "../../Notification/hooks/useNotification";

export default function useTagManager() {
  const [tagState, setTagState] = useState({
    tags: ["love"],
    tagInput: "",
  });

  const {
    notification: tagNotification,
    displayNotification: displayTagNotification,
  } = useNotification();

  const [suggestedTags, setSuggestedTags] = useState([]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTag(e);
    }

    if (e.key === "Backspace") {
      removeLastTag();
    }
  };

  const addTag = useCallback(
    (e) => {
      if (e.key !== "Enter") return;

      const inputValue = e.target.value.trim();
      const validation = validateTag(inputValue);

      if (!validation.isValid) {
        displayTagNotification(validation.message);
        return;
      }

      if (!tagState.tags.includes(inputValue)) {
        const sanitizedTag = removeSlashes(inputValue);
        setTagState((prevState) => ({
          quoteTags: [...prevState.quoteTags, sanitizedTag],
          tagInputValue: "",
        }));
        setSuggestedTags([]);
      }
    },
    [tagState.tags, displayTagNotification]
  );

  const removeLastTag = () => {
    removeTag(tagState.tags.length - 1);
  };

  const handleTagInputChange = useCallback(
    async (e) => {
      const inputValue = e.target.value;
      setTagState((prevState) => ({ ...prevState, tagInput: inputValue }));

      if (inputValue.length >= 1) {
        try {
          const sanitizedInput = removeSlashes(inputValue);
          const categorySuggestions = await fetchCategoriesByName(
            sanitizedInput
          );
          setSuggestedTags(categorySuggestions);
        } catch (error) {
          displayTagNotification(error.message);
        }
      }
    },
    [displayTagNotification]
  );

  const removeTag = useCallback((tagIndex) => {
    setTagState((prevState) => ({
      ...prevState,
      tags: prevState.tags.filter((_, index) => index !== tagIndex),
    }));
  }, []);

  return {
    tagState,
    suggestedTags,
    tagNotification,
    handleTagInputChange,
    removeTag,
    handleKeyDown,
  };
}

const validateTag = (value) => {
  if (!value) return { isValid: false, message: "Tag cannot be empty!" };
  if (!isNaN(Number(value)))
    return { isValid: false, message: "Tag cannot be numeric only!" };
  return { isValid: true };
};

const removeSlashes = (value) => {
  return [...value].filter((char) => char !== "/" && char !== "\\").join("");
};
