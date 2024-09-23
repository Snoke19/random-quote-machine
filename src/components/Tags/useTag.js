import { useState } from "react";

export default function useTag() {

    const [tagsState, setTagState] = useState({ quoteTags: [], tagInputValue: '' });

    const addTag = (e) => {
        const value = tagsState.tagInputValue.trim();
        if (e.key === 'Enter' && value !== '' && !tagsState.quoteTags.includes(value)) {
            setTagState((prevState) => ({
                quoteTags: [...prevState.quoteTags, value],
                tagInputValue: ''
            }));
        }
    };

    const handleTagInputChange = (e) => {
        setTagState((prevState) => ({
            ...prevState,
            tagInputValue: e.target.value
        }));
    };

    const removeTag = (indexToRemove) => {
        setTagState((prevState) => ({
            ...prevState,
            quoteTags: prevState.quoteTags.filter((_, index) => index !== indexToRemove)
        }));
    };

    return {
        tagsState,
        addTag,
        handleTagInputChange,
        removeTag
    }
}