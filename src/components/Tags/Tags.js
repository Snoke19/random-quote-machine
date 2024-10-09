import React, { memo, useEffect, useRef } from "react";
import Notification from "../Notification/Notification";
import './Tags.css';

const Tag = memo(({ tag, index, onRemoveTag, backgroundColor }) => (
    <div className="tag" style={{ backgroundColor }}>
        <span>{tag}</span>
        <button className="remove-tag" onClick={() => onRemoveTag(index)} aria-label={`Remove tag ${tag}`}>&times;</button>
    </div>
));

export default function Tags({ tags, settings, tagInputValue, onRemoveTag, onTagInputChange, onKeyDownButtonsAddOrRemove, notificationTag, suggestionTags }) {

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <>
            <div className="tags-input-container">
                {tags.map((tag, index) => (
                    <Tag
                        key={`${tag}-${index}`}
                        tag={tag}
                        index={index}
                        onRemoveTag={onRemoveTag}
                        backgroundColor={settings.colorBackGround}
                    />
                ))}
                <input
                    list="suggestedCategories" id="category" name="category" autoComplete="off"
                    type="text"
                    ref={inputRef}
                    value={tagInputValue}
                    onChange={onTagInputChange}
                    onKeyDown={onKeyDownButtonsAddOrRemove}
                    placeholder="Enter tags"
                    className="tags-input"
                />
                <datalist id="suggestedCategories">
                    {suggestionTags.map((item, key) =>
                        <option key={key} value={item.name} />
                    )}
                </datalist>
            </div>
            <Notification notificationInfo={notificationTag} />
        </>
    );
}