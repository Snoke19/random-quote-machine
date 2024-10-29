import {useCallback} from "react";

export function useCopyToClipboard() {

  return useCallback((value) => {
    const handleCopy = async () => {
      try {
        if (navigator?.clipboard?.writeText) {
          await navigator.clipboard.writeText(value);
        } else {
          console.log("writeText not supported!");
        }
      } catch (e) {
        const tempTextArea = document.createElement("textarea");
        tempTextArea.value = value;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        document.execCommand("copy");
        document.body.removeChild(tempTextArea);
      }
    };

    return handleCopy();
  }, []);
}