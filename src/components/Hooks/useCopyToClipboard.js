import {useCallback} from "react";

export default function useCopyToClipboard() {

  return useCallback((value) => {
    const handleCopy = async () => {
      try {
        if (navigator?.clipboard?.writeText) {
          await navigator.clipboard.writeText(value);
        } else {
          console.log("writeText not supported!");
        }
      } catch (e) {
        throw Error(e);
      }
    };

    return handleCopy();
  }, []);
}