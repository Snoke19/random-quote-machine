import useNotification from "../../Notification/hooks/useNotification";

export default function useQuoteClipboard(quote) {
  const {
    notification: clipboardNotification,
    displayNotification: showClipboardNotification,
  } = useNotification(quote);

  const copyToClipboard = createClipboardHandler(
    quote,
    showClipboardNotification
  );

  return {
    clipboardNotification,
    copyToClipboard,
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
