function mapCurrentWeather(data) {
    if (!data) return null;

    return {
        location: {
            name: data.name,
            country: data.sys?.country ?? null,
            coordinates: {
                lat: data.coord?.lat ?? null,
                lon: data.coord?.lon ?? null,
            },
        },

        temperature: {
            current: data.main?.temp ?? null,
            feelsLike: data.main?.feels_like ?? null,
            min: data.main?.temp_min ?? null,
            max: data.main?.temp_max ?? null,
        },

        condition: {
            id: data.weather?.[0]?.id ?? null,
            main: data.weather?.[0]?.main ?? null,
            description: data.weather?.[0]?.description ?? null,
            icon: data.weather?.[0]?.icon ?? null,
        },

        wind: {
            speed: data.wind?.speed ?? null,
            direction: data.wind?.deg ?? null,
            gust: data.wind?.gust ?? null,
        },

        atmosphere: {
            humidity: data.main?.humidity ?? null,
            pressure: data.main?.pressure ?? null,
            visibility: data.visibility ?? null,
            cloudiness: data.clouds?.all ?? null,
        },

        precipitation: {
            rain: data.rain?.["1h"] ?? data.rain?.["3h"] ?? 0,
            snow: data.snow?.["1h"] ?? data.snow?.["3h"] ?? 0,
        },

        sun: {
            sunrise: data.sys?.sunrise ?? null,
            sunset: data.sys?.sunset ?? null,
        },

        timezone: data.timezone ?? 0,

        timestamp: data.dt ?? null,
    };
}

function mapForecast(data) {
    if (!data) return null;

    return {
        location: {
            name: data.city?.name ?? null,
            country: data.city?.country ?? null,
            coordinates: {
                lat: data.city?.coord?.lat ?? null,
                lon: data.city?.coord?.lon ?? null,
            },
        },

        timezone: data.city?.timezone ?? 0,

        sun: {
            sunrise: data.city?.sunrise ?? null,
            sunset: data.city?.sunset ?? null,
        },

        entries: (data.list ?? []).map((item) => ({
            timestamp: item.dt ?? null,

            temperature: {
                current: item.main?.temp ?? null,
                feelsLike: item.main?.feels_like ?? null,
                min: item.main?.temp_min ?? null,
                max: item.main?.temp_max ?? null,
            },

            condition: {
                id: item.weather?.[0]?.id ?? null,
                main: item.weather?.[0]?.main ?? null,
                description: item.weather?.[0]?.description ?? null,
                icon: item.weather?.[0]?.icon ?? null,
            },

            wind: {
                speed: item.wind?.speed ?? null,
                direction: item.wind?.deg ?? null,
                gust: item.wind?.gust ?? null,
            },

            atmosphere: {
                humidity: item.main?.humidity ?? null,
                pressure: item.main?.pressure ?? null,
                visibility: item.visibility ?? null,
                cloudiness: item.clouds?.all ?? null,
            },

            precipitation: {
                rain: item.rain?.["3h"] ?? 0,
                snow: item.snow?.["3h"] ?? 0,
            },

            precipitationProbability: item.pop ?? 0,
        })),
    };
}

export {
    mapCurrentWeather,
    mapForecast,
};