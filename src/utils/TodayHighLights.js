export function getWindData(wind) {
    if (!wind) {
        return {
            speed: "--",
            direction: "--",
        };
    }

    const speed = (wind.speed * 3.6).toFixed(1);

    const directions = [
        "N",
        "NE",
        "E",
        "SE",
        "S",
        "SW",
        "W",
        "NW",
    ];

    const direction =
        directions[
        Math.round((wind.direction ?? 0) / 45) % 8
        ];

    return {
        speed,
        direction,
    };
}

export function getSunData(
    sunrise,
    sunset,
    timezone = 0,
    now = Math.floor(Date.now() / 1000)
) {
    if (!sunrise || !sunset) {
        return {
            sunriseTime: "--",
            sunsetTime: "--",
            nextEvent: null,
            countdown: "--",
            isDay: false,
        };
    }

    const formatTime = (timestamp) => {
        const date = new Date(
            (timestamp + timezone) * 1000
        );

        return date.toLocaleTimeString("en-US", {
            timeZone: "UTC",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
    };

    const sunriseTime = formatTime(sunrise);
    const sunsetTime = formatTime(sunset);

    let nextEvent;
    let targetTimestamp;

    if (now < sunrise) {
        nextEvent = "sunrise";
        targetTimestamp = sunrise;
    } else if (now < sunset) {
        nextEvent = "sunset";
        targetTimestamp = sunset;
    } else {
        nextEvent = "sunrise";

        // Sunrise for the next local day.
        const localDay =
            Math.floor(
                (now + timezone) / 86400
            );

        const sunriseLocalDay =
            Math.floor(
                (sunrise + timezone) / 86400
            );

        const daysUntilNextSunrise =
            localDay >= sunriseLocalDay
                ? 1
                : 0;

        targetTimestamp =
            sunrise +
            daysUntilNextSunrise * 86400;
    }

    const remainingSeconds = Math.max(
        0,
        targetTimestamp - now
    );

    const totalMinutes = Math.floor(
        remainingSeconds / 60
    );

    const hours = Math.floor(
        totalMinutes / 60
    );

    const minutes = totalMinutes % 60;

    const countdown =
        `${String(hours).padStart(2, "0")}h ` +
        `${String(minutes).padStart(2, "0")}m`;

    return {
        sunriseTime,
        sunsetTime,
        nextEvent,
        countdown,
        isDay:
            now >= sunrise &&
            now < sunset,
    };
}

export function getHumidityLabel(humidity) {
    if (humidity == null) return "--";

    return humidity > 70
        ? "High 💧"
        : "Normal 👍🏻";
}

export function getVisibilityData(visibility) {
    if (visibility == null) {
        return {
            value: "--",
            label: "--",
        };
    }

    const value = (
        visibility / 1000
    ).toFixed(1);

    return {
        value,
        label:
            Number(value) < 5
                ? "Poor 😷"
                : "Good 👀",
    };
}

export function getCloudinessLabel(cloudiness) {
    if (cloudiness == null) return "--";

    if (cloudiness > 70) {
        return "Cloudy ☁️";
    }

    if (cloudiness > 30) {
        return "Partly Cloudy ⛅";
    }

    return "Mostly Clear ☀️";
}