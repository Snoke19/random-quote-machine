import React, { memo } from "react";
import PropTypes from "prop-types";

import './CategoryList.css';

const CategoryList = memo(
    function CategoryList({ categories, onRemove, theme }) {

        return (
            <>
                {categories.map((category, index) => (
                    <div
                        key={category}
                        className="category"
                        style={{ backgroundColor: theme.color }}
                    >
                        <span>{category}</span>
                        <button
                            className="remove-category"
                            onClick={() => onRemove(index)}
                            aria-label={`Remove category ${category}`}
                        >
                            &times;
                        </button>
                    </div>
                ))}
            </>
        )
    }
);

CategoryList.propTypes = {
    categories: PropTypes.array.isRequired,
    onRemove: PropTypes.func.isRequired,
    theme: PropTypes.shape({ color: PropTypes.string }).isRequired
};

export default CategoryList;