import React, {memo, useMemo} from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const SocialButton = memo(
  function SocialButton({url, theme, label, icon}) {
    const fontAwesomeIcon = useMemo(() => <FontAwesomeIcon icon={icon}/>, [icon]);
    return (
      <a
        className="button social-button"
        href={url}
        title={label}
        aria-label={label}
        target="_blank"
        rel="noopener noreferrer"
        style={{backgroundColor: theme.color}}
      >
        {fontAwesomeIcon}
      </a>
    );
  }
);

SocialButton.propTypes = {
  url: PropTypes.string.isRequired,
  theme: PropTypes.shape({
    color: PropTypes.string,
  }).isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
};

export default SocialButton;