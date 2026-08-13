const BASE_URL =
    import.meta.env.VITE_BASE_URL ||
    "https://api.openweathermap.org/data/2.5/";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

if (!API_KEY) {
    console.warn("VITE_WEATHER_API_KEY is not configured.");
}

async function request(endpoint, params) {
    const searchParams = new URLSearchParams({
        ...params,
        appid: API_KEY,
        units: "metric",
    });

    const response = await fetch(
        `${BASE_URL}${endpoint}?${searchParams.toString()}`
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Weather API request failed");
    }

    return data;
}

export async function getCurrentWeather(query) {
    return request("weather", query);
}

export async function getForecast(query) {
    return request("forecast", query);
}