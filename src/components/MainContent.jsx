import Header from "./Header";
import TodayHighlights from "./TodayHighlights";

function MainContent() {
    return (
        <div className="w-full">

            <section>
                <Header />
            </section>

            {/* Hourly Forecast */}
            <section className="mt-8">
                {/* <HourlyForecast /> */}
            </section>

            {/* Highlights */}
            <section className="mt-8">
                <TodayHighlights />
            </section>

        </div>
    );
}

export default MainContent;