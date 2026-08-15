import {
    Droplets,
    Eye,
    Gauge,
    Wind,
} from "lucide-react";
import useWeatherStore from "../../stores/weatherStore";
import formatDateTime from "../../utils/DateAndTime";
import MobileSearch from "../mobile/MobileSearch";

function TabletWeather() {
    const { location, weather } = useWeatherStore();

    const weatherIconApi = import.meta.env.VITE_WEATHER_API_ICON;

    if (!weather) return null;

    const { time, day } = formatDateTime(
        weather.timestamp,
        weather.timezone
    );

    const cityName =
        weather.location?.name ||
        location?.value ||
        "Unknown location";

    const country = weather.location?.country || "";

    const currentIcon = weather.condition.icon;
    const description = weather.condition.description;

    const temperature = Math.round(weather.temperature.current);
    const feelsLike = Math.round(weather.temperature.feelsLike);

    const humidity = weather.atmosphere.humidity;

    const windSpeed = (weather.wind.speed * 3.6).toFixed(1);

    const windDirections = [
        "N",
        "NE",
        "E",
        "SE",
        "S",
        "SW",
        "W",
        "NW",
    ];

    const windDirection =
        windDirections[
        Math.round((weather.wind.direction ?? 0) / 45) % 8
        ];

    const visibility =
        weather.atmosphere.visibility != null
            ? (weather.atmosphere.visibility / 1000).toFixed(1)
            : "—";

    const pressure = weather.atmosphere.pressure ?? "—";

    return (
        <section className="space-y-4">
            <MobileSearch />

            <div className="overflow-hidden rounded-4xl bg-white shadow-sm">
                <div className="grid grid-cols-2 divide-x divide-gray-100">
                    {/* Main weather */}
                    <div className="flex min-h-72 flex-col justify-between p-7">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                Current Weather
                            </p>

                            <h1 className="mt-2 text-2xl font-semibold text-gray-900">
                                {cityName}
                            </h1>

                            {country && (
                                <p className="mt-1 text-sm text-gray-400">
                                    {country}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center gap-5">
                            <img
                                src={`${weatherIconApi}/${currentIcon}@4x.png`}
                                alt={description || "Weather icon"}
                                className="h-28 w-28 object-contain"
                            />

                            <div>
                                <div className="flex items-start">
                                    <span className="text-7xl font-extralight leading-none tracking-tight text-gray-900">
                                        {temperature}
                                    </span>

                                    <span className="mt-1 text-2xl font-light text-gray-400">
                                        °C
                                    </span>
                                </div>

                                <p className="mt-3 text-sm font-medium capitalize text-gray-800">
                                    {description}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-gray-400">
                            <span className="font-medium text-gray-700">
                                {day}
                            </span>

                            <span>·</span>

                            <span>{time}</span>
                        </div>
                    </div>

                    {/* Weather details */}
                    <div className="flex min-h-72 flex-col justify-center p-7">
                        <p className="mb-6 text-xs font-medium uppercase tracking-wide text-gray-400">
                            Weather Details
                        </p>

                        <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                            <WeatherStat
                                icon={Droplets}
                                label="Humidity"
                                value={`${humidity}%`}
                            />

                            <WeatherStat
                                icon={Wind}
                                label="Wind"
                                value={`${windSpeed} km/h ${windDirection}`}
                            />

                            <WeatherStat
                                icon={Eye}
                                label="Visibility"
                                value={`${visibility} km`}
                            />

                            <WeatherStat
                                icon={Gauge}
                                label="Pressure"
                                value={`${pressure} hPa`}
                            />
                        </div>

                        <div className="mt-6 flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
                            <span className="text-sm text-gray-400">
                                Feels like
                            </span>

                            <span className="text-sm font-semibold text-gray-800">
                                {feelsLike}°C
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function WeatherStat({ icon, label, value }) {
   const Icon = icon;
    return (
        <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-50 text-gray-500">
                <Icon size={16} strokeWidth={2} />
            </div>

            <div className="min-w-0">
                <p className="text-xs text-gray-400">
                    {label}
                </p>

                <p className="mt-0.5 truncate text-sm font-semibold text-gray-800">
                    {value}
                </p>
            </div>
        </div>
    );
}

export default TabletWeather;