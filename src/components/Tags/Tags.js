import React, { memo, useEffect, useRef } from "react";

import './Tags.css';

const Tag = memo(({ tag, index, onRemoveTag, backgroundColor }) => (
    <div className="tag" style={{ backgroundColor }}>
        <span>{tag}</span>
        <button className="remove-tag" onClick={() => onRemoveTag(index)} aria-label={`Remove tag ${tag}`}>&times;</button>
    </div>
));

export default function Tags({ tags, settings, onRemoveTag, tagInputValue, onTagInputChange, onTagInputKeyDown }) {

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
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
                type="text"
                ref={inputRef}
                value={tagInputValue}
                onChange={onTagInputChange}
                onKeyDown={onTagInputKeyDown}
                placeholder="Enter tags"
                className="tags-input"
            />
        </div>
    );
}