import { useMemo, useState } from "react";
import useWeatherStore from "../stores/weatherStore";

function Header() {
    const { forecast } = useWeatherStore();

    const weatherIconApi = import.meta.env.VITE_WEATHER_API_ICON;

    const [view, setView] = useState("week");

    const forecastData = useMemo(() => {
        if (!forecast?.entries?.length) return [];

        const daily = [];

        for (let i = 0; i < 5; i++) {
            const index = i * 8;
            const entry = forecast.entries[index];

            if (!entry) continue;

            const date = new Date(entry.timestamp * 1000);

            daily.push({
                day: date.toLocaleDateString("en-US", {
                    weekday: "short",
                }),
                tempHigh: Math.round(entry.temperature.max),
                tempLow: Math.round(entry.temperature.min),
                icon: entry.condition.icon,
            });
        }

        return daily;
    }, [forecast]);

    return (
        <header className="w-full">
            {/* Top Controls */}
            <div className="mb-6 flex items-center justify-between">
                {/* View Toggle */}
                <div className="flex gap-6">
                    {["week", "today"].map((value) => (
                        <button
                            key={value}
                            onClick={() => setView(value)}
                            className={`relative pb-2 text-xl font-bold transition ${view === value
                                    ? "text-gray-900 after:absolute after:bottom-0 after:left-0 after:h-0.75 after:w-full after:rounded-full after:bg-black"
                                    : "text-gray-300 hover:text-gray-500"
                                }`}
                        >
                            {value.charAt(0).toUpperCase() +
                                value.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Forecast Cards */}
            {view === "week" && (
                <div className="grid grid-cols-3 gap-4 md:grid-cols-5">
                    {forecastData.map((item, index) => (
                        <div
                            key={`${item.day}-${index}`}
                            className="flex min-h-40 cursor-pointer flex-col items-center justify-between rounded-3xl bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition hover:-translate-y-0.5 hover:shadow-md"
                        >
                            <span className="text-sm font-bold uppercase tracking-wide text-gray-900">
                                {item.day}
                            </span>

                            <img
                                src={`${weatherIconApi}/${item.icon}@2x.png`}
                                alt="Weather icon"
                                className="h-12 w-12"
                            />

                            <div className="mt-2 flex gap-2 text-sm">
                                <span className="font-bold text-gray-900">
                                    {item.tempHigh}°
                                </span>

                                <span className="font-medium text-gray-300">
                                    {item.tempLow}°
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </header>
    );
}

export default Header;