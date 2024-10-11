import React from "react";
import PropTypes from "prop-types";

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
      <i className={iconClass}></i>
    </a>
  );
}

SocialButton.propTypes = {
  quoteUrl: PropTypes.string.isRequired,
  colorBackGround: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  iconClass: PropTypes.string.isRequired,
};
