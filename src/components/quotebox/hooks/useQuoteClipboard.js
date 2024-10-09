import { useState, useEffect } from "react";

export default function useQuoteClipboard(quote) {
  const [notification, setNotification] = useState({
    visible: false,
    message: "",
  });

  const showNotification = (message) => {
    setNotification((prevState) => ({ ...prevState, visible: true, message }));
  };

  const copyToClipboard = createClipboardHandler(quote, showNotification);

  useEffect(() => {
    if (notification.visible) {
      const timer = setTimeout(() => {
        setNotification((prevState) => ({
          ...prevState,
          visible: false,
          message: "",
        }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification.visible]);

  return {
    copyToClipboard,
    notification,
  };
}

function createClipboardHandler(quote, notify) {
  return async () => {
    try {
      await navigator.clipboard.writeText(`${quote.quote} - ${quote.author}`);
      notify("Quote copied!");
    } catch (error) {
      notify(`Copy failed: ${error.message}`);
    }
  };
}
