import DailyForecast from "../common/DailyForecast";
import HourlyForecast from "../common/HourlyForecast";
import TodayHighlights from "../common/TodayHighlights";
import MobileWeather from "./MobileWeather";

function MobileHome() {
    return (
        <main className="min-h-screen w-full bg-[#F6F6F8] px-4 py-4 sm:px-6 dark:bg-gray-950">
            <div className="mx-auto w-full max-w-xl">
                {/* Current Weather */}
                <section>
                    <MobileWeather />
                </section>

                {/* Hourly Forecast */}
                <section className="mt-6">
                    <HourlyForecast />
                </section>

                {/* 5-Day Forecast */}
                <section className="mt-6">
                    <DailyForecast />
                </section>

                {/* Today's Highlights */}
                <section className="mt-6">
                    <TodayHighlights />
                </section>
            </div>
        </main>
    );
}

export default MobileHome;