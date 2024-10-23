import {useCallback, useEffect, useState} from "react";
import colors from "../colors";
import {getRandomColor} from "../../../utils/randomColor";
import {fetchRandomQuoteByCategories} from "../../../services/QuoteService";

export default function useQuoteBox(initDefaultCategories, isCategoriesReady) {

  const [quote, setQuote] = useState({quote: "", author: ""});
  const [quoteBoxSettings, setQuoteBoxSettings] = useState({
    colorBackGround: colors[0],
    fade: false,
  });

  const loadQuote = useCallback(async (categories = [initDefaultCategories]) => {

      setQuoteBoxSettings((prevState) =>
        ({colorBackGround: prevState.colorBackGround, fade: true})
      );

      setTimeout(async () => {
        const newColor = getRandomColor();
        try {
          const {
            quoteText,
            author: {name: authorName},
          } = await fetchRandomQuoteByCategories(categories);

          setQuote((prevState) => ({
            ...prevState,
            quote: quoteText,
            author: authorName,
          }));
          setQuoteBoxSettings({colorBackGround: newColor, fade: false});
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

          setQuoteBoxSettings((prevState) =>
            ({colorBackGround: prevState.colorBackGround, fade: false})
          );
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
    if (isCategoriesReady) {
      loadQuote()
        .catch((error) => {
          console.error('Error loading quote:', error);
        });
    }
  }, [isCategoriesReady, loadQuote]);

  return {
    quote,
    quoteBoxSettings,
    loadQuote,
  };
}

