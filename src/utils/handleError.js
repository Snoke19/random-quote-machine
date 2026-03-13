export function handleError(error) {
    if (error.response) {
        const { data: res = {} } = error.response;

        const info = {
            type: res.type || "Unknown Type",
            code: res.code || "Unknown Code",
            message: res.message || "No message provided",
            details: res.details || {},
            path: res.path || "Unknown path",
            timestamp: new Date(res.timestamp || Date.now()),
        };

        console.error("Server Error:", info);

        const errorToThrow = new Error(`Server Error: ${info.message}`);
        errorToThrow.cause = info;
        throw errorToThrow;

    }

    if (error.request) {
        if (!navigator.onLine) {
            throw new Error("You appear to be offline. Please check your connection.");
        }
        if (error.code === 'ECONNABORTED' || error.message.includes("timeout")) {
            throw new Error("The request timed out. Please try again later.");
        }
        throw new Error("No response from server. Please check your network.");
    }

    const setupMsg = error?.message || "An unexpected error occurred";
    console.error("Setup/Unknown Error:", setupMsg);
    throw new Error(setupMsg);
}
