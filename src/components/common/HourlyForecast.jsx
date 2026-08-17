import {
    Droplets,
    Wind,
} from "lucide-react";

import useWeatherStore from "../../stores/weatherStore";
import formatDateTime from "../../utils/DateAndTime";

function HourlyForecast() {
    const { forecast } = useWeatherStore();

    const weatherIconApi =
        import.meta.env.VITE_WEATHER_API_ICON;

    if (!forecast?.entries?.length) {
        return null;
    }

    const hourlyData =
        forecast.entries.slice(0, 8);

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

    return (
    <section className="w-full">
        <div className="mb-4 sm:mb-5">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 sm:text-2xl">
                Hourly Forecast
            </h2>

            <p className="mt-1 text-xs text-gray-400 dark:text-gray-500 sm:text-sm">
                Weather progression for the next 24 hours
            </p>
        </div>

        <div className="overflow-x-auto pb-2 scrollbar-none">
            <div className="flex min-w-max gap-3 sm:gap-4">
                {hourlyData.map((item, index) => {
                    const { time } =
                        formatDateTime(
                            item.timestamp,
                            forecast.timezone
                        );

                    const temperature =
                        item.temperature?.current !== null &&
                        item.temperature?.current !== undefined
                            ? Math.round(
                                item.temperature.current
                            )
                            : null;

                    const precipitation =
                        Math.round(
                            (item.precipitationProbability ?? 0) * 100
                        );

                    const windSpeed =
                        item.wind?.speed !== null &&
                        item.wind?.speed !== undefined
                            ? (
                                item.wind.speed * 3.6
                            ).toFixed(1)
                            : null;

                    const windDirection =
                        item.wind?.direction !== null &&
                        item.wind?.direction !== undefined
                            ? windDirections[
                                Math.round(
                                    item.wind.direction / 45
                                ) % 8
                            ]
                            : null;

                    const isCurrent = index === 0;

                    return (
                        <article
                            key={item.timestamp}
                            className={`
                                flex w-32 shrink-0
                                flex-col
                                rounded-3xl
                                border
                                p-4
                                transition-all
                                duration-200
                                sm:w-36
                                sm:p-5

                                ${
                                    isCurrent
                                        ? `
                                            border-gray-800
                                            bg-gray-900
                                            text-white
                                            shadow-md
                                        `
                                        : `
                                            border-gray-100
                                            bg-white
                                            text-gray-900
                                            shadow-[0_8px_30px_rgba(0,0,0,0.04)]
                                            hover:-translate-y-0.5
                                            hover:shadow-md

                                            dark:border-gray-800
                                            dark:bg-gray-900
                                            dark:text-gray-100
                                            dark:shadow-none
                                            dark:hover:bg-gray-800
                                        `
                                }
                            `}
                        >
                            {/* Time */}
                            <div className="text-center">
                                <span
                                    className={`
                                        text-xs font-semibold
                                        ${
                                            isCurrent
                                                ? "text-gray-300"
                                                : "text-gray-500 dark:text-gray-400"
                                        }
                                    `}
                                >
                                    {isCurrent
                                        ? "Now"
                                        : time}
                                </span>
                            </div>

                            {/* Weather */}
                            <div className="my-4 flex flex-col items-center">
                                <img
                                    src={`${weatherIconApi}/${item.condition?.icon}@2x.png`}
                                    alt={
                                        item.condition
                                            ?.description ||
                                        "Weather icon"
                                    }
                                    className="h-14 w-14 object-contain"
                                />

                                <span
                                    className={`
                                        mt-2 text-2xl font-semibold
                                        ${
                                            isCurrent
                                                ? "text-white"
                                                : "text-gray-900 dark:text-gray-100"
                                        }
                                    `}
                                >
                                    {temperature !== null
                                        ? `${temperature}°`
                                        : "—"}
                                </span>

                                <span
                                    className={`
                                        mt-1 max-w-full
                                        truncate text-center
                                        text-[11px]
                                        capitalize
                                        ${
                                            isCurrent
                                                ? "text-gray-400"
                                                : "text-gray-500 dark:text-gray-400"
                                        }
                                    `}
                                >
                                    {item.condition
                                        ?.description ||
                                        "Unknown"}
                                </span>
                            </div>

                            {/* Weather details */}
                            <div
                                className={`
                                    mt-auto
                                    space-y-2
                                    border-t
                                    pt-3
                                    text-[11px]
                                    ${
                                        isCurrent
                                            ? "border-gray-700 text-gray-300"
                                            : "border-gray-100 text-gray-400 dark:border-gray-800 dark:text-gray-500"
                                    }
                                `}
                            >
                                <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-1.5">
                                        <Droplets size={13} />

                                        <span>
                                            Rain
                                        </span>
                                    </div>

                                    <span className="font-medium">
                                        {precipitation}%
                                    </span>
                                </div>

                                <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-1.5">
                                        <Wind size={13} />

                                        <span>
                                            Wind
                                        </span>
                                    </div>

                                    <span className="font-medium">
                                        {windSpeed !== null
                                            ? `${windSpeed} ${
                                                windDirection ?? ""
                                            }`
                                            : "—"}
                                    </span>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </div>
    </section>
);
}

export default HourlyForecast;
