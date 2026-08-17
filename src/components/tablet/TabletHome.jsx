import TabletWeather from "./TabletWeather";
import HourlyForecast from "../common/HourlyForecast";
import DailyForecast from "../common/DailyForecast";
import TodayHighlights from "../common/TodayHighlights";

function TabletHome() {
    return (
    <main className="min-h-screen w-full bg-[#F6F6F8] px-5 py-5 dark:bg-gray-950">
        <div className="mx-auto w-full max-w-5xl space-y-8">
            <TabletWeather />

            <HourlyForecast />

            <DailyForecast />

            <TodayHighlights />
        </div>
    </main>
);
}

export default TabletHome;