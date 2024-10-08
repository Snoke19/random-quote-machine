const RANDOM_QUOTE_API_URL = "http://localhost:8080/random/quote";
const TIMEOUT_MS = 50;

/**
 * Fetches a random quote from the API, with optional category filtering.
 * 
 * This function sends a GET request to the `RANDOM_QUOTE_API_URL`, optionally including
 * a `categories` parameter in the query string. It returns a random quote as a JSON object.
 * 
 * If categories are provided, they will be added to the request URL as a comma-separated string.
 * If the fetch operation fails or the server responds with an error, an error object will be
 * thrown, containing the error details from the server's response.
 * 
 * @async
 * @function fetchRandomQuoteByCategories
 * 
 * @param {string|string[]} [categories] - An optional category or array of categories to filter the quotes. 
 *        If provided, quotes will be filtered by the specified categories.
 * 
 * @returns {Promise<Object>} - A promise that resolves to a quote object containing details of the random quote.
 * 
 * @throws {Error} - Throws an error if the response is not successful. The error object will contain the server's
 *                   error details including type, code, message, details, path, and timestamp.
 * 
 * @example
 * // Fetch a random quote without any category filter
 * fetchRandomQuoteByCategories()
 *     .then(quote => console.log(quote))
 *     .catch(error => console.error(error));
 * 
 * @example
 * // Fetch a random quote filtered by a single category
 * fetchRandomQuoteByCategories("inspiration")
 *     .then(quote => console.log(quote))
 *     .catch(error => console.error(error));
 * 
 * @example
 * // Fetch a random quote filtered by multiple categories
 * fetchRandomQuoteByCategories(["inspiration", "life"])
 *     .then(quote => console.log(quote))
 *     .catch(error => console.error(error));
 * 
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API|Fetch API Documentation}
 */
export default async function fetchRandomQuoteByCategories(categories) {
    const urlWithParams = new URL(`${RANDOM_QUOTE_API_URL}?${prepareURLSearchParams(categories)}`);

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

        const response = await fetch(urlWithParams, { signal: controller.signal });

        clearTimeout(timeoutId);

        if (!response.ok) {
            let errorResponse;
            try {
                errorResponse = await response.json();
            } catch (parseError) {
                errorResponse = { message: "Unknown error occurred, could not parse response." };
            }
            handleErrorResponse(errorResponse);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        if (error.name === 'AbortError') {
            console.error('The request was aborted due to a timeout.');
            throw new Error('Request timeout. Please try again later.');
        } else {
            throw error;
        }
    }
}

function prepareURLSearchParams(categories) {
    if (categories) {
        const categoriesArray = Array.isArray(categories) ? categories : [categories];
        const categoriesStr = categoriesArray.join(',');
        const params = new URLSearchParams({ 'categories': categoriesStr });
        return params;
    }
}

function handleErrorResponse(errorResponse) {
    console.error("Error fetching quote:", {
        type: errorResponse.type || "Unknown Type",
        code: errorResponse.code || "Unknown Code",
        message: errorResponse.message || "No message provided",
        details: JSON.stringify(errorResponse.details || {}),
        path: errorResponse.path || "Unknown path",
        timestamp: new Date(errorResponse.timestamp || Date.now())
    });
    throw new Error('Failed to fetch quote', { cause: errorResponse || {} });
}