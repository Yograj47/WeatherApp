import SearchCity from "./SearchCity.jsx";
import useWeatherStore from "../stores/weatherStore";
import formatDateTime from "../utils/DateAndTime";

function Sidebar() {
    const { location, weather, forecast } = useWeatherStore();
    const weatherIconApi = import.meta.env.VITE_WEATHER_API_ICON;

    if (!weather || !forecast) return null;

    const { time, day } = formatDateTime(weather.dt, weather.timezone);

    return (
        <div className="flex h-full flex-col items-center px-6 md:py-4 py-0">
            {/* Search */}
            <div className="md:mb-8 mb-0 w-full">
                <SearchCity />
            </div>

            {/* Weather Icon */}
            <img
                src={`${weatherIconApi}/${weather.weather?.[0]?.icon}@4x.png`}
                alt="Weather icon"
                className="mb-6 h-44 w-44 object-contain"
            />

            {/* Temperature */}
            <div className="mb-8 text-center">
                <h1 className="flex items-start justify-center text-[6.5rem] font-extralight leading-none tracking-tight text-black">
                    {Math.round(weather.main.temp)}
                    <span className="mt-4 text-3xl font-light">°C</span>
                </h1>

                <div className="mt-3 flex items-center justify-center gap-2 text-base">
                    <span className="font-medium text-black">{day},</span>
                    <span className="font-normal text-gray-400">{time}</span>
                </div>
            </div>

            {/* Divider */}
            <div className="mb-6 w-full border-t border-gray-100" />

            {/* Weather Details */}
            <div className="mb-auto w-full space-y-4">
                <p className="text-center text-sm font-medium capitalize text-gray-800">
                    {weather.weather?.[0]?.description}
                </p>

                <div className="flex items-center justify-center gap-3 text-sm font-medium text-gray-700">
                    {
                        forecast.list?.[0]?.rain ?

                            <span>
                                Rain — {forecast.list?.[0]?.rain?.["3h"] ?? 0} mm
                            </span>
                            :
                            <span>
                                Snow — {forecast.list?.[0]?.snow?.["3h"] ?? 0}
                            </span>
                    }
                </div>
            </div>

            {/* City Card */}
            <div className="relative mt-8 h-24 w-full overflow-hidden rounded-3xl shadow-sm">
                <img src="https://images.unsplash.com/photo-1589800463007-3be49fe18b92?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <span className="text-sm font-semibold tracking-wide text-white">
                        {location?.value}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;