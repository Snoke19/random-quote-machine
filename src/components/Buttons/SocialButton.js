import React from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function SocialButton({
  quoteUrl,
  colorBackGround,
  title,
  iconClass,
}) {
  return (
    <a
      className="button social-button"
      title={title}
      aria-label={title}
      target="_blank"
      rel="noopener noreferrer"
      href={quoteUrl}
      style={{ backgroundColor: colorBackGround }}
    >
      <FontAwesomeIcon icon={iconClass} />
    </a>
  );
}

SocialButton.propTypes = {
  quoteUrl: PropTypes.string.isRequired,
  colorBackGround: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  iconClass: PropTypes.object.isRequired,
};
