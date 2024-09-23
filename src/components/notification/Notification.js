import React from "react";
import './Notification.css';

export default function Notification({ notificationInfo }) {

    const { visible, message } = notificationInfo;

    return (
        <>
            {visible && (<div className="toast"><p>{message}</p></div>)}
        </>
    );
}