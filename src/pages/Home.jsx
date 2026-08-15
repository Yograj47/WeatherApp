import useWeather from "../hooks/useWeather";
import useWeatherStore from "../stores/weatherStore";
import MainContent from "../components/MainContent";
import Sidebar from "../components/Sidebar";
import { useEffect } from "react";
import MobileWeather from "../components/mobile/MobileWeather";

function Home() {
    const { location, setError } = useWeatherStore();

    let cityOrCoords = null;

    if (location.type === "manual" && location.value.trim()) {
        cityOrCoords = location.value.trim();
    } else if (
        location.type === "geo" &&
        location.coords?.lat &&
        location.coords?.lon
    ) {
        cityOrCoords = location.coords;
    }

    useWeather(cityOrCoords);

    useEffect(() => {
        if (!cityOrCoords) {
            setError("Empty Field");
        }
    }, [cityOrCoords, setError]);

    return (
        <div className="min-h-screen w-full bg-[#F6F6F8] font-sans antialiased">

            {/* Desktop */}
            <div className="hidden min-h-screen lg:grid lg:grid-cols-7">

                <aside className="col-span-2 h-screen overflow-hidden border-r border-gray-200 bg-white p-4">
                    <Sidebar />
                </aside>

                <main className="col-span-5 h-screen overflow-y-auto p-6">
                    <MainContent />
                </main>

            </div>

            {/* Mobile / Tablet */}
            <div className="block lg:hidden">
                <main className="min-h-screen px-4 py-4">
                    <MobileWeather />
                    {/* <MainContent /> */}
                </main>
            </div>

        </div>
    );
}

export default Home;