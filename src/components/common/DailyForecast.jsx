import useWeatherStore from "../../stores/weatherStore";
import { mapDailyForecast } from "../../features/weather/weatherMapper";
import ForecastCard from "./ForecastCard";

function DailyForecast() {
    const { forecast } = useWeatherStore();

    const weatherIconApi =
        import.meta.env.VITE_WEATHER_API_ICON;

    const forecastData =
        mapDailyForecast(forecast);

    if (!forecastData.length) return null;

    return (
        <section className="w-full">
            {/* Heading */}
            <div className="mb-4 sm:mb-5">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 sm:text-2xl">
                    5-Day Forecast
                </h2>

                <p className="mt-1 text-xs text-gray-400 dark:text-gray-500 sm:text-sm">
                    Weather forecast for the next five days
                </p>
            </div>

            {/* Scrollable forecast */}
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
                {forecastData.map((item) => (
                    <div
                        key={item.date}
                        className="
                        w-40 shrink-0 snap-start
                        sm:w-48
                        lg:w-[calc((100%-4rem)/5)]
                        lg:shrink-0
                    "
                    >
                        <ForecastCard
                            item={item}
                            weatherIconApi={weatherIconApi}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}

export default DailyForecast;