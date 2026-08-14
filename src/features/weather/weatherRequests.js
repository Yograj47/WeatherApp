const pendingRequests = new Map();

function buildRequestKey(query) {
    if (typeof query === "string") {
        return `city:${query.trim().toLowerCase()}`;
    }

    if (
        query &&
        typeof query.lat === "number" &&
        typeof query.lon === "number"
    ) {
        return `coords:${query.lat.toFixed(2)},${query.lon.toFixed(2)}`;
    }

    return null;
}

function getPendingRequest(query) {
    const key = buildRequestKey(query);

    if (!key) return null;

    return pendingRequests.get(key);
}

function setPendingRequest(query, promise) {
    const key = buildRequestKey(query);

    if (!key) return;

    pendingRequests.set(key, promise);
}

function removePendingRequest(query) {
    const key = buildRequestKey(query);

    if (!key) return;

    pendingRequests.delete(key);
}

export {
    getPendingRequest,
    setPendingRequest,
    removePendingRequest,
};