import { useState, useEffect } from "react";

export default function useNotification() {
  const [notification, setNotification] = useState({
    isVisible: false,
    message: "",
  });

  const displayNotification = (message) => {
    setNotification((prevState) => ({ ...prevState, visible: true, message }));
  };

  useEffect(() => {
    if (notification.isVisible) {
      const hideNotificationTimer = setTimeout(() => {
        setNotification((prevState) => ({
          ...prevState,
          visible: false,
          message: "",
        }));
      }, 3000);
      return () => clearTimeout(hideNotificationTimer);
    }
  }, [notification.isVisible]);

  return { notification, displayNotification };
}
