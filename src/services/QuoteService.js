import AxiosInstance from "../utils/AxiosClient";
import {handleError} from "../utils/errors/handleError";

export async function fetchRandomQuoteByCategories(categories) {
    try {
        const categoriesArray = Array.isArray(categories) ?
            categories : (categories ? [categories] : []);

        const categoriesStr = categoriesArray.join(",");

        const response = await AxiosInstance.get(`/random/quote`,
            {params: {categories: categoriesStr}}
        );

        return response.data;
    } catch (error) {
        handleError(error, {component: "fetchRandomQuoteByCategories", categories}, true);
    }
}

export async function fetchQuotesByTextQuote(textQuote, offset) {
    try {
        const response = await AxiosInstance.get(`/quotes`,
            {params: {text: textQuote, offset}}
        );
        return response.data;
    } catch (error) {
        handleError(error, {
            component: "fetchQuotesByTextQuote",
            textQuote,
            offset
        }, true);
    }
}
