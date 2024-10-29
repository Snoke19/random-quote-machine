import AxiosInstance from "../utils/AxiosClient";
import {handleError} from "../utils/handleError";

export default async function fetchCategoriesByName(category) {
  const validation = isCategoryName(category);

  if (!validation.valid) {
    console.error(validation.message);
    throw new Error(validation.message);
  }

  try {
    const response = await AxiosInstance.get(`/categories/${category}`);
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
