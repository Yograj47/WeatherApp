import { useEffect } from "react";
import useWeather from "../hooks/useWeather";
import useWeatherStore from "../stores/weatherStore";

import MobileHome from "../components/mobile/MobileHome";
import TabletHome from "../components/tablet/TabletHome";

import MainContent from "../components/desktop/MainContent";
import Sidebar from "../components/desktop/Sidebar";

function Home() {
    const { location, setError } = useWeatherStore();

    let cityOrCoords = null;

    if (
        location.type === "manual" &&
        location.value.trim()
    ) {
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

            {/* Mobile: < 640px */}
            <div className="block sm:hidden">
                <MobileHome />
            </div>

            {/* Tablet: 640px - 1023px */}
            <div className="hidden sm:block lg:hidden">
                <TabletHome />
            </div>

            {/* Desktop: >= 1024px */}
            <div className="hidden min-h-screen lg:grid lg:grid-cols-7">

                <aside className="col-span-2 h-screen overflow-hidden border-r border-gray-200 bg-white p-5">
                    <Sidebar />
                </aside>

                <main className="col-span-5 h-screen overflow-y-auto p-6">
                    <MainContent />
                </main>

            </div>

        </div>
    );
}

export default Home;