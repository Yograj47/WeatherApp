import { Wind } from "lucide-react";
import useWeatherStore from "../../stores/weatherStore";
import formatDateTime from "../../utils/DateAndTime";
import MobileSearch from "./MobileSearch"

function MobileWeather() {
    const { weather, forecast } = useWeatherStore();

    const weatherIconApi = import.meta.env.VITE_WEATHER_API_ICON;

    if (!weather || !forecast) return null;

    const { time, day } = formatDateTime(
        weather.timestamp,
        weather.timezone
    );

    const currentIcon = weather?.condition?.icon;
    const currentDescription = weather?.condition?.description;

    const windSpeed = (
        weather.wind.speed * 3.6
    ).toFixed(1);

    const windDirection = [
        "N",
        "NE",
        "E",
        "SE",
        "S",
        "SW",
        "W",
        "NW",
    ][Math.round(weather.wind.direction / 45) % 8];

    return (
        <section className="mb-8">
            {/* Search */}
            <div className="mb-6">
                <MobileSearch />
            </div>

            {/* Current weather */}
            <div className="overflow-hidden rounded-4xl bg-white shadow-sm dark:bg-gray-900 dark:shadow-none">
                {/* Main weather */}
                <div className="flex flex-col items-center px-6 pb-6 pt-4 text-center">
                    <img
                        src={`${weatherIconApi}/${currentIcon}@4x.png`}
                        alt={currentDescription || "Weather icon"}
                        className="h-32 w-32 object-contain"
                    />

                    <div className="flex items-start justify-center">
                        <span className="text-7xl font-extralight leading-none tracking-tight text-gray-900 dark:text-gray-100">
                            {Math.round(weather.temperature.current)}
                        </span>

                        <span className="mt-2 text-2xl font-light text-gray-500 dark:text-gray-400">
                            °C
                        </span>
                    </div>

                    <p className="mt-3 text-base font-medium capitalize text-gray-900 dark:text-gray-100">
                        {currentDescription}
                    </p>

                    <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
                        Feels like{" "}
                        {Math.round(weather.temperature.feelsLike)}°
                    </p>

                    <div className="mt-4 flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500">
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                            {day}
                        </span>

                        <span>·</span>

                        <span>{time}</span>
                    </div>
                </div>

                {/* Quick details */}
                <div className="grid grid-cols-3 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex flex-col items-center gap-1 px-2 py-4">
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                            Humidity
                        </span>

                        <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                            {weather.atmosphere.humidity}%
                        </span>
                    </div>

                    <div className="flex flex-col items-center gap-1 border-x border-gray-100 px-2 py-4 dark:border-gray-800">
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                            Wind
                        </span>

                        <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                            {windSpeed} km/h {windDirection}
                        </span>
                    </div>

                    <div className="flex flex-col items-center gap-1 px-2 py-4">
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                            Visibility
                        </span>

                        <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                            {(weather.atmosphere.visibility / 1000).toFixed(1)} km
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MobileWeather;