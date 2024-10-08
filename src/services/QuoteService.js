const QUOTE_API_URL = "http://localhost:8080/random/quote";

export default async function fetchRandomQuoteByCategories(categories) {
    const urlWithParams = new URL(QUOTE_API_URL);

    if (categories) {
        const categoriesArray = Array.isArray(categories) ? categories : [categories];
        const categoriesStr = categoriesArray.join(',');
        urlWithParams.searchParams.append("categories", categoriesStr);
    }

    const response = await fetch(urlWithParams);
    if (!response.ok) {
        const errorResponse = await response.json();

        console.error("Error fetching quote:", {
            message: errorResponse.message,
            code: errorResponse.code,
            details: JSON.stringify(errorResponse.details),
            path: errorResponse.path,
        });

        throw new Error('Failed to fetch quote:');
    }

    const data = await response.json();
    return data;
}