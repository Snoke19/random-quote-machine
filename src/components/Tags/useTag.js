import { useState, useCallback, useEffect } from "react";

export default function useTag() {

    const [tagsState, setTagState] = useState({ quoteTags: ['love'], tagInputValue: '' });
    const [notificationTag, setNotificationTag] = useState({ visible: false, message: '' });

    const showNotification = (message) => {
        setNotificationTag((prevState) => ({ ...prevState, visible: true, message }));
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
            setTagState((prevState) => ({
                quoteTags: [...prevState.quoteTags, value],
                tagInputValue: ''
            }));
        }
    }, [tagsState.quoteTags]);

    const handleTagInputChange = useCallback((e) => {
        setTagState((prevState) => ({
            ...prevState,
            tagInputValue: e.target.value
        }));
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
        tagsState, addTag, handleTagInputChange, removeTag, notificationTag
    }
}

const isValidTag = (value) => {
    if (!value) return { valid: false, message: "Cannot add empty tag value!" };
    if (!isNaN(Number(value))) return { valid: false, message: "Cannot add tag with only numbers!" };
    return { valid: true };
};