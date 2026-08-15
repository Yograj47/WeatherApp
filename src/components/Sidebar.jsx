import SearchCity from "./SearchCity.jsx";
import useWeatherStore from "../stores/weatherStore";
// import formatDateTime from "../utils/DateAndTime";

function Sidebar() {
    const { location, weather, forecast } = useWeatherStore();

    const weatherIconApi =
        import.meta.env.VITE_WEATHER_API_ICON;

    if (!weather || !forecast) return null;

    // const { time, day } = formatDateTime(
    //     weather.timestamp,
    //     weather.timezone
    // );

    const currentIcon = weather.condition.icon;
    const currentDescription = weather.condition.description;

    const precipitation =
        forecast.entries?.[0]?.precipitation;

    const precipitationType =
        precipitation?.rain > 0
            ? "Rain"
            : precipitation?.snow > 0
                ? "Snow"
                : "No precipitation";

    const precipitationAmount =
        precipitationType === "Rain"
            ? precipitation.rain
            : precipitationType === "Snow"
                ? precipitation.snow
                : 0;

    const windSpeed = (
        weather.wind.speed * 3.6
    ).toFixed(1);

    const windDirection = [
        "N",
        "NE",
        "E",
        "SE",
        "S",
        "SW",
        "W",
        "NW",
    ][
        Math.round(weather.wind.direction / 45) % 8
    ];

    const humidity = weather.atmosphere.humidity;
    const pressure = weather.atmosphere.pressure;

    const visibility = weather.atmosphere.visibility
        ? (weather.atmosphere.visibility / 1000).toFixed(1)
        : null;

    const cloudiness = weather.atmosphere.cloudiness;

    const feelsLike = Math.round(
        weather.temperature.feelsLike
    );

    const cityName =
        weather.location?.name ||
        location?.value ||
        "Unknown location";

    const country =
        weather.location?.country || "";

    return (
        <div className="flex h-full flex-col px-5 py-4">

            {/* Search */}
            <div className="mb-7 w-full">
                <SearchCity />
            </div>

            {/* Location */}
            <div className="mb-4">
                <h2 className="text-2xl font-semibold text-gray-900">
                    {cityName}
                </h2>

                {country && (
                    <p className="mt-1 text-sm text-gray-400">
                        {country}
                    </p>
                )}
            </div>

            {/* Weather Icon */}
            <div className="flex justify-center">
                <img
                    src={`${weatherIconApi}/${currentIcon}@4x.png`}
                    alt={
                        currentDescription ||
                        "Weather icon"
                    }
                    className="h-36 w-36 object-contain"
                />
            </div>

            {/* Temperature */}
            <div className="mb-6 text-center">

                <div className="flex items-start justify-center">
                    <span className="text-[5.5rem] font-extralight leading-none tracking-tight text-black">
                        {Math.round(
                            weather.temperature.current
                        )}
                    </span>

                    <span className="mt-2 text-3xl font-light">
                        °C
                    </span>
                </div>

                <p className="mt-3 text-sm text-gray-500">
                    Feels like {feelsLike}°C
                </p>

                <p className="mt-4 text-base font-medium capitalize text-gray-900">
                    {currentDescription}
                </p>
            </div>

            {/* Quick Weather Summary */}
            <div className="mb-6 space-y-3">

                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">
                        Precipitation
                    </span>

                    <span className="font-medium text-gray-800">
                        {precipitationType ===
                        "No precipitation"
                            ? "No precipitation"
                            : `${precipitationAmount} mm ${precipitationType.toLowerCase()}`}
                    </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">
                        Wind
                    </span>

                    <span className="font-medium text-gray-800">
                        {windSpeed} km/h {windDirection}
                    </span>
                </div>

            </div>

            {/* Divider */}
            <div className="mb-5 border-t border-gray-100" />

            {/* Weather Statistics */}
            <div className="mb-auto space-y-4">

                <SidebarStat
                    label="Humidity"
                    value={`${humidity}%`}
                />

                <SidebarStat
                    label="Pressure"
                    value={`${pressure} hPa`}
                />

                <SidebarStat
                    label="Visibility"
                    value={
                        visibility !== null
                            ? `${visibility} km`
                            : "—"
                    }
                />

                <SidebarStat
                    label="Cloudiness"
                    value={
                        cloudiness !== null
                            ? `${cloudiness}%`
                            : "—"
                    }
                />

            </div>

            {/* Location Photo */}
            <div className="relative mt-7 h-28 w-full overflow-hidden rounded-3xl shadow-sm">

                <img
                    src="https://images.unsplash.com/photo-1589800463007-3be49fe18b92?q=80&w=2070&auto=format&fit=crop"
                    alt={cityName}
                    className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-black/30" />

                <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="text-base font-semibold text-white">
                        {cityName}
                    </p>

                    <p className="mt-0.5 text-xs text-white/80">
                        {country}
                    </p>
                </div>

            </div>
        </div>
    );
}

function SidebarStat({ label, value }) {
    return (
        <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">
                {label}
            </span>

            <span className="font-medium text-gray-800">
                {value}
            </span>
        </div>
    );
}

export default Sidebar;