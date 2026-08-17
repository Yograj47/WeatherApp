import { useEffect, useState } from "react";
import { X, MapPin, Globe2 } from "lucide-react";
import useWeatherStore from "../../stores/weatherStore";

function Clock({ onClose }) {
    const { forecast, weather } = useWeatherStore();

    const timezoneOffset =
        forecast?.timezone ??
        weather?.timezone ??
        0;

    const cityName =
        forecast?.location?.name ??
        weather?.location?.name ??
        "Current Location";

    const [currentTime, setCurrentTime] = useState(() =>
        getLocalTime(timezoneOffset)
    );

    useEffect(() => {
        function updateClock() {
            setCurrentTime(
                getLocalTime(timezoneOffset)
            );
        }

        updateClock();

        const interval = setInterval(
            updateClock,
            1000
        );

        return () => clearInterval(interval);
    }, [timezoneOffset]);

    const {
        time,
        period,
        date,
    } = formatClock(currentTime);

    const offsetLabel =
        formatTimezoneOffset(timezoneOffset);

    return (
        <div
            className="
                absolute
                bottom-14
                right-0
                w-72
                rounded-3xl
                border border-gray-100
                bg-white
                p-5
                shadow-[0_15px_50px_rgba(0,0,0,0.12)]
            "
        >
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-sm font-semibold text-gray-900">
                        Clock
                    </h2>

                    <p className="mt-0.5 text-[11px] text-gray-400">
                        Local time
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    className="
                        rounded-full
                        p-1.5
                        text-gray-400
                        transition
                        hover:bg-gray-100
                        hover:text-gray-700
                    "
                    aria-label="Close clock"
                >
                    <X size={15} />
                </button>
            </div>

            {/* Time */}
            <div className="mt-7 text-center">
                <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-light tracking-tight text-gray-900">
                        {time}
                    </span>

                    <span className="text-xs font-semibold text-gray-400">
                        {period}
                    </span>
                </div>

                <p className="mt-2 text-xs text-gray-400">
                    {date}
                </p>
            </div>

            {/* Location */}
            <div className="mt-6 rounded-2xl bg-gray-50 px-3 py-3">
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-gray-500 shadow-sm">
                        <MapPin size={15} />
                    </div>

                    <div className="min-w-0">
                        <p className="truncate text-xs font-medium text-gray-800">
                            {cityName}
                        </p>

                        <p className="mt-0.5 text-[10px] text-gray-400">
                            Local time
                        </p>
                    </div>
                </div>
            </div>

            {/* Timezone */}
            <div className="mt-3 flex items-center gap-2 px-1 text-[10px] text-gray-400">
                <Globe2 size={12} />

                <span>
                    UTC {offsetLabel}
                </span>
            </div>
        </div>
    );
}

/**
 * Convert the current UTC time into the
 * location's local clock using the OpenWeather
 * timezone offset.
 */
function getLocalTime(timezoneOffset) {
    const now = Date.now();

    return new Date(
        now + timezoneOffset * 1000
    );
}

function formatClock(date) {
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();

    const period = hours >= 12 ? "PM" : "AM";

    const displayHour =
        hours % 12 || 12;

    const time = `${String(
        displayHour
    ).padStart(2, "0")}:${String(
        minutes
    ).padStart(2, "0")}:${String(
        seconds
    ).padStart(2, "0")}`;

    const dateText =
        date.toLocaleDateString("en-US", {
            weekday: "long",
            month: "short",
            day: "numeric",
            timeZone: "UTC",
        });

    return {
        time,
        period,
        date: dateText,
    };
}

function formatTimezoneOffset(offsetSeconds) {
    const sign = offsetSeconds >= 0 ? "+" : "-";

    const absoluteSeconds =
        Math.abs(offsetSeconds);

    const totalMinutes =
        Math.floor(
            absoluteSeconds / 60
        );

    const hours =
        Math.floor(totalMinutes / 60);

    const minutes =
        totalMinutes % 60;

    if (minutes === 0) {
        return `${sign}${String(hours).padStart(
            2,
            "0"
        )}:00`;
    }

    return `${sign}${String(hours).padStart(
        2,
        "0"
    )}:${String(minutes).padStart(
        2,
        "0"
    )}`;
}

export default Clock;

