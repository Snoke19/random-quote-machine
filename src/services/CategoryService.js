import AxiosInstance from "../utils/AxiosClient";
import {handleError} from "../utils/handleError";

export default async function fetchCategoriesByName(category, offset) {
  const categoryValidation = isCategoryName(category);
  const offsetValidation = isValidOffset(offset);

  if (!categoryValidation.valid) {
    console.error(categoryValidation.message);
    throw new Error(categoryValidation.message);
  }

  if (!offsetValidation.valid) {
    console.error(offsetValidation.message);
    throw new Error(offsetValidation.message);
  }

  try {
    const response = await AxiosInstance.get(`/categories/${category}`, {
      params: {offset: offset}
    });
    return response.data;
  } catch (error) {
    handleError(error);
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
