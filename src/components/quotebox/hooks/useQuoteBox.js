import { useState, useEffect, useCallback } from "react";
import colors from "../colors";
import { getRandomColor } from "../../../utils/randomColor";
import fetchRandomQuoteByCategories from "../../../services/QuoteService";

export default function useQuoteBox(initDefaultCategories) {
  const [quote, setQuote] = useState({ id: "", quote: "", author: "" });
  const [quoteBoxSettings, setQuoteBoxSettings] = useState({
    colorBackGround: colors[0],
    fade: false,
  });

  const loadQuote = useCallback(
    async (categories = [initDefaultCategories]) => {
      setQuoteBoxSettings((prevState) => ({ ...prevState, fade: true }));
      setTimeout(async () => {
        const newColor = getRandomColor();
        try {
          const { id, quoteText, author: { name: authorName } } = await fetchRandomQuoteByCategories(categories);

          setQuote((prevState) => ({ ...prevState, id: id, quote: quoteText, author: authorName }));
          setQuoteBoxSettings((prevState) => ({ ...prevState, colorBackGround: newColor, fade: false, }));
        } catch {
          setQuote((prevState) => ({ ...prevState, quote: "Error loading quote", author: "", }));
          setQuoteBoxSettings((prevState) => ({ ...prevState, fade: false }));
        }
      }, 500);
    },
    [initDefaultCategories, setQuoteBoxSettings]
  );

  useEffect(() => {
    document.body.style.backgroundColor = quoteBoxSettings.colorBackGround;
    document.body.style.transition = "background-color 1s ease";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [quoteBoxSettings.colorBackGround]);

  useEffect(() => {
    loadQuote();
  }, [loadQuote]);

  return {
    quote,
    quoteBoxSettings,
    loadQuote,
  };
}
