import DailyForecast from "../common/DailyForecast";
import HourlyForecast from "../common/HourlyForecast";
import TodayHighlights from "../common/TodayHighlights";

function MainContent() {
    return (
                <div className="mx-auto flex w-full max-w-350 flex-col">
                    <section>
                        <DailyForecast />
                    </section>

                    <section className="mt-8">
                        <HourlyForecast />
                    </section>

                    <section className="mt-8">
                        <TodayHighlights />
                    </section>
                </div>
        
    );
}

export default MainContent;