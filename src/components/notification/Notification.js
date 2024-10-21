import React from "react";
import PropTypes from "prop-types";

import "./Notification.css";

export default function Notification({notificationInfo}) {
  const {isVisible, message} = notificationInfo;

  return (
    <>
      {isVisible && (
        <div className="toast">
          <p>{message}</p>
        </div>
      )}
    </>
  );
}

Notification.propTypes = {
  notificationInfo: PropTypes.object.isRequired,
};
