import { LocateFixed, Search } from "lucide-react";
import useWeatherStore from "../stores/weatherStore";
import getLocation from "../utils/GetLocation";
import Select from "react-select";

function SearchCity() {
    const { setManualLocation, setGeoLocation, setLoading, setError } = useWeatherStore();

    const handleGeo = async () => {
        try {
            setLoading && setLoading(true);
            const { lat, lon } = await getLocation();
            setGeoLocation({ lat, lon });
        } catch (err) {
            setError && setError(err.message || "Failed to get location");
        } finally {
            setLoading && setLoading(false);
        }
    };

    const handleOnChangeCity = (selectedOption) => {
        console.log(selectedOption);
        setManualLocation(selectedOption.value.trim())
    }

    const nepalCityOptions = [
        { value: 'Kathmandu', label: 'Kathmandu' },
        { value: 'Pokhara', label: 'Pokhara' },
        { value: 'Biratnagar', label: 'Biratnagar' },
        { value: 'Bharatpur', label: 'Bharatpur' },
        { value: 'Lalitpur', label: 'Lalitpur' },
        { value: 'Birgunj', label: 'Birgunj' },
        { value: 'Dharan', label: 'Dharan' },
        { value: 'Bhadgaon', label: 'Bhadgaon' },
        { value: 'Bhaktapur', label: 'Bhaktapur' },
        { value: 'Dhangadhi', label: 'Dhangadhi' },
        { value: 'Nepalgunj', label: 'Nepalgunj' },
        { value: 'Birendranagar', label: 'Birendranagar' },
        { value: 'Hetauda', label: 'Hetauda' },
        { value: 'Butwal', label: 'Butwal' },
        { value: 'Itahari', label: 'Itahari' },
        { value: 'Tulsipur', label: 'Tulsipur' },
        { value: 'Janakpur', label: 'Janakpur' },
        { value: 'Dadeldhura', label: 'Dadeldhura' },
        { value: 'Dipayal', label: 'Dipayal' },
        { value: 'Simara', label: 'Simara' },
        { value: 'Okhaldhunga', label: 'Okhaldhunga' },
        { value: 'Taplejung', label: 'Taplejung' },
        { value: 'Dhankuta', label: 'Dhankuta' },
        { value: 'Jomsom', label: 'Jomsom' },
        { value: 'Lumle', label: 'Lumle' }
    ];

    return (
        <div className="flex items-center w-full gap-4">
            <div className="flex items-center flex-1">
                <Select
                    options={nepalCityOptions}
                    onChange={handleOnChangeCity}
                    className="w-full"
                />
            </div>

            {/* The circular 'Target' icon as seen in design */}
            <button
                type="button"
                aria-label="Use current location"
                title="Use current location"
                onClick={handleGeo}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#ddddde] text-gray-500 hover:text-black transition-colors"
            >
                <LocateFixed size={16} strokeWidth={2.5} />
            </button>
        </div>
    );
}

export default SearchCity