const CATEGORIES_API_URL = "http://localhost:8080/categories";

export default async function fetchCategoriesByName(category) {

    const validation = isCategoryName(category);
    
    if (!validation.valid) {
        console.error(validation.message);
        throw new Error(validation.message);
    }

    const response = await fetch(CATEGORIES_API_URL + "/" + category);

    if (!response.ok) {
        const errorResponse = await response.json();

        console.error("Error fetching categories:", {
            message: errorResponse.message,
            code: errorResponse.code,
            details: JSON.stringify(errorResponse.details),
            path: errorResponse.path,
        });

        throw new Error('Failed to fetch categories: ' + errorResponse.message);
    }

    const data = await response.json();
    return data;
}

const isCategoryName = (value) => {
    if (value === null) return { valid: false, message: "Cannot add null tag value!" };
    if (typeof str === "string" && value.length === 0) return { valid: false, message: "Cannot add empty tag value!" };
    if (!isNaN(Number(value))) return { valid: false, message: "Cannot add tag with only numbers!" };
    return { valid: true };
};