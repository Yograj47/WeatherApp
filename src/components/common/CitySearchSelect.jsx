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

    return (
        <Select
            options={nepalCityOptions}
            onChange={handleOnChangeCity}
            className="w-full"
            placeholder="Search city..."
            menuPortalTarget={document.body}
            menuPosition="fixed"
            styles={{
                menuPortal: (base) => ({
                    ...base,
                    zIndex: 9999,
                }),
            }}
        />
    );
}

export default CitySearchSelect;