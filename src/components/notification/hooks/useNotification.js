import {useEffect, useState} from "react";

export default function useNotification() {
  const [notification, setNotification] = useState({
    isVisible: false,
    message: "",
  });

  const displayNotification = (message) => {
    setNotification({isVisible: true, message});
  };

  useEffect(() => {
    if (notification.isVisible) {
      const hideNotificationTimer = setTimeout(() => {
        setNotification({isVisible: false, message: ""});
      }, 2000);
      return () => clearTimeout(hideNotificationTimer);
    }
  }, [notification.isVisible]);

  return {notification, displayNotification};
}
