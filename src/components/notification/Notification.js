import React from "react";
import './Notification.css';

export default function Notification({ notificationInfo }) {

    const { show, info } = notificationInfo;

    return (
        <>
            {show && (
                <div className="toast">
                    <p>{info}</p>
                </div>
            )}
        </>
    );
}