import {useMemo, useState} from "react";
import colors from "../QuoteBox/colors";

export default function useStyleTheme(theme) {
  const [color, setColor] = useState(colors[0]);
  const [fade, setFade] = useState(false);

  const styleTheme = useMemo(() => ({color, fade}), [color, fade]);

  const updateStyleTheme = (newColor, shouldFade = true) => {
    setFade(shouldFade);
    setTimeout(() => {
      setColor(newColor);
      setFade(false);
    }, 500);
  };

  return {styleTheme, updateStyleTheme};
}