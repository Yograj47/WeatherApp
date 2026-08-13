import {
    Wind,
    Sunrise,
    Sunset,
    Droplets,
    Eye,
    Gauge,
} from "lucide-react";

import useWeatherStore from "../stores/weatherStore";

export default function TodayHighlights() {
    const { weather, forecast } = useWeatherStore();

    if (!weather || !forecast) return null;

    const current = weather;
    const forecastEntry = forecast.entries?.[0];

    if (!forecastEntry) return null;

    /* ---------------- WIND ---------------- */

    const windSpeed = (current.wind.speed * 3.6).toFixed(1);

    const windDeg = current.wind.direction ?? 0;

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

    const windDir =
        windDirections[Math.round(windDeg / 45) % 8];

    /* ---------------- SUNRISE / SUNSET ---------------- */

    const sunrise = weather.sun.sunrise
        ? new Date(weather.sun.sunrise * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        })
        : "--";

    const sunset = weather.sun.sunset
        ? new Date(weather.sun.sunset * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        })
        : "--";

    /* ---------------- HUMIDITY ---------------- */

    const humidity = current.atmosphere.humidity;

    /* ---------------- VISIBILITY ---------------- */

    const visibilityKm =
        current.atmosphere.visibility != null
            ? (current.atmosphere.visibility / 1000).toFixed(1)
            : "--";

    /* ---------------- CLOUD COVER ---------------- */

    const cloudiness = current.atmosphere.cloudiness;

    /* ---------------- PRESSURE ---------------- */

    const pressure = current.atmosphere.pressure;

    return (
        <div className="mt-8">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Today's Highlights
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

                {/* Wind */}

                <HighlightCard title="Wind Status">
                    <div className="flex flex-col">
                        <div className="flex items-baseline gap-1">
                            <span className="text-5xl font-semibold">
                                {windSpeed}
                            </span>

                            <span className="text-xl text-gray-400">
                                km/h
                            </span>
                        </div>

                        <div className="mt-4 flex items-center gap-2">
                            <div className="rounded-full border border-gray-100 p-2">
                                <Wind
                                    size={16}
                                    className="text-blue-500"
                                />
                            </div>

                            <span className="text-sm font-medium">
                                {windDir}
                            </span>
                        </div>
                    </div>
                </HighlightCard>

                {/* Sunrise / Sunset */}

                <HighlightCard title="Sunrise & Sunset">
                    <div className="space-y-4">

                        <div className="flex items-center gap-4">
                            <div className="rounded-full bg-yellow-100 p-2">
                                <Sunrise
                                    className="text-yellow-600"
                                    size={20}
                                />
                            </div>

                            <p className="text-xl font-bold">
                                {sunrise}
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="rounded-full bg-yellow-100 p-2">
                                <Sunset
                                    className="text-yellow-600"
                                    size={20}
                                />
                            </div>

                            <p className="text-xl font-bold">
                                {sunset}
                            </p>
                        </div>

                    </div>
                </HighlightCard>

                {/* Humidity */}

                <HighlightCard title="Humidity">
                    <div className="flex h-full items-center justify-between">

                        <span className="text-5xl font-semibold">
                            {humidity}
                            <span className="text-2xl font-normal">
                                %
                            </span>
                        </span>

                        <div className="relative h-20 w-6 overflow-hidden rounded-full bg-gray-100">
                            <div
                                className="absolute bottom-0 w-full rounded-full bg-blue-500"
                                style={{
                                    height: `${humidity}%`,
                                }}
                            />
                        </div>

                    </div>

                    <p className="mt-2 text-sm font-medium">
                        {humidity > 70
                            ? "High 💧"
                            : "Normal 👍🏻"}
                    </p>
                </HighlightCard>

                {/* Visibility */}

                <HighlightCard title="Visibility">
                    <div className="flex flex-col">

                        <div className="flex items-baseline gap-1">
                            <span className="text-5xl font-semibold">
                                {visibilityKm}
                            </span>

                            <span className="text-xl text-gray-400">
                                km
                            </span>
                        </div>

                        <p className="mt-6 text-sm font-medium text-gray-400">
                            {visibilityKm !== "--" &&
                            Number(visibilityKm) < 5
                                ? "Poor 😷"
                                : "Good 👀"}
                        </p>

                    </div>
                </HighlightCard>

                {/* Cloud Cover */}

                <HighlightCard title="Cloud Cover">
                    <div className="flex items-center justify-between">

                        <span className="text-5xl font-semibold">
                            {cloudiness}
                            <span className="text-2xl font-normal">
                                %
                            </span>
                        </span>

                        <div className="relative h-20 w-6 overflow-hidden rounded-full bg-gray-100">
                            <div
                                className="absolute bottom-0 w-full rounded-full bg-gray-400"
                                style={{
                                    height: `${cloudiness}%`,
                                }}
                            />
                        </div>

                    </div>

                    <p className="mt-2 text-sm font-medium">
                        {cloudiness > 70
                            ? "Cloudy ☁️"
                            : cloudiness > 30
                                ? "Partly Cloudy ⛅"
                                : "Mostly Clear ☀️"}
                    </p>
                </HighlightCard>

                {/* Pressure */}

                <HighlightCard title="Atmospheric Pressure">
                    <div className="flex flex-col">

                        <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-semibold">
                                {pressure}
                            </span>

                            <span className="text-xl text-gray-400">
                                hPa
                            </span>
                        </div>

                        <div className="mt-4 flex items-center gap-2">
                            <div className="rounded-full border border-gray-100 p-2">
                                <Gauge
                                    size={16}
                                    className="text-purple-500"
                                />
                            </div>

                            <span className="text-sm font-medium">
                                Atmospheric pressure
                            </span>
                        </div>

                    </div>
                </HighlightCard>

            </div>
        </div>
    );
}

function HighlightCard({ title, children }) {
    return (
        <div className="flex h-45 flex-col justify-between rounded-4xl border border-transparent bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all hover:border-gray-100">
            <h3 className="mb-2 text-sm font-medium text-gray-400">
                {title}
            </h3>

            <div className="flex flex-1 flex-col justify-center">
                {children}
            </div>
        </div>
    );
}