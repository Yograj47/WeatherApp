import useWeatherStore from "../stores/weatherStore";
import { mapDailyForecast } from "../features/weather/weatherMapper";
import { useState } from "react";
import ForecastCard from "./ForecastCard";

function Header() {
    const { forecast } = useWeatherStore();
    const [view, setView] = useState("week");

    console.log("Forecast Data from header", forecast)

    const weatherIconApi =
        import.meta.env.VITE_WEATHER_API_ICON;

    const forecastData =
        mapDailyForecast(forecast);

    console.log("Header Data:", forecastData)

    return (
        <header className="w-full">
            <div className="mb-6 flex items-center justify-between">
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
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    {forecastData.map((item) => (
                        <ForecastCard
                            key={item.date}
                            item={item}
                            weatherIconApi={weatherIconApi}
                        />
                    ))}
                </div>
            )}
        </header>
    );
}

export default Header;