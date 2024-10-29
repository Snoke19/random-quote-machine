import React, {memo, useMemo} from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const SocialButton = memo(
  function SocialButton({quoteUrl, styleTheme, title, iconClass}) {
    const fontAwesomeIcon = useMemo(() => <FontAwesomeIcon icon={iconClass}/>, [iconClass]);
    return (
      <a
        className="button social-button"
        title={title}
        aria-label={title}
        target="_blank"
        rel="noopener noreferrer"
        href={quoteUrl}
        style={{backgroundColor: styleTheme.color}}
      >
        {fontAwesomeIcon}
      </a>
    );
  }
);

SocialButton.propTypes = {
  quoteUrl: PropTypes.string.isRequired,
  styleTheme: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  iconClass: PropTypes.object.isRequired,
};

export default SocialButton;