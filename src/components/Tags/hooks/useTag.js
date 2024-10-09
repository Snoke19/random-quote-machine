import { useState, useCallback, useEffect } from "react";
import fetchCategoriesByName from "../../../services/CategoryService";

export default function useTag() {

    const [tagsState, setTagState] = useState({ quoteTags: ['love'], tagInputValue: '' });
    const [notificationTag, setNotificationTag] = useState({ visible: false, message: '' });
    const [suggestionTags, setSuggestionTags] = useState([]);

    const showNotification = (message) => {
        setNotificationTag((prevState) => ({ ...prevState, visible: true, message }));
    }

    const onKeyDownButtonsAddOrRemove = (e) => {
        if (e.key === 'Enter') {
            addTag(e);
        }

        if (e.key === 'Backspace') {
            removeTagByBackspace(e);
        }
    }

    const addTag = useCallback((e) => {

        if (e.key !== 'Enter') return;

        const value = e.target.value.trim();
        const validation = isValidTag(value);

        if (!validation.valid) {
            showNotification(validation.message);
            return;
        }

        if (e.key === 'Enter' && !tagsState.quoteTags.includes(value)) {
            const categoryRemovedSlash = [...value].filter(data => data !== '/' && data !== '\\').join("");
            setTagState((prevState) => ({
                quoteTags: [...prevState.quoteTags, categoryRemovedSlash],
                tagInputValue: ''
            }));
            setSuggestionTags([]);
        }
    }, [tagsState.quoteTags]);

    const removeTagByBackspace = (e) => {
        if (e.key === 'Backspace') {
            removeTag(tagsState.quoteTags.length - 1);
        }
    }

    const handleTagInputChange = useCallback(async (e) => {
        const value = e.target.value;
        setTagState((prevState) => ({ ...prevState, tagInputValue: value }));

        if (value.length >= 1) {
            try {
                const categoryRemovedSlash = [...value].filter(data => data !== '/' && data !== '\\').join("");
                const suggestedCategories = await fetchCategoriesByName(categoryRemovedSlash);
                setSuggestionTags(suggestedCategories);
            } catch (error) {
                showNotification(error.message);
            }
        }
    }, []);

    const removeTag = useCallback((indexToRemove) => {
        setTagState((prevState) => ({
            ...prevState,
            quoteTags: prevState.quoteTags.filter((_, index) => index !== indexToRemove)
        }));
    }, []);

    useEffect(() => {
        if (notificationTag.visible) {
            const timer = setTimeout(() => {
                setNotificationTag(prevState => ({ ...prevState, visible: false, message: '' }));
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notificationTag.visible]);

    return {
        tagsState, suggestionTags, notificationTag, handleTagInputChange, removeTag, onKeyDownButtonsAddOrRemove,
    }
}

const isValidTag = (value) => {
    if (!value) return { valid: false, message: "Cannot add empty tag value!" };
    if (!isNaN(Number(value))) return { valid: false, message: "Cannot add tag with only numbers!" };
    return { valid: true };
};