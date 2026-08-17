import Select from "react-select";
import useWeatherStore from "../../stores/weatherStore";

function CitySearchSelect() {
    const { setManualLocation } = useWeatherStore();

    const handleOnChangeCity = (selectedOption) => {
        if (!selectedOption) return;

        setManualLocation(selectedOption.value.trim());
    };

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

    const isDarkMode =
        document.documentElement.classList.contains("dark");

    return (
        <Select
            options={nepalCityOptions}
            onChange={handleOnChangeCity}
            className="w-full"
            placeholder="Search city..."
            menuPortalTarget={document.body}
            menuPosition="fixed"
            styles={{
                control: (base, state) => ({
                    ...base,
                    minHeight: "40px",
                    borderRadius: "12px",
                    borderColor: state.isFocused
                        ? isDarkMode
                            ? "#6b7280"
                            : "#9ca3af"
                        : isDarkMode
                            ? "#374151"
                            : "#e5e7eb",
                    backgroundColor: isDarkMode
                        ? "#1f2937"
                        : "#ffffff",
                    boxShadow: state.isFocused
                        ? "none"
                        : base.boxShadow,
                    "&:hover": {
                        borderColor: isDarkMode
                            ? "#4b5563"
                            : "#d1d5db",
                    },
                }),

                input: (base) => ({
                    ...base,
                    color: isDarkMode
                        ? "#f9fafb"
                        : "#111827",
                }),

                singleValue: (base) => ({
                    ...base,
                    color: isDarkMode
                        ? "#f9fafb"
                        : "#111827",
                }),

                placeholder: (base) => ({
                    ...base,
                    color: isDarkMode
                        ? "#9ca3af"
                        : "#9ca3af",
                }),

                menu: (base) => ({
                    ...base,
                    backgroundColor: isDarkMode
                        ? "#1f2937"
                        : "#ffffff",
                    borderRadius: "12px",
                    overflow: "hidden",
                }),

                menuPortal: (base) => ({
                    ...base,
                    zIndex: 9999,
                }),

                option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected
                        ? isDarkMode
                            ? "#374151"
                            : "#f3f4f6"
                        : state.isFocused
                            ? isDarkMode
                                ? "#374151"
                                : "#f9fafb"
                            : "transparent",
                    color: isDarkMode
                        ? "#f9fafb"
                        : "#111827",
                    cursor: "pointer",
                }),

                noOptionsMessage: (base) => ({
                    ...base,
                    color: isDarkMode
                        ? "#9ca3af"
                        : "#6b7280",
                }),

                dropdownIndicator: (base) => ({
                    ...base,
                    color: isDarkMode
                        ? "#9ca3af"
                        : "#6b7280",
                    "&:hover": {
                        color: isDarkMode
                            ? "#f9fafb"
                            : "#111827",
                    },
                }),

                clearIndicator: (base) => ({
                    ...base,
                    color: isDarkMode
                        ? "#9ca3af"
                        : "#6b7280",
                    "&:hover": {
                        color: isDarkMode
                            ? "#f9fafb"
                            : "#111827",
                    },
                }),
            }}
        />
    );
}

export default CitySearchSelect;