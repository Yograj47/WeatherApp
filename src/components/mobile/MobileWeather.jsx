import { Wind } from "lucide-react";
import useWeatherStore from "../../stores/weatherStore";
import formatDateTime from "../../utils/DateAndTime";
import SearchCity from "../SearchCity";

function MobileWeather() {
    const { weather, forecast } = useWeatherStore();
    
    const weatherIconApi = import.meta.env.VITE_WEATHER_API_ICON;

    if (!weather || !forecast) return null;

    const { time, day } = formatDateTime(
        weather.timestamp,
        weather.timezone
    );

    const currentIcon = weather.condition.icon;
    const currentDescription = weather.condition.description;

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
                <SearchCity />
            </div>

            {/* Current weather */}
            <div className="rounded-3xl bg-white p-5 shadow-sm">

                <div className="flex items-center gap-4">

                    <img
                        src={`${weatherIconApi}/${currentIcon}@4x.png`}
                        alt={currentDescription}
                        className="h-28 w-28 object-contain"
                    />

                    <div>
                        <div className="flex items-start">
                            <span className="text-6xl font-extralight leading-none">
                                {Math.round(
                                    weather.temperature.current
                                )}
                            </span>

                            <span className="mt-1 text-2xl font-light">
                                °C
                            </span>
                        </div>

                        <p className="mt-2 text-sm text-gray-400">
                            Feels like{" "}
                            {Math.round(
                                weather.temperature.feelsLike
                            )}°
                        </p>
                    </div>

                </div>

                <div className="mt-4">

                    <p className="font-medium capitalize text-gray-900">
                        {currentDescription}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-3 text-sm text-gray-500">

                        <span>
                            No precipitation
                        </span>

                        <span className="flex items-center gap-1">
                            <Wind size={14} />
                            {windSpeed} km/h {windDirection}
                        </span>

                    </div>

                </div>

                <div className="mt-4 border-t border-gray-100 pt-3 text-xs text-gray-400">
                    {day} · {time}
                </div>

            </div>
        </section>
    );
}

export default MobileWeather;