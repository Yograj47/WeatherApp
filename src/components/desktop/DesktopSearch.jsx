import { LocateFixed, Search, X } from "lucide-react";
import { useState } from "react";
import useWeatherStore from "../../stores/weatherStore";
import getLocation from "../../utils/GetLocation";
import CitySearchSelect from "../common/CitySearchSelect";

function DesktopSearch() {
    const {
        setGeoLocation,
        setLoading,
        setError,
    } = useWeatherStore();

    const [isOpen, setIsOpen] = useState(false);

    const handleGeo = async () => {
        try {
            setLoading(true);

            const { lat, lon } = await getLocation();

            setGeoLocation({ lat, lon });
        } catch (err) {
            setError(err.message || "Failed to get location");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex h-10 w-full items-center">
            {/* Collapsed search button */}
            <button
                type="button"
                aria-label="Search city"
                onClick={() => setIsOpen(true)}
                className={`
                    absolute right-0 top-0 z-20
                    flex h-10 w-10 items-center justify-center
                    rounded-full bg-[#ddddde]
                    text-gray-500
                    transition-all duration-300
                    hover:bg-gray-200 hover:text-black
                    ${isOpen
                        ? "pointer-events-none scale-90 opacity-0"
                        : "scale-100 opacity-100"
                    }
                `}
            >
                <Search size={17} strokeWidth={2.2} />
            </button>

            {/* Expanded search */}
            <div
                className={`
                    absolute inset-0 z-10
                    flex items-center gap-2
                    rounded-2xl bg-gray-100
                    transition-all duration-300 ease-out
                    ${isOpen
                        ? "visible scale-100 opacity-100"
                        : "invisible scale-95 opacity-0"
                    }
                `}
            >
                <div className="min-w-0 flex-1">
                    <CitySearchSelect />
                </div>

                {/* Geolocation */}
                <button
                    type="button"
                    aria-label="Use current location"
                    title="Use current location"
                    onClick={handleGeo}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-gray-500 transition hover:text-black"
                >
                    <LocateFixed
                        size={15}
                        strokeWidth={2.2}
                    />
                </button>

                {/* Close */}
                <button
                    type="button"
                    aria-label="Close search"
                    title="Close search"
                    onClick={() => setIsOpen(false)}
                    className="mr-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-white hover:text-black"
                >
                    <X size={15} />
                </button>
            </div>
        </div>
    );
}

export default DesktopSearch;