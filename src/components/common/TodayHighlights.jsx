import {
    Wind,
    Sunrise,
    Sunset,
    Droplets,
    Eye,
    Gauge,
} from "lucide-react";
import useWeatherStore from "../../stores/weatherStore";


export default function TodayHighlights() {
    const { weather, forecast } = useWeatherStore();

    if (!weather || !forecast) return null;

    const current = weather;
    const forecastEntry = forecast.entries?.[0];

    if (!forecastEntry) return null;

    /* ---------------- WIND ---------------- */
    const windSpeed = (
        current.wind.speed * 3.6
    ).toFixed(1);

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
        ? new Date(weather.sun.sunrise * 1000).toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit",
            }
        )
        : "--";

    const sunset = weather.sun.sunset
        ? new Date(weather.sun.sunset * 1000).toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit",
            }
        )
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
        <section className="mt-8">
            <div className="mb-4 sm:mb-6">
                <h2 className="text-lg font-bold text-gray-900 sm:text-2xl">
                    Today's Highlights
                </h2>

                <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                    Current atmospheric conditions
                </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-5">

                {/* Wind */}
                <HighlightCard title="Wind Status">
                    <div className="flex flex-col">
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-semibold sm:text-4xl lg:text-5xl">
                                {windSpeed}
                            </span>

                            <span className="text-xs text-gray-400 sm:text-sm">
                                km/h
                            </span>
                        </div>

                        <div className="mt-3 flex items-center gap-2 sm:mt-4">
                            <div className="rounded-full border border-gray-100 p-1.5 sm:p-2">
                                <Wind
                                    size={14}
                                    className="text-blue-500 sm:h-4 sm:w-4"
                                />
                            </div>

                            <span className="text-xs font-medium sm:text-sm">
                                {windDir}
                            </span>
                        </div>
                    </div>
                </HighlightCard>

                {/* Sunrise / Sunset */}
                <HighlightCard title="Sunrise & Sunset">
                    <div className="space-y-3 sm:space-y-4">

                        <div className="flex items-center gap-2 sm:gap-4">
                            <div className="rounded-full bg-yellow-100 p-1.5 sm:p-2">
                                <Sunrise
                                    className="text-yellow-600"
                                    size={16}
                                />
                            </div>

                            <div>
                                <p className="text-[10px] text-gray-400 sm:text-xs">
                                    Sunrise
                                </p>

                                <p className="text-sm font-bold sm:text-lg">
                                    {sunrise}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-4">
                            <div className="rounded-full bg-yellow-100 p-1.5 sm:p-2">
                                <Sunset
                                    className="text-yellow-600"
                                    size={16}
                                />
                            </div>

                            <div>
                                <p className="text-[10px] text-gray-400 sm:text-xs">
                                    Sunset
                                </p>

                                <p className="text-sm font-bold sm:text-lg">
                                    {sunset}
                                </p>
                            </div>
                        </div>

                    </div>
                </HighlightCard>

                {/* Humidity */}
                <HighlightCard title="Humidity">
                    <div className="flex items-center justify-between gap-3">

                        <span className="text-3xl font-semibold sm:text-4xl lg:text-5xl">
                            {humidity}
                            <span className="text-base font-normal sm:text-xl">
                                %
                            </span>
                        </span>

                        <div className="relative h-14 w-4 overflow-hidden rounded-full bg-gray-100 sm:h-20 sm:w-5">
                            <div
                                className="absolute bottom-0 w-full rounded-full bg-blue-500"
                                style={{
                                    height: `${humidity}%`,
                                }}
                            />
                        </div>

                    </div>

                    <p className="mt-2 text-[10px] font-medium sm:text-xs">
                        {humidity > 70
                            ? "High 💧"
                            : "Normal 👍🏻"}
                    </p>
                </HighlightCard>

                {/* Visibility */}
                <HighlightCard title="Visibility">
                    <div className="flex flex-col">

                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-semibold sm:text-4xl lg:text-5xl">
                                {visibilityKm}
                            </span>

                            <span className="text-xs text-gray-400 sm:text-sm">
                                km
                            </span>
                        </div>

                        <p className="mt-3 text-[10px] font-medium text-gray-400 sm:mt-6 sm:text-xs">
                            {visibilityKm !== "--" &&
                                Number(visibilityKm) < 5
                                ? "Poor 😷"
                                : "Good 👀"}
                        </p>

                    </div>
                </HighlightCard>

                {/* Cloud Cover */}

                <HighlightCard title="Cloud Cover">
                    <div className="flex items-center justify-between gap-3">

                        <span className="text-3xl font-semibold sm:text-4xl lg:text-5xl">
                            {cloudiness}
                            <span className="text-base font-normal sm:text-xl">
                                %
                            </span>
                        </span>

                        <div className="relative h-14 w-4 overflow-hidden rounded-full bg-gray-100 sm:h-20 sm:w-5">
                            <div
                                className="absolute bottom-0 w-full rounded-full bg-gray-400"
                                style={{
                                    height: `${cloudiness}%`,
                                }}
                            />
                        </div>

                    </div>

                    <p className="mt-2 text-[10px] font-medium sm:text-xs">
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

                        <div className="flex items-baseline gap-1 sm:gap-2">
                            <span className="text-3xl font-semibold sm:text-4xl lg:text-5xl">
                                {pressure}
                            </span>

                            <span className="text-xs text-gray-400 sm:text-sm">
                                hPa
                            </span>
                        </div>

                        <div className="mt-3 flex items-center gap-2 sm:mt-4">
                            <div className="rounded-full border border-gray-100 p-1.5 sm:p-2">
                                <Gauge
                                    size={14}
                                    className="text-purple-500 sm:h-4 sm:w-4"
                                />
                            </div>

                            <span className="text-[10px] font-medium sm:text-xs">
                                Atmospheric pressure
                            </span>
                        </div>

                    </div>
                </HighlightCard>

            </div>
        </section>
    );
}

function HighlightCard({ title, children }) {
    return (
        <article
            className="
                flex min-h-36 flex-col
                justify-between
                rounded-3xl
                bg-white
                p-4
                shadow-[0_8px_30px_rgba(0,0,0,0.03)]
                transition-all
                hover:-translate-y-0.5
                hover:shadow-md

                sm:min-h-40
                sm:p-5

                lg:min-h-44
                lg:p-6
            "
        >
            <h3 className="text-[11px] font-medium text-gray-400 sm:text-sm">
                {title}
            </h3>

            <div className="flex flex-1 flex-col justify-center">
                {children}
            </div>
        </article>
    );
}