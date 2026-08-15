import {
    CloudRain,
    Droplets,
    Wind,
} from "lucide-react";

function ForecastCard({ item, weatherIconApi }) {
    return (
        <article
            className="
                    min-w-37.5 flex-1
                    flex min-h-52 flex-col justify-between
                    rounded-3xl bg-white p-4 sm:p-5
                    shadow-[0_8px_30px_rgba(0,0,0,0.04)]
                    transition-all duration-200
                    hover:-translate-y-1 hover:shadow-md"
        >
            {/* Day */}
            <div className="flex items-center justify-between">
                <span className="text-sm font-bold uppercase tracking-wide text-gray-900">
                    {item.day}
                </span>

                {item.precipitation > 0 && (
                    <div
                        className="flex items-center gap-1 text-xs font-medium text-blue-500"
                        title="Expected precipitation"
                    >
                        <CloudRain size={14} />
                        {item.precipitation} mm
                    </div>
                )}
            </div>

            {/* Weather */}
            <div className="flex items-center justify-center gap-3">
                <img
                    src={`${weatherIconApi}/${item.icon}@2x.png`}
                    alt={item.description || "Weather icon"}
                    className="h-14 w-14"
                />

                <div className="flex flex-col">
                    <span className="text-sm font-medium capitalize text-gray-500">
                        {item.description}
                    </span>

                    <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-gray-900">
                            {item.tempHigh}°
                        </span>

                        <span className="text-lg font-medium text-gray-300">
                            {item.tempLow}°
                        </span>
                    </div>
                </div>
            </div>

            {/* Additional information */}
            <div className="flex items-center justify-between border-t border-gray-100 pt-3 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                    <Droplets size={13} />
                    <span>{item.humidity}%</span>
                </div>

                <div className="flex items-center gap-1">
                    <Wind size={13} />
                    <span>{item.windSpeed} km/h</span>
                </div>
            </div>
        </article>
    );
}

export default ForecastCard;