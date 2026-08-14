import { useEffect, useCallback } from "react";
import useWeatherStore from "../stores/weatherStore";
import {
    getCurrentWeather,
    getForecast,
} from "../services/openWeatherApi";
import {
    mapCurrentWeather,
    mapForecast,
} from "../features/weather/weatherMapper";
import {
    get as getCachedWeather,
    set as setCachedWeather,
} from "../features/weather/weatherCache";
import {
    getPendingRequest,
    setPendingRequest,
    removePendingRequest,
} from "../features/weather/weatherRequests";

export default function useWeather(query) {
    const {
        setWeather,
        setForecast,
        setLoading,
        setError,
    } = useWeatherStore();

    const fetchWeather = useCallback(async () => {
        if (!query) return;

        setLoading(true);
        setError(null);

        try {
            // -----------------------------
            // 1. Check cache
            // -----------------------------

            const cachedData = getCachedWeather(query);

            if (cachedData) {
                setWeather(cachedData.weather);
                setForecast(cachedData.forecast);
                return;
            }

            const pendingRequest = getPendingRequest(query);

            if (pendingRequest) {
                const result = await pendingRequest;

                setWeather(result.weather);
                setForecast(result.forecast);

                return;
            }

            // -----------------------------
            // 2. Build API query
            // -----------------------------

            const params =
                typeof query === "string"
                    ? { q: query }
                    : {
                        lat: query.lat,
                        lon: query.lon,
                    };

            // -----------------------------
            // 3. Fetch API
            // -----------------------------

            const requestPromise = (async () => {
                const [weatherData, forecastData] =
                    await Promise.all([
                        getCurrentWeather(params),
                        getForecast(params),
                    ]);

                const mappedWeather =
                    mapCurrentWeather(weatherData);

                const mappedForecast =
                    mapForecast(forecastData);

                return {
                    weather: mappedWeather,
                    forecast: mappedForecast,
                };
            })();

            setPendingRequest(query, requestPromise);

            try {
                const result = await requestPromise;

                setCachedWeather(query, result);
                setWeather(result.weather);
                setForecast(result.forecast);
            }
            finally {
                removePendingRequest(query);
            }

        } catch (err) {
            setError(
                err.message || "Failed to fetch weather"
            );
        } finally {
            setLoading(false);
        }
    }, [
        query,
        setWeather,
        setForecast,
        setLoading,
        setError,
    ]);

    useEffect(() => {
        fetchWeather();
    }, [fetchWeather]);
}