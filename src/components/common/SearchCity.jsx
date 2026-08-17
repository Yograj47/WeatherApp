import { LocateFixed } from "lucide-react";
import useWeatherStore from "../../stores/weatherStore";
import getLocation from "../../utils/GetLocation";
import CitySearchSelect from "./CitySearchSelect";

function SearchCity() {
    const {
        setGeoLocation,
        setLoading,
        setError,
    } = useWeatherStore();

    const handleGeo = async () => {
        try {
            setLoading(true);

            const { lat, lon } = await getLocation();

            setGeoLocation({ lat, lon });
        } catch (err) {
            setError(
                err.message || "Failed to get location"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex w-full items-center gap-4">
            <div className="min-w-0 flex-1">
                <CitySearchSelect />
            </div>

            <button
                type="button"
                aria-label="Use current location"
                title="Use current location"
                onClick={handleGeo}
                className="
                    flex h-9 w-9 shrink-0
                    items-center justify-center
                    rounded-full
                    border
                    border-gray-200
                    bg-gray-100
                    text-gray-500
                    transition-all duration-200

                    hover:border-gray-300
                    hover:bg-gray-200
                    hover:text-gray-900
                    hover:shadow-sm

                    focus:outline-none
                    focus:ring-2
                    focus:ring-gray-300
                    focus:ring-offset-2

                    dark:border-gray-700
                    dark:bg-gray-800
                    dark:text-gray-400

                    dark:hover:border-gray-600
                    dark:hover:bg-gray-700
                    dark:hover:text-gray-100

                    dark:focus:ring-gray-600
                    dark:focus:ring-offset-gray-900
                "
            >
                <LocateFixed
                    size={16}
                    strokeWidth={2.25}
                />
            </button>
        </div>
    );
}

export default SearchCity;