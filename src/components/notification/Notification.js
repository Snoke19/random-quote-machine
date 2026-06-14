import React from "react";
import PropTypes from "prop-types";

import "./Notification.css";

export default function Notification({notificationInfo}) {
    const {isVisible, message} = notificationInfo;
    return (
        <>
            {isVisible && (
                <div className="toast">
                    <span>{message}</span>
                </div>
            )}
        </>
    );
}

Notification.propTypes = {
    notificationInfo: PropTypes.shape({
        isVisible: PropTypes.bool.isRequired,
        message: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
    }).isRequired,
};

Notification.defaultProps = {
    notificationInfo: {
        isVisible: false,
        message: '',
        type: 'info',
    },
};