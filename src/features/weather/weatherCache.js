const CACHE_PREFIX = "weather-cache:";
// const CACHE_TTL = 10 * 60 * 1000; // 10 minutes
const CACHE_TTL = 5000;

function buildCacheKey(query) {
    if (typeof query === "string") {
        return `${CACHE_PREFIX}city:${query.trim().toLowerCase()}`;
    }

    if (
        query &&
        typeof query.lat === "number" &&
        typeof query.lon === "number"
    ) {
        return `${CACHE_PREFIX}coords:${query.lat.toFixed(2)},${query.lon.toFixed(2)}`;
    }

    return null;
}

function get(query) {
    const key = buildCacheKey(query);

    if (!key) return null;

    try {
        const stored = localStorage.getItem(key);

        if (!stored) return null;

        const cached = JSON.parse(stored);

        if (!cached.timestamp || !cached.data) {
            localStorage.removeItem(key);
            return null;
        }

        return cached.data;
    } catch (error) {
        console.warn("Weather cache read failed:", error);
        return null;
    }
}

function isStale(query) {
    const key = buildCacheKey(query);

    if (!key) return false;

    try {
        const stored = localStorage.getItem(key);

        if (!stored) return false;

        const cached = JSON.parse(stored);

        if (!cached.timestamp) return false;

        console.log(
            "Cache age:",
            Date.now() - cached.timestamp
        );

        return (
            Date.now() - cached.timestamp > CACHE_TTL
        );
    } catch {
        return false;
    }
}

function set(query, data) {
    const key = buildCacheKey(query);

    if (!key || !data) return;

    try {
        const cacheEntry = {
            timestamp: Date.now(),
            data,
        };

        localStorage.setItem(
            key,
            JSON.stringify(cacheEntry)
        );
    } catch (error) {
        console.warn("Weather cache write failed:", error);
    }
}

function remove(query) {
    const key = buildCacheKey(query);

    if (!key) return;

    localStorage.removeItem(key);
}

function clear() {
    const keys = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        if (key?.startsWith(CACHE_PREFIX)) {
            keys.push(key);
        }
    }

    keys.forEach((key) => {
        localStorage.removeItem(key);
    });
}

export {
    get,
    isStale,
    set,
    remove,
    clear,
};