let errorReporter = null;

export const setErrorReporter = (reporterFn) => {
    errorReporter = reporterFn;
};

export const logError = (error, context = {}) => {
    const normalized = {
        message: error.message,
        stack: error.stack,
        cause: error.cause,
        timestamp: new Date().toISOString(),
        ...context,
    };

    console.error(`[Error] ${context.component || "Unknown"}`, normalized);

    if (process.env.NODE_ENV === "production" && errorReporter) {
        errorReporter(error, context);
    }
};