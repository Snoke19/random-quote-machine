import { useState, useEffect, useCallback } from "react";
import colors from "../colors";
import { getRandomColor } from "../../../utils/randomColor";
import fetchRandomQuoteByCategories from "../../../services/QuoteService";

export default function useQuoteBox(initDefaultCategories, isCategoriesReady) {
  const [quote, setQuote] = useState({ quote: "", author: "" });
  const [quoteBoxSettings, setQuoteBoxSettings] = useState({
    colorBackGround: colors[0],
    fade: false,
  });

  const loadQuote = useCallback(
    async (categories = [initDefaultCategories]) => {
      setQuoteBoxSettings((prevState) => {
        const newState = { ...prevState, fade: true };
        return getNewStateIfDiff(prevState, newState);
      });

      setTimeout(async () => {
        const newColor = getRandomColor();
        try {
          const {
            quoteText,
            author: { name: authorName },
          } = await fetchRandomQuoteByCategories(categories);

          setQuote((prevState) => ({
            ...prevState,
            quote: quoteText,
            author: authorName,
          }));
          setQuoteBoxSettings((prevState) => {
            const newState = {
              ...prevState,
              colorBackGround: newColor,
              fade: false,
            };

            return getNewStateIfDiff(prevState, newState);
          });
        } catch (error) {
          const errorDetails = error.cause;

          if (errorDetails) {
            if (errorDetails.type === "NOT_EMPTY_VALIDATION") {
              setQuote((prevState) => ({
                ...prevState,
                quote: errorDetails.details["categories"],
                author: "",
              }));
            } else if (errorDetails.type === "NOT_FOUND_ENTITY") {
              setQuote((prevState) => ({
                ...prevState,
                quote: errorDetails.message,
                author: "",
              }));
            } else {
              setQuote((prevState) => ({
                ...prevState,
                quote: "Error loading quote",
                author: "",
              }));
            }
          } else {
            setQuote((prevState) => ({
              ...prevState,
              quote: error.message,
              author: "",
            }));
          }

          setQuoteBoxSettings((prevState) => {
            const newState = { ...prevState, fade: false };
            return getNewStateIfDiff(prevState, newState);
          });
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
    if (isCategoriesReady) loadQuote();
  }, [isCategoriesReady, loadQuote]);

  return {
    quote,
    quoteBoxSettings,
    loadQuote,
  };
}

function getNewStateIfDiff(prevState, newState) {
  if (JSON.stringify(prevState) === JSON.stringify(newState)) return prevState;
  return newState;
}
