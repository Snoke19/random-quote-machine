export function normalizeError(error) {
    // Axios / HTTP response error
    if (error?.response) {
        const res = error.response.data || {};

        return {
            type: res.type || "ServerError",
            code: res.code || "UNKNOWN_CODE",
            message: res.message || "Server error occurred",
            details: res.details || {},
            path: res.path || null,
            status: error.response.status,
            timestamp: new Date(res.timestamp || Date.now()),
            isNetworkError: false,
            isOperational: true,
        };
    }

    // Network-level issues
    if (error?.request) {
        const offline = typeof navigator !== "undefined" && !navigator.onLine;

        return {
            type: offline ? "OfflineError" : "NetworkError",
            code: offline ? "OFFLINE" : "NO_RESPONSE",
            message: offline
                ? "You appear to be offline."
                : "No response from server.",
            details: {},
            status: null,
            timestamp: new Date(),
            isNetworkError: true,
            isOperational: true,
        };
    }

    // Unknown / setup errors
    return {
        type: "UnknownError",
        code: "UNKNOWN",
        message: error?.message || "An unexpected error occurred",
        details: {},
        status: null,
        timestamp: new Date(),
        isNetworkError: false,
        isOperational: false,
    };
}