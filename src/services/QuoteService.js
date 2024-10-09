import AxiosInstance from "../utils/AxiosClient";

export default async function fetchRandomQuoteByCategories(categories) {
  try {
    const categoriesArray = Array.isArray(categories)
      ? categories
      : [categories];
    const categoriesStr = categoriesArray.join(",");
    const response = await AxiosInstance.get(`/random/quote`, {
      params: { categories: categoriesStr },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

function handleError(error) {
  if (error.response) {
    const errorResponse = error.response.data;

    const errorResponseInfo = {
      type: errorResponse.type || "Unknown Type",
      code: errorResponse.code || "Unknown Code",
      message: errorResponse.message || "No message provided",
      details: errorResponse.details || {},
      path: errorResponse.path || "Unknown path",
      timestamp: new Date(errorResponse.timestamp || Date.now()),
    };

    console.error("Error fetching quote:", errorResponseInfo);

    throw new Error(
      `Failed to fetch quote: ${errorResponse.message || "Unknown error"}`,
      { cause: errorResponseInfo }
    );
  } else if (error.request) {
    if (error.message.includes("timeout")) {
      throw new Error("The request timed out. Please try again later.");
    } else if (!navigator.onLine) {
      throw new Error(
        "You appear to be offline. Please check your internet connection."
      );
    } else {
      throw new Error(
        "Something went wrong while fetching categories. Please try again."
      );
    }
  } else {
    console.error("Error during request setup:", error.message);
    throw new Error(`An unexpected error occurred: ${error.message}`);
  }
}
