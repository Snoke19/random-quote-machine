import React from "react";
import PropTypes from 'prop-types';

export default function GroupButtons({ className, children }) {
    return (
        <div className={className}>
            {children}
        </div>
    );
}

GroupButtons.propTypes = {
    className: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};