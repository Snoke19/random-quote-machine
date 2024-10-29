import {useCallback, useEffect, useState} from "react";
import {fetchRandomQuoteByCategories} from "../../services/QuoteService";

export default function useQuote(chosenCategories) {

  const [quote, setQuote] = useState({quote: "", author: ""});
  const [error, setError] = useState("");

  const loadQuote = useCallback(async (categories = [chosenCategories]) => {
      try {
        const {quoteText, author: {name: authorName}} = await fetchRandomQuoteByCategories(categories);
        setQuote({quote: quoteText, author: authorName});
      } catch (error) {
        const errorDetails = error.cause;
        if (errorDetails) {
          if (errorDetails.type === "NOT_EMPTY_VALIDATION") {
            setError(errorDetails.details["categories"]);
          } else if (errorDetails.type === "NOT_FOUND_ENTITY") {
            setError(errorDetails.message);
          } else {
            setError("Error loading quote");
          }
        } else {
          setError(error.message);
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
    error,
    quote,
    loadQuote,
    setQuote
  ];
}

