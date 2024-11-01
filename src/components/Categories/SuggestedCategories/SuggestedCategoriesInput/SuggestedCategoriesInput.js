import React, {memo, useEffect, useRef} from "react";
import PropTypes from "prop-types";

const SuggestedCategoriesInput = memo(
  function SuggestedCategoriesInput({inputValue, onChange, onKeyDown}) {
    const inputRef = useRef(null);

    useEffect(() => {
      inputRef.current?.focus();
    }, []);

    return (
      <input
        id="combobox-input"
        type="text"
        ref={inputRef}
        className="combo-box-categories-input"
        value={inputValue}
        onChange={onChange}
        onKeyDown={onKeyDown}
        role="combobox"
        aria-controls="combo-box-options"
        aria-activedescendant=""
        aria-autocomplete="list"
        aria-expanded="false"
        aria-haspopup="listbox"
        placeholder="Enter category"
        autoComplete="off"
      />
    )
  }
);


SuggestedCategoriesInput.propTypes = {
  inputValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
};

export default SuggestedCategoriesInput;