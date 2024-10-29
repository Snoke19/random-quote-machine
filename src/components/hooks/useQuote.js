import {useCallback, useEffect, useState} from "react";
import {fetchRandomQuoteByCategories} from "../../services/QuoteService";

export default function useQuote(chosenCategories) {

  const [quote, setQuote] = useState({quote: "", author: ""});

  const loadQuote = useCallback(async (categories = [chosenCategories]) => {

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
      }
    }, [chosenCategories]
  );

  useEffect(() => {
    if (chosenCategories.length >= 0) {
      loadQuote().catch((error) => console.error('Error loading quote:', error));
    }
  }, [chosenCategories, loadQuote]);

  return [
    quote,
    loadQuote,
  ];
}

