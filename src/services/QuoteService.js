import AxiosInstance from "../utils/AxiosClient";
import {handleError} from "../utils/handleError";

export async function fetchRandomQuoteByCategories(categories) {
  try {
    const categoriesArray = Array.isArray(categories) ? categories : [categories];
    const categoriesStr = categoriesArray.join(",");
    const response = await AxiosInstance.get(`/random/quote`,
      {params: {categories: categoriesStr}}
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export async function fetchQuotesByTextQuote(textQuote) {
  try {
    const response = await AxiosInstance.get(`/quotes`,
      {params: {text: textQuote}}
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
