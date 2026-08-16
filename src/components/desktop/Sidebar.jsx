import useWeatherStore from "../../stores/weatherStore.js";
import DesktopSearch from "./DesktopSearch.jsx";
import formatDateTime from "../../utils/DateAndTime";

function Sidebar() {
    const { location, weather, forecast } = useWeatherStore();

    const weatherIconApi =
        import.meta.env.VITE_WEATHER_API_ICON;

    if (!weather || !forecast) {
        return null;
    }

    const currentIcon = weather.condition.icon;
    const currentDescription =
        weather.condition.description;

    const feelsLike = Math.round(
        weather.temperature.feelsLike
    );

    const cityName =
        weather.location?.name ||
        location?.value ||
        "Unknown location";

    const country =
        weather.location?.country || "";

    const hourlyEntries =
        forecast.entries?.slice(0, 8) || [];

    return (
        <aside className="h-full min-h-0 p-5">
            <div className="flex h-full min-h-0 flex-col gap-6 rounded-3xl bg-white p-5 shadow-sm">

                {/* Top: Search + Current Weather */}
                <section className="shrink-0">
                    <div className="mb-8">
                        <DesktopSearch />
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <div>
                            <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                                {cityName}
                            </h2>

                            {country && (
                                <p className="mt-1 text-xs text-gray-400">
                                    {country}
                                </p>
                            )}
                        </div>

                        <div className="my-5">
                            <img
                                src={`${weatherIconApi}/${currentIcon}@4x.png`}
                                alt={
                                    currentDescription ||
                                    "Weather icon"
                                }
                                className="h-24 w-24 object-contain"
                            />
                        </div>

                        <div className="flex items-start justify-center">
                            <span className="text-6xl font-extralight leading-none tracking-tight text-gray-900">
                                {Math.round(
                                    weather.temperature.current
                                )}
                            </span>

                            <span className="mt-1 text-xl font-light text-gray-500">
                                °C
                            </span>
                        </div>

                        <p className="mt-2 text-xs text-gray-400">
                            Feels like {feelsLike}°C
                        </p>

                        <p className="mt-3 text-sm font-medium capitalize text-gray-800">
                            {currentDescription}
                        </p>
                    </div>
                </section>

                {/* Middle: Hourly Forecast */}
                <section className="flex min-h-0 flex-1 flex-col">
                    <div className="mb-4 shrink-0">
                        <h3 className="text-base font-semibold text-gray-900">
                            Hourly Forecast
                        </h3>

                        <p className="mt-1 text-xs text-gray-400">
                            Next 24 hours
                        </p>
                    </div>

                    <div className="min-h-0 flex-1 overflow-y-auto pr-1">
                        <div className="space-y-2">
                            {hourlyEntries.map(
                                (entry, index) => (
                                    <HourlyItem
                                        key={entry.timestamp}
                                        entry={entry}
                                        index={index}
                                        weatherIconApi={
                                            weatherIconApi
                                        }
                                        timezone={
                                            forecast.timezone
                                        }
                                    />
                                )
                            )}
                        </div>
                    </div>
                </section>

            </div>
        </aside>
    );
}

function HourlyItem({
    entry,
    index,
    weatherIconApi,
    timezone,
}) {
    const { time } = formatDateTime(
        entry.timestamp,
        timezone
    );

    const temperature = Math.round(
        entry.temperature.current
    );

    const precipitation =
        Math.round(
            entry.precipitationProbability
        );

    const isCurrent = index === 0;

    return (
        <div
            className={`
                flex items-center justify-between
                rounded-2xl px-3 py-3
                transition
                ${
                    isCurrent
                        ? "bg-gray-900 text-white"
                        : "bg-gray-50 text-gray-900"
                }
            `}
        >
            <div className="flex min-w-0 items-center gap-3">
                <span
                    className={`
                        w-14 shrink-0 text-xs font-medium
                        ${
                            isCurrent
                                ? "text-white"
                                : "text-gray-500"
                        }
                    `}
                >
                    {isCurrent ? "Now" : time}
                </span>

                <img
                    src={`${weatherIconApi}/${entry.condition.icon}@2x.png`}
                    alt={
                        entry.condition.description ||
                        "Weather icon"
                    }
                    className="h-9 w-9 shrink-0 object-contain"
                />
            </div>

            <div className="flex items-center gap-4">
                <span
                    className={`
                        text-xs
                        ${
                            isCurrent
                                ? "text-white/70"
                                : "text-gray-400"
                        }
                    `}
                >
                    {precipitation}%
                </span>

                <span className="w-9 text-right text-sm font-semibold">
                    {temperature}°
                </span>
            </div>
        </div>
    );
}

export default Sidebar;