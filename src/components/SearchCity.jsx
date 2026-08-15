import { LocateFixed, Search } from "lucide-react";
import useWeatherStore from "../stores/weatherStore";
import getLocation from "../utils/GetLocation";
import Select from "react-select";

const nepalCityOptions = [
    { value: "Kathmandu", label: "Kathmandu" },
    { value: "Pokhara", label: "Pokhara" },
    { value: "Biratnagar", label: "Biratnagar" },
    { value: "Bharatpur", label: "Bharatpur" },
    { value: "Lalitpur", label: "Lalitpur" },
    { value: "Birgunj", label: "Birgunj" },
    { value: "Dharan", label: "Dharan" },
    { value: "Bhadgaon", label: "Bhadgaon" },
    { value: "Bhaktapur", label: "Bhaktapur" },
    { value: "Dhangadhi", label: "Dhangadhi" },
    { value: "Nepalgunj", label: "Nepalgunj" },
    { value: "Birendranagar", label: "Birendranagar" },
    { value: "Hetauda", label: "Hetauda" },
    { value: "Butwal", label: "Butwal" },
    { value: "Itahari", label: "Itahari" },
    { value: "Tulsipur", label: "Tulsipur" },
    { value: "Janakpur", label: "Janakpur" },
    { value: "Dadeldhura", label: "Dadeldhura" },
    { value: "Dipayal", label: "Dipayal" },
    { value: "Simara", label: "Simara" },
    { value: "Okhaldhunga", label: "Okhaldhunga" },
    { value: "Taplejung", label: "Taplejung" },
    { value: "Dhankuta", label: "Dhankuta" },
    { value: "Jomsom", label: "Jomsom" },
    { value: "Lumle", label: "Lumle" },
];

function SearchIcon(props) {
    return (
        <components.DropdownIndicator {...props}>
            <Search
                size={17}
                strokeWidth={2}
                className="text-gray-400"
            />
        </components.DropdownIndicator>
    );
}

function SearchCity() {
    const {
        setManualLocation,
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
                err.message || "Failed to get current location"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleOnChangeCity = (selectedOption) => {
        if (!selectedOption) return;

        setManualLocation(selectedOption.value.trim());
    };

    return (
        <div className="group flex w-full items-center gap-2">
            {/* Search */}
            <div
                className="
                    min-w-0 flex-1
                    transition-all duration-300 ease-out
                    group-hover:-translate-y-0.5
                    focus-within:-translate-y-0.5
                "
            >
                <Select
                    options={nepalCityOptions}
                    onChange={handleOnChangeCity}
                    placeholder="Search city..."
                    isSearchable
                    isClearable
                    components={{
                        DropdownIndicator: SearchIcon,
                        IndicatorSeparator: () => null,
                    }}
                    styles={{
                        control: (base, state) => ({
                            ...base,
                            minHeight: "42px",
                            height: "42px",
                            borderRadius: "14px",
                            borderColor: state.isFocused
                                ? "#93c5fd"
                                : "#e5e7eb",
                            backgroundColor: "#ffffff",
                            boxShadow: state.isFocused
                                ? "0 8px 24px rgba(59, 130, 246, 0.10)"
                                : "0 2px 8px rgba(0, 0, 0, 0.03)",
                            transition:
                                "all 200ms ease",
                            cursor: "text",
                            "&:hover": {
                                borderColor: "#d1d5db",
                            },
                        }),

                        valueContainer: (base) => ({
                            ...base,
                            paddingLeft: "12px",
                            paddingRight: "4px",
                        }),

                        input: (base) => ({
                            ...base,
                            fontSize: "14px",
                            color: "#111827",
                        }),

                        placeholder: (base) => ({
                            ...base,
                            color: "#9ca3af",
                            fontSize: "14px",
                        }),

                        singleValue: (base) => ({
                            ...base,
                            color: "#111827",
                            fontSize: "14px",
                            fontWeight: 500,
                        }),

                        dropdownIndicator: (base) => ({
                            ...base,
                            padding: "8px",
                        }),

                        clearIndicator: (base) => ({
                            ...base,
                            padding: "6px",
                            color: "#9ca3af",
                            cursor: "pointer",
                        }),

                        menu: (base) => ({
                            ...base,
                            marginTop: "8px",
                            borderRadius: "14px",
                            overflow: "hidden",
                            border: "1px solid #f1f5f9",
                            boxShadow:
                                "0 14px 35px rgba(0, 0, 0, 0.10)",
                            animation:
                                "searchMenuIn 160ms ease-out",
                        }),

                        menuList: (base) => ({
                            ...base,
                            padding: "6px",
                            maxHeight: "240px",
                        }),

                        option: (base, state) => ({
                            ...base,
                            borderRadius: "9px",
                            padding: "9px 10px",
                            fontSize: "14px",
                            cursor: "pointer",
                            color: state.isSelected
                                ? "#111827"
                                : "#374151",
                            backgroundColor:
                                state.isSelected
                                    ? "#eff6ff"
                                    : state.isFocused
                                        ? "#f8fafc"
                                        : "transparent",
                        }),
                    }
                    }
                />
            </div>

            {/* Current location */}
            <button
                type="button"
                aria-label="Use current location"
                title="Use current location"
                onClick={handleGeo}
                className="
                    flex h-10.5 w-10.5 shrink-0
                    items-center justify-center
                    rounded-[14px]
                    border border-gray-200
                    bg-white
                    text-gray-500
                    shadow-[0_2px_8px_rgba(0,0,0,0.03)]
                    transition-all duration-200
                    hover:-translate-y-0.5
                    hover:border-blue-200
                    hover:bg-blue-50
                    hover:text-blue-600
                    hover:shadow-[0_8px_20px_rgba(59,130,246,0.12)]
                    active:translate-y-0
                "
            >
                <LocateFixed
                    size={17}
                    strokeWidth={2.2}
                />
            </button>
        </div>
    );
}

export default SearchCity;