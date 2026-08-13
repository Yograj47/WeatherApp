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

            const [weatherData, forecastData] = await Promise.all([
                getCurrentWeather(params),
                getForecast(params),
            ]);

            // -----------------------------
            // 4. Normalize API response
            // -----------------------------

            const mappedWeather =
                mapCurrentWeather(weatherData);

            const mappedForecast =
                mapForecast(forecastData);

            // -----------------------------
            // 5. Cache normalized data
            // -----------------------------

            setCachedWeather(query, {
                weather: mappedWeather,
                forecast: mappedForecast,
            });

            // -----------------------------
            // 6. Update application state
            // -----------------------------

            setWeather(mappedWeather);
            setForecast(mappedForecast);
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