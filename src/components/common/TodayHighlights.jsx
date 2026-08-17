import { useEffect, useState } from "react";
import {
    Wind,
    Sunrise,
    Sunset,
    Gauge,
} from "lucide-react";

import useWeatherStore from "../../stores/weatherStore";
import {
    getSunData,
    getWindData,
    getHumidityLabel,
    getVisibilityData,
    getCloudinessLabel,
} from "../../utils/TodayHighLights";

export default function TodayHighlights() {
    const { weather } = useWeatherStore();

    const [now, setNow] = useState(
        () => Math.floor(Date.now() / 1000)
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(Math.floor(Date.now() / 1000));
        }, 60_000);

        return () => clearInterval(interval);
    }, []);

    if (!weather) return null;

    const wind = getWindData(weather.wind);

    const sun = getSunData(
        weather.sun?.sunrise,
        weather.sun?.sunset,
        weather.timezone,
        now
    );

    const humidity =
        weather.atmosphere?.humidity ?? null;

    const visibility =
        getVisibilityData(
            weather.atmosphere?.visibility
        );

    const cloudiness =
        weather.atmosphere?.cloudiness ?? null;

    const pressure =
        weather.atmosphere?.pressure ?? null;

    return (
        <section className="flex min-h-0 flex-1 flex-col">
            <div className="mb-4">
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 sm:text-2xl">
                    Today's Highlights
                </h2>

                <p className="mt-1 text-xs text-gray-400 dark:text-gray-500 sm:text-sm">
                    Current atmospheric conditions
                </p>
            </div>

            <div className="grid flex-1 grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-4">

                {/* Wind */}
                <HighlightCard title="Wind Status">
                    <div className="flex flex-col">
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-semibold text-gray-900 dark:text-gray-100 sm:text-4xl lg:text-5xl">
                                {wind.speed}
                            </span>

                            <span className="text-xs text-gray-400 dark:text-gray-500 sm:text-sm">
                                km/h
                            </span>
                        </div>

                        <div className="mt-3 flex items-center gap-2 sm:mt-4">
                            <div className="rounded-full border border-gray-100 p-1.5 dark:border-gray-800 sm:p-2">
                                <Wind
                                    size={14}
                                    className="text-blue-500 sm:h-4 sm:w-4"
                                />
                            </div>

                            <span className="text-xs font-medium text-gray-800 dark:text-gray-200 sm:text-sm">
                                {wind.direction}
                            </span>
                        </div>
                    </div>
                </HighlightCard>

                {/* Sunrise / Sunset */}
                <HighlightCard title="Sunrise & Sunset">
                    <div className="space-y-4">
                        <SunEvent
                            icon={Sunrise}
                            label="Sunrise"
                            time={sun.sunriseTime}
                            active={sun.nextEvent === "sunrise"}
                            countdown={
                                sun.nextEvent === "sunrise"
                                    ? sun.countdown
                                    : null
                            }
                        />

                        <SunEvent
                            icon={Sunset}
                            label="Sunset"
                            time={sun.sunsetTime}
                            active={sun.nextEvent === "sunset"}
                            countdown={
                                sun.nextEvent === "sunset"
                                    ? sun.countdown
                                    : null
                            }
                        />
                    </div>
                </HighlightCard>

                {/* Humidity */}
                <HighlightCard title="Humidity">
                    <div className="flex items-center justify-between gap-3">
                        <span className="text-3xl font-semibold text-gray-900 dark:text-gray-100 sm:text-4xl lg:text-5xl">
                            {humidity ?? "--"}

                            {humidity != null && (
                                <span className="text-base font-normal text-gray-500 dark:text-gray-400 sm:text-xl">
                                    %
                                </span>
                            )}
                        </span>

                        {humidity != null && (
                            <div className="relative h-14 w-4 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800 sm:h-20 sm:w-5">
                                <div
                                    className="absolute bottom-0 w-full rounded-full bg-blue-500"
                                    style={{
                                        height: `${humidity}%`,
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    <p className="mt-2 text-[10px] font-medium text-gray-600 dark:text-gray-400 sm:text-xs">
                        {getHumidityLabel(humidity)}
                    </p>
                </HighlightCard>

                {/* Visibility */}
                <HighlightCard title="Visibility">
                    <div className="flex flex-col">
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-semibold text-gray-900 dark:text-gray-100 sm:text-4xl lg:text-5xl">
                                {visibility.value}
                            </span>

                            {visibility.value !== "--" && (
                                <span className="text-xs text-gray-400 dark:text-gray-500 sm:text-sm">
                                    km
                                </span>
                            )}
                        </div>

                        <p className="mt-3 text-[10px] font-medium text-gray-400 dark:text-gray-500 sm:mt-6 sm:text-xs">
                            {visibility.label}
                        </p>
                    </div>
                </HighlightCard>

                {/* Cloud Cover */}
                <HighlightCard title="Cloud Cover">
                    <div className="flex items-center justify-between gap-3">
                        <span className="text-3xl font-semibold text-gray-900 dark:text-gray-100 sm:text-4xl lg:text-5xl">
                            {cloudiness ?? "--"}

                            {cloudiness != null && (
                                <span className="text-base font-normal text-gray-500 dark:text-gray-400 sm:text-xl">
                                    %
                                </span>
                            )}
                        </span>

                        {cloudiness != null && (
                            <div className="relative h-14 w-4 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800 sm:h-20 sm:w-5">
                                <div
                                    className="absolute bottom-0 w-full rounded-full bg-gray-400 dark:bg-gray-500"
                                    style={{
                                        height: `${cloudiness}%`,
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    <p className="mt-2 text-[10px] font-medium text-gray-600 dark:text-gray-400 sm:text-xs">
                        {getCloudinessLabel(cloudiness)}
                    </p>
                </HighlightCard>

                {/* Pressure */}
                <HighlightCard title="Atmospheric Pressure">
                    <div className="flex flex-col">
                        <div className="flex items-baseline gap-1 sm:gap-2">
                            <span className="text-3xl font-semibold text-gray-900 dark:text-gray-100 sm:text-4xl lg:text-5xl">
                                {pressure ?? "--"}
                            </span>

                            {pressure != null && (
                                <span className="text-xs text-gray-400 dark:text-gray-500 sm:text-sm">
                                    hPa
                                </span>
                            )}
                        </div>

                        <div className="mt-3 flex items-center gap-2 sm:mt-4">
                            <div className="rounded-full border border-gray-100 p-1.5 dark:border-gray-800 sm:p-2">
                                <Gauge
                                    size={14}
                                    className="text-purple-500 sm:h-4 sm:w-4"
                                />
                            </div>

                            <span className="text-[10px] font-medium text-gray-700 dark:text-gray-300 sm:text-xs">
                                Atmospheric pressure
                            </span>
                        </div>
                    </div>
                </HighlightCard>

            </div>
        </section>
    );
}

function SunEvent({
    icon,
    label,
    time,
    active,
    countdown,
}) {
    const Icon = icon;

    return (
        <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                <div className="rounded-full bg-yellow-100 p-1.5 dark:bg-yellow-900/30 sm:p-2">
                    <Icon
                        size={16}
                        className="text-yellow-600 dark:text-yellow-400"
                    />
                </div>

                <div>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 sm:text-xs">
                        {label}
                    </p>

                    <p className="text-sm font-bold text-gray-900 dark:text-gray-100 sm:text-lg">
                        {time}
                    </p>
                </div>
            </div>

            {active && (
                <span className="shrink-0 text-[10px] font-medium text-gray-400 dark:text-gray-500 sm:text-xs">
                    {countdown}
                </span>
            )}
        </div>
    );
}

function HighlightCard({ title, children }) {
    return (
        <article
            className="
                flex min-h-0 flex-col
                justify-between
                rounded-2xl
                border border-transparent
                bg-white
                p-4
                shadow-[0_4px_20px_rgba(0,0,0,0.03)]
                transition-all
                hover:-translate-y-0.5
                hover:shadow-md

                dark:border-gray-800
                dark:bg-gray-900
                dark:shadow-none
                dark:hover:bg-gray-800

                sm:rounded-3xl
                sm:p-5
            "
        >
            <h3 className="text-[11px] font-medium text-gray-400 dark:text-gray-500 sm:text-xs">
                {title}
            </h3>

            <div className="mt-4">
                {children}
            </div>
        </article>
    );
}
