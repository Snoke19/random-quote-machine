const bucket = "quote_categories";

function handleLocalStorageOperation(operation, ...args) {
  try {
    return operation(...args);
  } catch (error) {
    console.error("LocalStorage Error:", error);
    return null;
  }
}

function saveCategoriesLocally(categories) {
  const data = JSON.stringify(categories);
  handleLocalStorageOperation(() => localStorage.setItem(bucket, data));
}

function getLocalCategories() {
  const categories = handleLocalStorageOperation(() =>
    localStorage.getItem(bucket)
  );

  return categories ? JSON.parse(categories) : [];
}

function removeLastLocalCategory() {
  const categories = getLocalCategories();
  if (categories.length > 0) {
    const categoriesWithoutLast = categories.slice(0, -1);
    saveCategoriesLocally(categoriesWithoutLast);
  }
}

function removeLocalCategory(index) {
  const categories = getLocalCategories();
  if (index >= 0 && index < categories.length) {
    const newCategories = [
      ...categories.slice(0, index),
      ...categories.slice(index + 1),
    ];
    saveCategoriesLocally(newCategories);
  }
}

export {
  saveCategoriesLocally,
  getLocalCategories,
  removeLastLocalCategory,
  removeLocalCategory,
};
