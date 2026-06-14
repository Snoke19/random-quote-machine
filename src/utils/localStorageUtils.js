const bucket = "quote_categories";

const EXPIRY_MS = 30 * 24 * 60 * 60 * 1000; // 30 days
const STORAGE_LIMIT = 5 * 1024 * 1024; // 5MB

function handleLocalStorageOperation(operation) {
    try {
        return operation();
    } catch (error) {
        console.error("LocalStorage Error:", error);
        return null;
    }
}

function safeParse(value, fallback = []) {
    try {
        return JSON.parse(value);
    } catch (error) {
        console.warn("Corrupted localStorage data:", error);
        return fallback;
    }
}

function checkStorageLimit(extraKey = "", extraValue = "") {
    let totalSize = 0;

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key) || "";
        totalSize += key.length + value.length;
    }

    totalSize += extraKey.length + extraValue.length;

    return totalSize < STORAGE_LIMIT;
}

function saveCategoriesLocally(categories) {
    const payload = {
        categories,
        expiry: Date.now() + EXPIRY_MS,
    };

    const data = JSON.stringify(payload);

    if (!checkStorageLimit(bucket, data)) {
        console.warn("LocalStorage limit exceeded");
        return;
    }

    handleLocalStorageOperation(() =>
        localStorage.setItem(bucket, data)
    );
}

function getLocalCategories() {
    const raw = handleLocalStorageOperation(() =>
        localStorage.getItem(bucket)
    );

    if (!raw) return [];

    const parsed = safeParse(raw, null);

    if (!parsed) return [];

    // Backward compatibility (old format: plain array)
    if (Array.isArray(parsed)) return parsed;

    // Expired data cleanup
    if (parsed.expiry && Date.now() > parsed.expiry) {
        handleLocalStorageOperation(() =>
            localStorage.removeItem(bucket)
        );
        return [];
    }

    return parsed.categories || [];
}

function removeLastLocalCategory() {
    const categories = getLocalCategories();

    if (categories.length > 0) {
        saveCategoriesLocally(categories.slice(0, -1));
    }
}

function removeLocalCategory(index) {
    const categories = getLocalCategories();

    if (index >= 0 && index < categories.length) {
        saveCategoriesLocally([
            ...categories.slice(0, index),
            ...categories.slice(index + 1),
        ]);
    }
}

export {
    saveCategoriesLocally,
    getLocalCategories,
    removeLastLocalCategory,
    removeLocalCategory,
};
