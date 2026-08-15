import { Droplets } from "lucide-react";
import useWeatherStore from "../../stores/weatherStore";
import formatDateTime from "../../utils/DateAndTime";

function HourlyForecast() {
    const { forecast } = useWeatherStore();

    const weatherIconApi =
        import.meta.env.VITE_WEATHER_API_ICON;

    if (!forecast?.entries?.length) return null;

    const hourlyData = forecast.entries.slice(0, 8);

    return (
        <section className="w-full">
            {/* Heading */}
            <div className="mb-4 sm:mb-5">
                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                    Hourly Forecast
                </h2>

                <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                    Next 24 hours
                </p>
            </div>

            {/* Scrollable hourly forecast */}
            <div
                className="
                    flex w-full gap-3
                    overflow-x-auto
                    pb-2
                    snap-x snap-mandatory
                    scrollbar-none
                    sm:gap-4
                "
            >
                {hourlyData.map((item, index) => {
                    const { time } = formatDateTime(
                        item.timestamp,
                        forecast.timezone
                    );

                    const temperature = Math.round(
                        item.temperature.current
                    );

                    const precipitation = Math.round(
                        (item.precipitationProbability ?? 0) * 100
                    );

                    return (
                        <article
                            key={item.timestamp}
                            className={`
                                flex w-24 shrink-0
                                snap-start
                                flex-col items-center
                                justify-between
                                rounded-3xl
                                px-3 py-4
                                transition-all duration-200

                                sm:w-28 sm:px-4 sm:py-5

                                ${
                                    index === 0
                                        ? "bg-gray-900 text-white shadow-md"
                                        : "bg-white text-gray-900 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-md"
                                }
                            `}
                        >
                            {/* Time */}
                            <span
                                className={`
                                    text-xs font-semibold
                                    ${
                                        index === 0
                                            ? "text-gray-300"
                                            : "text-gray-400"
                                    }
                                `}
                            >
                                {index === 0 ? "Now" : time}
                            </span>

                            {/* Weather icon */}
                            <img
                                src={`${weatherIconApi}/${item.condition.icon}@2x.png`}
                                alt={
                                    item.condition.description ||
                                    "Weather icon"
                                }
                                className="
                                    my-3 h-12 w-12
                                    object-contain
                                    sm:h-14 sm:w-14
                                "
                            />

                            {/* Temperature */}
                            <span className="text-xl font-bold sm:text-2xl">
                                {temperature}°
                            </span>

                            {/* Precipitation */}
                            <div
                                className={`
                                    mt-3 flex items-center gap-1
                                    text-[10px] font-medium
                                    sm:text-xs
                                    ${
                                        index === 0
                                            ? "text-blue-200"
                                            : "text-blue-500"
                                    }
                                `}
                            >
                                <Droplets size={12} />
                                <span>{precipitation}%</span>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}

export default HourlyForecast;