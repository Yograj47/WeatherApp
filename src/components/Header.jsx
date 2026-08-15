import useWeatherStore from "../stores/weatherStore";
import { mapDailyForecast } from "../features/weather/weatherMapper";
import ForecastCard from "./ForecastCard";

function Header() {
    const { forecast } = useWeatherStore();
    const weatherIconApi =
        import.meta.env.VITE_WEATHER_API_ICON;

    const forecastData =
        mapDailyForecast(forecast);

    return (
        <section className="w-full">
            <div className="mb-5">
                <h2 className="text-2xl font-bold text-gray-900">
                    5-Day Forecast
                </h2>
                <p className="mt-1 text-sm text-gray-400">
                    Weather forecast for the next five days
                </p>
            </div>

            {/* Forecast cards */}
            <div className="flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0 lg:grid-cols-5 lg:gap-4">    {forecastData.map((item) => (
                <ForecastCard
                    key={item.date}
                    item={item}
                    weatherIconApi={weatherIconApi}
                />
            ))}

            </div>
        </section>
    );
}

export default Header;