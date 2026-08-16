import DailyForecast from "../common/DailyForecast";
import TodayHighlights from "../common/TodayHighlights";

function MainContent() {
    return (
        <div className="flex min-h-full w-full flex-col">
            <section className="shrink-0">
                <DailyForecast />
            </section>

            <section className="mt-4 shrink-0">
                <TodayHighlights />
            </section>
        </div>
    );
}

export default MainContent;