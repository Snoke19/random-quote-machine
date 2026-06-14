import AxiosInstance from "../utils/AxiosClient";
import {handleError} from "../utils/errors/handleError";

export default async function fetchCategoriesByName(category, offset, signal) {
    const categoryValidation = isCategoryName(category);
    const offsetValidation = isValidOffset(offset);

    if (!categoryValidation.valid || !offsetValidation.valid) {
        const msg = categoryValidation.message || offsetValidation.message;
        return handleError(
            new Error(msg),
            {component: "fetchCategoriesByName", category, offset},
            true
        );
    }

    try {
        const response = await AxiosInstance.get(`/categories/${category}`, {
            params: {offset},
            signal
        });
        return response.data;
    } catch (error) {
        return handleError(error, {
            component: "fetchCategoriesByName",
            category,
            offset,
            endpoint: `/categories/${category}`
        }, true);
    }
}

const isCategoryName = (value) => {
    if (value === null) {
        return {valid: false, message: "Cannot add null category value!"};
    }
    if (typeof value === "string" && value.length === 0) {
        return {valid: false, message: "Cannot add empty category value!"};
    }
    if (!isNaN(Number(value))) {
        return {valid: false, message: "Cannot add category with only numbers!"};
    }
    return {valid: true};
};

const isValidOffset = (value) => {
    if (value === null || value === undefined) {
        return {valid: false, message: "Offset cannot be null or undefined!"};
    }
    if (!Number.isInteger(value) || value < 0) {
        return {valid: false, message: "Offset must be a non-negative integer!"};
    }
    return {valid: true};
};
