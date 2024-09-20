import React from "react";

export default function Notification({ notificationInfo }) {

    const { show, info } = notificationInfo;

    const styles = {
        toast: {
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#333',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '5px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
            opacity: 0.9
        },
    };

    return (
        <>
            {(show) && (
                <div style={styles.toast}>
                    <p>{info}</p>
                </div>
            )}
        </>
    );
}