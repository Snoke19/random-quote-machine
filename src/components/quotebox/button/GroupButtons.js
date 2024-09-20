import React from "react";
import PropTypes from 'prop-types';

export default function GroupButtons({ groupingClass, children }) {
    return (
        <div className={groupingClass}>
            {children}
        </div>
    );
}

GroupButtons.propTypes = {
    className: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};