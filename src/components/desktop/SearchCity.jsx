import { LocateFixed } from "lucide-react";
import useWeatherStore from "../../stores/weatherStore";
import getLocation from "../../utils/GetLocation";
import CitySearchSelect from "../common/CitySearchSelect";

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
            setError(err.message || "Failed to get location");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex w-full items-center gap-4">
            <div className="flex-1">
                <CitySearchSelect />
            </div>

            <button
                type="button"
                aria-label="Use current location"
                title="Use current location"
                onClick={handleGeo}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ddddde] text-gray-500 transition-colors hover:text-black"
            >
                <LocateFixed size={16} strokeWidth={2.5} />
            </button>
        </div>
    );
}

export default SearchCity;