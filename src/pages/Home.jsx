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

            {/* Mobile */}
            <div className="block sm:hidden">
                <main className="min-h-screen px-3 py-3">
                    <MobileHome />
                </main>
            </div>

            {/* Tablet */}
            <div className="hidden sm:block xl:hidden">
                <main className="min-h-screen px-5 py-5">
                    <TabletHome />
                </main>
            </div>

            {/* Desktop */}
            <div className="hidden h-dvh min-h-0 xl:grid xl:grid-cols-7 xl:gap-4">
                <aside className="col-span-2 h-full min-h-0 overflow-hidden">
                    <Sidebar />
                </aside>

                <main className="col-span-5 h-full min-h-0 overflow-y-auto p-6">
                    <MainContent />
                </main>
            </div>

        </div>
    );
}

export default Home;