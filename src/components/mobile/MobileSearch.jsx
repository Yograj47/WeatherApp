import {
    LocateFixed,
    Search,
    X,
} from "lucide-react";
import { useState } from "react";
import useWeatherStore from "../../stores/weatherStore";
import getLocation from "../../utils/GetLocation";

const cities = [
    "Kathmandu",
    "Pokhara",
    "Biratnagar",
    "Bharatpur",
    "Lalitpur",
    "Birgunj",
    "Dharan",
    "Bhaktapur",
    "Dhangadhi",
    "Nepalgunj",
    "Birendranagar",
    "Hetauda",
    "Butwal",
    "Itahari",
    "Tulsipur",
    "Janakpur",
    "Dadeldhura",
    "Dipayal",
    "Simara",
    "Okhaldhunga",
    "Taplejung",
    "Dhankuta",
    "Jomsom",
    "Lumle",
];

function MobileSearch() {
    const {
        location,
        weather,
        setManualLocation,
        setGeoLocation,
        setLoading,
        setError,
    } = useWeatherStore();

    const currentLocation =
        location?.type === "manual"
            ? location.value
            : weather?.location?.name || "Current location";

    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");

    const filteredCities = cities.filter((city) =>
        city.toLowerCase().includes(search.toLowerCase())
    );

    const handleCitySelect = (city) => {
        setManualLocation(city);
        setSearch("");
        setIsOpen(false);
    };

    const handleGeo = async () => {
        try {
            setLoading(true);

            const { lat, lon } = await getLocation();

            setGeoLocation({ lat, lon });
            setIsOpen(false);
        } catch (err) {
            setError(
                err.message || "Failed to get location"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative w-full">
            {/* Search container */}
            <div
                className={`
                relative overflow-hidden rounded-2xl
                bg-white shadow-sm
                transition-all duration-300 ease-out
                dark:bg-gray-900
                dark:shadow-none
                ${isOpen
                        ? "min-h-84 shadow-md dark:shadow-black/20"
                        : "min-h-12"
                    }
            `}
            >
                {/* Collapsed search */}
                <div
                    className={`
                    absolute inset-0 flex items-center gap-2
                    px-0
                    transition-all duration-300 ease-out
                    ${isOpen
                            ? "pointer-events-none -translate-y-3 scale-95 opacity-0"
                            : "translate-y-0 scale-100 opacity-100"
                        }
                `}
                >
                    <button
                        type="button"
                        onClick={() => setIsOpen(true)}
                        className="
                        flex min-w-0 flex-1 items-center
                        gap-3 rounded-2xl
                        px-4 py-3
                        text-left
                        active:scale-[0.98]
                    "
                    >
                        <Search
                            size={18}
                            className="shrink-0 text-gray-400 dark:text-gray-500"
                        />

                        <span className="truncate text-sm font-medium text-gray-800 dark:text-gray-200">
                            {currentLocation}
                        </span>
                    </button>

                    <button
                        type="button"
                        aria-label="Use current location"
                        onClick={handleGeo}
                        className="
                        mr-2 flex h-9 w-9 shrink-0
                        items-center justify-center
                        rounded-full
                        bg-gray-100
                        text-gray-500
                        transition
                        hover:bg-gray-200
                        hover:text-black
                        active:scale-95
                        dark:bg-gray-800
                        dark:text-gray-400
                        dark:hover:bg-gray-700
                        dark:hover:text-gray-100
                    "
                    >
                        <LocateFixed size={17} />
                    </button>
                </div>

                {/* Expanded search */}
                <div
                    className={`
                    absolute inset-x-0 top-0
                    transition-all duration-300 ease-out
                    ${isOpen
                            ? "translate-y-0 scale-100 opacity-100"
                            : "pointer-events-none translate-y-3 scale-95 opacity-0"
                        }
                `}
                >
                    {/* Search input */}
                    <div className="flex items-center gap-2 px-3 py-2">
                        <Search
                            size={18}
                            className="shrink-0 text-gray-400 dark:text-gray-500"
                        />

                        <input
                            autoFocus={isOpen}
                            type="text"
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                            placeholder="Search city..."
                            className="
                            min-w-0 flex-1
                            bg-transparent
                            py-2
                            text-sm text-gray-900
                            outline-none
                            placeholder:text-gray-400
                            dark:text-gray-100
                            dark:placeholder:text-gray-600
                        "
                        />

                        <button
                            type="button"
                            aria-label="Use current location"
                            onClick={handleGeo}
                            className="
                            flex h-8 w-8 shrink-0
                            items-center justify-center
                            rounded-full
                            bg-gray-100
                            text-gray-500
                            transition
                            hover:bg-gray-200
                            hover:text-black
                            dark:bg-gray-800
                            dark:text-gray-400
                            dark:hover:bg-gray-700
                            dark:hover:text-gray-100
                        "
                        >
                            <LocateFixed size={15} />
                        </button>

                        <button
                            type="button"
                            aria-label="Close search"
                            onClick={() => {
                                setIsOpen(false);
                                setSearch("");
                            }}
                            className="
                            flex h-8 w-8 shrink-0
                            items-center justify-center
                            rounded-full
                            text-gray-400
                            transition
                            hover:bg-gray-100
                            hover:text-black
                            dark:hover:bg-gray-800
                            dark:hover:text-gray-100
                        "
                        >
                            <X size={16} />
                        </button>
                    </div>

                    {/* Results */}
                    <div
                        className={`
                        border-t border-gray-100
                        transition-all duration-300 delay-75
                        dark:border-gray-800
                        ${isOpen
                                ? "translate-y-0 opacity-100"
                                : "-translate-y-2 opacity-0"
                            }
                    `}
                    >
                        <div className="max-h-60 overflow-y-auto">
                            {filteredCities.length > 0 ? (
                                filteredCities.map((city) => (
                                    <button
                                        key={city}
                                        type="button"
                                        onClick={() =>
                                            handleCitySelect(city)
                                        }
                                        className="
                                        block w-full
                                        px-4 py-3
                                        text-left text-sm
                                        text-gray-700
                                        transition
                                        hover:bg-gray-50
                                        active:bg-gray-100
                                        dark:text-gray-300
                                        dark:hover:bg-gray-800
                                        dark:active:bg-gray-700
                                    "
                                    >
                                        {city}
                                    </button>
                                ))
                            ) : (
                                <p className="px-4 py-4 text-center text-sm text-gray-400 dark:text-gray-600">
                                    No cities found
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MobileSearch;