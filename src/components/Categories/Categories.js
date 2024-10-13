import React, { memo, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Notification from "../Notification/Notification";
import "./Categories.css";

const Category = memo(function Category({
  category,
  index,
  onRemoveCategory,
  backgroundColor,
}) {
  return (
    <div className="category" style={{ backgroundColor }}>
      <span>{category}</span>
      <button
        className="remove-category"
        onClick={() => onRemoveCategory(index)}
        aria-label={`Remove category ${category}`}
      >
        &times;
      </button>
    </div>
  );
});

export default function Categories({
  categories,
  settings: { colorBackGround },
  categoryInputValue,
  onRemoveCategory,
  onCategoryInputChange,
  onKeyDown,
  notificationCategory,
  suggestionCategories,
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <div className="categories-input-container">
        {categories.map((category, index) => (
          <Category
            key={`${category}-${index}`}
            category={category}
            index={index}
            onRemoveCategory={onRemoveCategory}
            backgroundColor={colorBackGround}
          />
        ))}
        <input
          list="suggestedCategories"
          id="category"
          name="category"
          autoComplete="off"
          type="text"
          ref={inputRef}
          value={categoryInputValue}
          onChange={onCategoryInputChange}
          onKeyDown={onKeyDown}
          placeholder="Enter category"
          className="categories-input"
        />
        <datalist id="suggestedCategories">
          {suggestionCategories.map((item, key) => (
            <option key={`${item}-${key}`} value={item.name} />
          ))}
        </datalist>
      </div>
      <Notification notificationInfo={notificationCategory} />
    </>
  );
}

Category.propTypes = {
  category: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onRemoveCategory: PropTypes.func.isRequired,
  backgroundColor: PropTypes.string.isRequired,
};

Categories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  settings: PropTypes.shape({
    colorBackGround: PropTypes.string.isRequired,
  }).isRequired,
  categoryInputValue: PropTypes.string.isRequired,
  onRemoveCategory: PropTypes.func.isRequired,
  onCategoryInputChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  notificationCategory: PropTypes.shape({
    isVisible: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
  suggestionCategories: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string.isRequired })
  ).isRequired,
};
