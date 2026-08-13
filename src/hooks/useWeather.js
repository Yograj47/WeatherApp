import { useEffect, useCallback } from "react";
import useWeatherStore from "../stores/weatherStore";
import {
    getCurrentWeather,
    getForecast,
} from "../services/openWeatherApi";

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
            const params =
                typeof query === "string"
                    ? { q: query }
                    : {
                        lat: query.lat,
                        lon: query.lon,
                    };

            const [weatherData, forecastData] = await Promise.all([
                getCurrentWeather(params),
                getForecast(params),
            ]);

            setWeather(weatherData);
            setForecast(forecastData);
        } catch (err) {
            setError(err.message || "Failed to fetch weather");
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