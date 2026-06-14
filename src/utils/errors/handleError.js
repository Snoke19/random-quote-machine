import {normalizeError} from "./errorNormalizer";
import {logError} from "./errorLogger";

export function handleError(error, context = {}, shouldThrow = true) {
    const normalized = normalizeError(error);

    logError(error, {
        ...context,
        normalized,
    });

    if (shouldThrow) {
        const err = new Error(normalized.message);
        err.cause = normalized;
        throw err;
    }

    return normalized;
}