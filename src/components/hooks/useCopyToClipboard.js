import {useCallback, useState} from "react";

export function useCopyToClipboard() {

  const [state, setState] = useState(null);

  const copyToClipboard = useCallback((value) => {
    const handleCopy = async () => {
      try {
        if (navigator?.clipboard?.writeText) {
          await navigator.clipboard.writeText(value);
          setState(value);
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
        setState(value);
      }
    };

    return handleCopy();
  }, []);

  return [state, copyToClipboard];
}