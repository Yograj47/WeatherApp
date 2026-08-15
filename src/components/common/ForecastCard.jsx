import {
    CloudRain,
    Droplets,
    Wind,
} from "lucide-react";

function ForecastCard({ item, weatherIconApi }) {
    return (
        <article
            className="
        flex min-h-44 w-full min-w-0
        flex-col justify-between
        rounded-3xl bg-white
        p-4
        shadow-[0_8px_30px_rgba(0,0,0,0.04)]
        transition-all duration-200
        hover:-translate-y-1 hover:shadow-md
        sm:min-h-48 sm:p-5
    "
        >
            {/* Header */}
            <div className="flex items-center justify-between gap-2">
                <span
                    className="
                        text-xs font-bold uppercase
                        tracking-wide text-gray-900
                        sm:text-sm
                    "
                >
                    {item.day}
                </span>

                {item.precipitation > 0 && (
                    <div
                        className="
                            flex items-center gap-1
                            text-[10px] font-medium text-blue-500
                            sm:text-xs
                        "
                        title="Expected precipitation"
                    >
                        <CloudRain size={13} />
                        <span>{item.precipitation} mm</span>
                    </div>
                )}
            </div>

            {/* Main weather information */}
            <div
                className="
                    my-4 flex flex-1
                    items-center justify-center
                    gap-2
                    sm:my-5 sm:gap-3
                "
            >
                <img
                    src={`${weatherIconApi}/${item.icon}@2x.png`}
                    alt={item.description || "Weather icon"}
                    className="
                        h-12 w-12 object-contain
                        sm:h-14 sm:w-14
                    "
                />

                <div className="min-w-0">
                    <p
                        className="
                            truncate text-xs font-medium
                            capitalize text-gray-500
                            sm:text-sm
                        "
                    >
                        {item.description}
                    </p>

                    <div className="mt-1 flex items-baseline gap-1.5">
                        <span
                            className="
                                text-xl font-bold text-gray-900
                                sm:text-2xl
                            "
                        >
                            {item.tempHigh}°
                        </span>

                        <span
                            className="
                                text-base font-medium text-gray-300
                                sm:text-lg
                            "
                        >
                            {item.tempLow}°
                        </span>
                    </div>
                </div>
            </div>

            {/* Additional information */}
            <div
                className="
                    flex items-center justify-between
                    border-t border-gray-100
                    pt-3
                    text-[11px] text-gray-400
                    sm:text-xs
                "
            >
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